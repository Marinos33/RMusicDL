// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use repositories::playlist_repository;
use serde::Serialize;
use youtube_dl::{download_yt_dlp, YoutubeDl};//yt-dlp downloader
use std::sync::{Arc, Mutex};
use std::path::{Path, PathBuf};
use std::fs::File;
use std::io::copy;
use ffmpeg_sidecar::download::{ffmpeg_download_url, unpack_ffmpeg};
use reqwest::Client;
use sqlx::sqlite::{SqliteConnectOptions, SqliteJournalMode};
use sqlx::SqlitePool;

mod types;
mod repositories {
    pub mod downloading_profile_repository;
    pub mod playlist_repository;
}
use repositories::downloading_profile_repository::DownloadingProfileRepository;
use repositories::playlist_repository::PlaylistRepository;

// Define a global variable to hold the result
static YTDLP_PATH: once_cell::sync::Lazy<Arc<Mutex<Option<String>>>> =
    once_cell::sync::Lazy::new(|| Arc::new(Mutex::new(None)));

static FFMPEG_PATH: once_cell::sync::Lazy<Arc<Mutex<Option<String>>>> =
    once_cell::sync::Lazy::new(|| Arc::new(Mutex::new(None)));

static IS_INITIALIZED: once_cell::sync::Lazy<Arc<Mutex<bool>>> =
    once_cell::sync::Lazy::new(|| Arc::new(Mutex::new(false)));

static DATABASE_POOL: once_cell::sync::Lazy<Arc<Mutex<Option<SqlitePool>>>> =
    once_cell::sync::Lazy::new(|| Arc::new(Mutex::new(None)));

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn get_playlist_info(url: String) -> String {
    #[derive(Serialize)]
    struct PlaylistInfo {
        pub title: String,
        pub author: String,
        pub uploader_url: String,
        pub thumbnail: String,
    }

    let path: String = YTDLP_PATH.lock().unwrap().clone().unwrap();

    let output: Result<youtube_dl::YoutubeDlOutput, youtube_dl::Error> = YoutubeDl::new(url)
    .youtube_dl_path(path)
    .socket_timeout("15")
    .extra_arg("--dump-single-json")
    .run_async()
    .await;

    let info: youtube_dl::Playlist = match output {
        Ok(output) => output.into_playlist().unwrap(),
        Err(_) => panic!("Error"),
    };

    let playlist: PlaylistInfo = PlaylistInfo {
        title : info.title.unwrap(),
        author: info.uploader.unwrap(),
        uploader_url: info.uploader_url.unwrap(),
        thumbnail: info.thumbnails.unwrap()[0].url.clone().unwrap(),
    };

    let json: String = serde_json::to_string(&playlist).unwrap();

    return json;
}

#[tauri::command]
async fn download_playlist(url: String, format: String, path: String, name: String) -> bool {

    //create folder at path + name if not exists    
    let folder_path: String = format!("{}/{}", path, name);
    std::fs::create_dir_all(&folder_path).unwrap();

    let ytdlp_path: String = YTDLP_PATH.lock().unwrap().clone().unwrap();
    let ffmpeg_path: String = FFMPEG_PATH.lock().unwrap().clone().unwrap();
    let format_arg: String = format!("--audio-format={}", format);
    let ffmpeg_arg: String = format!("--ffmpeg-location={}", ffmpeg_path);
    let output: String = format!("{}/%(title)s - %(uploader)s.%(ext)s", folder_path);
    let download_archive: String = format!("--download-archive={}/history.txt", folder_path);
    let postprocessor_args = format!("-metadata album={}", name.replace(" ", "_"));

    println!("Downloading playlist...");

    if let Err(error) = YoutubeDl::new(url)
    .youtube_dl_path(ytdlp_path)
    .download(true)
    .extra_arg("--ignore-errors")
    .extra_arg("--yes-playlist")
    .output_template(&output)
    .format("bestaudio")
    .extra_arg(&download_archive)
    .extra_arg(&ffmpeg_arg)
    .extract_audio(true)
    .extra_arg(&format_arg)
    .extra_arg("--embed-thumbnail")
    .extra_arg("--add-metadata")
    .extra_arg("--postprocessor-args")
    .extra_arg(&postprocessor_args)
    .run_async()
    .await
    {
        eprintln!("Error: {}", error);
        return false;
    }

    println!("Downloaded playlist");

    return true;
}

