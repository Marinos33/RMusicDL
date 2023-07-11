// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use youtube_dl::{download_yt_dlp, YoutubeDl};//yt-dlp downloader
use std::sync::{Arc, Mutex};
use std::path::{Path, PathBuf};
use std::fs::File;
use std::io::copy;
use ffmpeg_sidecar::{
    command::ffmpeg_is_installed,
    download::{check_latest_version, download_ffmpeg_package, ffmpeg_download_url, unpack_ffmpeg},
    error::Result as ffmpeg_result,
    paths::sidecar_dir,
    version::ffmpeg_version,
  };
use reqwest::Client;
use url::Url;

mod types;
use types::Playlist;

// Define a global variable to hold the result
static YTDLPPATH: once_cell::sync::Lazy<Arc<Mutex<Option<String>>>> =
    once_cell::sync::Lazy::new(|| Arc::new(Mutex::new(None)));
static FFMPEGPATH: once_cell::sync::Lazy<Arc<Mutex<Option<String>>>> =
    once_cell::sync::Lazy::new(|| Arc::new(Mutex::new(None)));

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn get_playlist_info(url: String) -> String {

    let path = YTDLPPATH.lock().unwrap().clone().unwrap();

    let output = YoutubeDl::new(url)
    .youtube_dl_path(path)
    .socket_timeout("15")
    .extra_arg("--dump-single-json")
    .run_async()
    .await;

    let info = match output {
        Ok(output) => output.into_playlist().unwrap(),
        Err(_) => panic!("Error"),
    };

   /*println!("title {:?} ", info.title.unwrap());
    println!("author {:?} ", info.uploader.unwrap());
    println!("uploader url{:?} ", info.uploader_url.unwrap());
    println!("thumbnail {:?}", info.thumbnails.unwrap()[0].url.clone().unwrap());*/

    let playlist: Playlist = Playlist {
        title : info.title.unwrap(),
        author: info.uploader.unwrap(),
        uploader_url: info.uploader_url.unwrap(),
        thumbnail: info.thumbnails.unwrap()[0].url.clone().unwrap(),
    };

    let json: String = serde_json::to_string(&playlist).unwrap();

    return json;
}

#[tauri::command]
async fn download_playlist(url: String, format: String) -> bool {

    let path: String = YTDLPPATH.lock().unwrap().clone().unwrap();
    let format_arg: String = format!("--audio-format {}", format);
    let ffmpeg_path: String = "".to_string();
    let ffmpeg_arg: String = format!("--ffmpeg-location {}", ffmpeg_path);

    if let Err(error) = YoutubeDl::new(url)
    .youtube_dl_path(path)
    .download(true)
    .format("bestaudio")
    .extract_audio(true)
    .extra_arg(ffmpeg_arg)
    //.extra_arg(format_arg)
    .extra_arg("--ignore-errors")
    .extra_arg("--yes-playlist")
    .run_async()
    .await
    {
        eprintln!("Error: {}", error);
        return false;
    }

    return true;
}

async fn init_ytdlp() {

    let yt_dlp_path: &Path = Path::new("./yt-dlp.exe");

    if yt_dlp_path.exists() {
        println!("yt-dlp already downloaded");
        *YTDLPPATH.lock().unwrap() = Some(yt_dlp_path.to_str().unwrap().to_string());
        return;
    }

    let yt_dlp_download_result: Result<std::path::PathBuf, youtube_dl::Error> = download_yt_dlp(".").await;

    match yt_dlp_download_result {
        Ok(path) => {
            //convert yt_dlp_path to string
            let path = path.to_str().unwrap().to_string();
            println!("yt-dlp downloaded to {:?}", path);

            *YTDLPPATH.lock().unwrap() = Some(path);
        },
        Err(e) => {
            eprintln!("Failed to download yt-dlp: {:?}", e);
        },
    }
}

async fn init_ffmpeg() -> Result<(), Box<dyn std::error::Error>> {

    let download_url: &str = ffmpeg_download_url()?;
    println!("Download URL: {}", download_url);

        // Extract the filename from the download URL
        let zip_name = "ffmpeg-release-essentials.zip";
        let filename = "ffmpeg.exe";
        let destination: &Path = Path::new(".");
        let exe_path: PathBuf = destination.join(filename);

        // Check if ffmpeg is already installed
        if exe_path.exists() {
            println!("ffmpeg is already installed");
            *FFMPEGPATH.lock().unwrap() = Some(exe_path.to_str().unwrap().to_string());
            return Ok(());
        }

        // Download the file
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

            *FFMPEGPATH.lock().unwrap() = Some(exe_path.to_str().unwrap().to_string());
            println!("Done! 🏁");
        } else {
            println!("Failed to download file: {:?}", response.status());
        }

    Ok(())
  }

#[tokio::main]
async fn main() {
    init_ytdlp().await;
    _ = init_ffmpeg().await;
    
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])    
        .invoke_handler(tauri::generate_handler![get_playlist_info])
        .invoke_handler(tauri::generate_handler![download_playlist])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}