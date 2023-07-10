// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use youtube_dl::{download_yt_dlp, YoutubeDl};//yt-dlp downloader
use std::sync::{Arc, Mutex};
use std::path::Path;

mod types;
use types::Playlist;

// Define a global variable to hold the result
static YTDLPPATH: once_cell::sync::Lazy<Arc<Mutex<Option<String>>>> =
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

async fn init() {

    let yt_dlp_path = Path::new("./yt-dlp.exe");

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

#[tokio::main]
async fn main() {
    init().await;
    
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])    
        .invoke_handler(tauri::generate_handler![get_playlist_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