#[tauri::command]
async fn is_initialized() -> bool {
    return *IS_INITIALIZED.lock().unwrap();
}

#[tauri::command]
async fn add_playlist(url: String, owner: String, name: String, extension: String, path: String) -> String {
    let pool: sqlx::Pool<sqlx::Sqlite> = DATABASE_POOL.lock().unwrap().clone().unwrap();

    let downloading_profile_repository: DownloadingProfileRepository = DownloadingProfileRepository::new(pool.clone()).await;
    
    let downloading_profile = downloading_profile_repository.create(extension, path).await;

    let downloading_profile_id: i32 = downloading_profile.data.unwrap().id;

    let playlist_repository: PlaylistRepository = playlist_repository::PlaylistRepository::new(pool).await;

    let playlist = playlist_repository.create(url, owner, name, downloading_profile_id).await;

    return serde_json::to_string(&playlist).unwrap();
}

#[tauri::command]
async fn get_playlists() -> String {
    let pool: sqlx::Pool<sqlx::Sqlite> = DATABASE_POOL.lock().unwrap().clone().unwrap();

    let playlist_repository: PlaylistRepository = playlist_repository::PlaylistRepository::new(pool).await;

    let playlists = playlist_repository.get_all().await;

    return serde_json::to_string(&playlists).unwrap();
}

#[tauri::command]
async fn get_playlist(id: i32) -> String {
    let pool: sqlx::Pool<sqlx::Sqlite> = DATABASE_POOL.lock().unwrap().clone().unwrap();

    let playlist_repository: PlaylistRepository = playlist_repository::PlaylistRepository::new(pool).await;

    let playlist = playlist_repository.get_by_id(id).await;

    return serde_json::to_string(&playlist).unwrap();
}

#[tauri::command]
async fn refresh_playlist(id: i32) -> String {
    let pool: sqlx::Pool<sqlx::Sqlite> = DATABASE_POOL.lock().unwrap().clone().unwrap();

    let playlist_repository: PlaylistRepository = playlist_repository::PlaylistRepository::new(pool).await;

    let playlist = playlist_repository.refresh_date(id).await;

    return serde_json::to_string(&playlist).unwrap();
}

#[tauri::command]
async fn update_downloading_profile(id: i32, extension: String, path: String) -> String {
    let pool: sqlx::Pool<sqlx::Sqlite> = DATABASE_POOL.lock().unwrap().clone().unwrap();

    let downloading_profile_repository: DownloadingProfileRepository = DownloadingProfileRepository::new(pool).await;

    let downloading_profile = downloading_profile_repository.update(id, extension, path).await;

    return serde_json::to_string(&downloading_profile).unwrap();
}

#[tauri::command]
async fn get_downloading_profile(id: i32) -> String {
    let pool: sqlx::Pool<sqlx::Sqlite> = DATABASE_POOL.lock().unwrap().clone().unwrap();

    let downloading_profile_repository: DownloadingProfileRepository = DownloadingProfileRepository::new(pool).await;

    let downloading_profile = downloading_profile_repository.get_by_id(id).await;

    return serde_json::to_string(&downloading_profile).unwrap();
}

#[tauri::command]
async fn delete_playlist(id: i32) -> String {
    let pool: sqlx::Pool<sqlx::Sqlite> = DATABASE_POOL.lock().unwrap().clone().unwrap();

    let playlist_repository: PlaylistRepository = playlist_repository::PlaylistRepository::new(pool).await;

    let playlist = playlist_repository.delete(id).await;

    return serde_json::to_string(&playlist).unwrap();
}

#[tokio::main]
async fn main() {
    tokio::spawn(init());
    
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet, 
            get_playlist_info, 
            download_playlist, 
            is_initialized,
            add_playlist,
            get_playlists,
            get_playlist,
            refresh_playlist,
            update_downloading_profile,
            get_downloading_profile,
            delete_playlist
        ])    
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

