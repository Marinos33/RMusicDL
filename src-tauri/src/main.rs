// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use youtube_dl::YoutubeDl;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_info_playlist(url: &str) -> String {
    let output: youtube_dl::YoutubeDlOutput = YoutubeDl::new(url)
    .socket_timeout("15")
    .run()
    .unwrap();

    println!("{:?}", output);

    let title: String = output.into_single_video().unwrap().title;

    println!("{:?}", title);

    return title;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])    
        .invoke_handler(tauri::generate_handler![get_info_playlist])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