async fn init_ytdlp() {
    let yt_dlp_path: &Path = Path::new("./yt-dlp.exe");

    if yt_dlp_path.exists() {
        println!("yt-dlp already downloaded");
        *YTDLP_PATH.lock().unwrap() = Some(yt_dlp_path.to_str().unwrap().to_string());
        return;
    }

    let yt_dlp_download_result: Result<std::path::PathBuf, youtube_dl::Error> = download_yt_dlp(".").await;

    match yt_dlp_download_result {
        Ok(path) => {
            //convert yt_dlp_path to string
            let path = path.to_str().unwrap().to_string();
            println!("yt-dlp downloaded to {:?}", path);

            *YTDLP_PATH.lock().unwrap() = Some(path);
        },
        Err(e) => {
            eprintln!("Failed to download yt-dlp: {:?}", e);
        },
    }
}

async fn init_ffmpeg() -> Result<(), Box<dyn std::error::Error>> {

    // Extract the filename from the download URL
    let zip_name: &str = "ffmpeg-release-essentials.zip";
    let filename: &str = "ffmpeg.exe";
    let destination: &Path = Path::new(".");
    let exe_path: PathBuf = destination.join(filename);

    // Check if ffmpeg is already installed
    if exe_path.exists() {
        println!("ffmpeg is already installed");
        *FFMPEG_PATH.lock().unwrap() = Some(exe_path.to_str().unwrap().to_string());
        return Ok(());
    }

    // Download the file
    let download_url: &str = ffmpeg_download_url()?;
    println!("Download URL: {}", download_url);

    let client: Client = Client::new();
    let response: reqwest::Response = client.get(download_url).send().await?;
    // Check if the download was successful
    if response.status().is_success() {
        // Save the file to disk
        let mut file: File = File::create(zip_name)?;
        copy(&mut response.bytes().await?.as_ref(), &mut file)?;

        let archive_path: PathBuf = destination.join(&zip_name).canonicalize()?;

        println!("Destination: {:?}", destination);
            // Unpack the file
        println!("Extracting...");
        unpack_ffmpeg(&archive_path, &destination)?;

        *FFMPEG_PATH.lock().unwrap() = Some(exe_path.to_str().unwrap().to_string());
        println!("Done! 🏁");
    } else {
        println!("Failed to download file: {:?}", response.status());
    }

    Ok(())
  }

async fn init_db() -> sqlx::Result<sqlx::SqlitePool> {
    let database_url: &str = "./rmusicdl.db";

    let options: SqliteConnectOptions = SqliteConnectOptions::new()
        .filename(database_url)
        .journal_mode(SqliteJournalMode::Wal)
        .pragma("foreign_keys", "ON")
        .create_if_missing(true);

    let pool: sqlx::Pool<sqlx::Sqlite> = sqlx::sqlite::SqlitePool::connect_with(options)
        .await
        .expect("Failed to connect to the database");

    *DATABASE_POOL.lock().unwrap() = Some(pool.clone());

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS downloading_profiles (
                  id              INTEGER PRIMARY KEY AUTOINCREMENT,
                  output_extension   TEXT NOT NULL,
                  output_path        TEXT NOT NULL
                  )",
    )
    .execute(&pool)
    .await?;

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS playlists (
                  id              INTEGER PRIMARY KEY AUTOINCREMENT,
                  url             TEXT NOT NULL,
                  owner           TEXT NOT NULL,
                  playlist_name   TEXT NOT NULL,
                  last_update     TEXT NOT NULL,
                  profile_id      INTEGER NOT NULL,
                  FOREIGN KEY (profile_id) REFERENCES downloading_profiles (id) ON DELETE CASCADE ON UPDATE CASCADE
                  )",
    )
    .execute(&pool)
    .await?;

    Ok(pool)
}

async fn init() {
    init_ytdlp().await;
    let  _ = init_ffmpeg().await;
    let _ = init_db().await;

    *IS_INITIALIZED.lock().unwrap() = true;

    println!("initialization done")
}
