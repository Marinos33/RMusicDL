use serde::Serialize;

#[derive(Serialize)]
pub struct Playlist {
    pub title: String,
    pub author: String,
    pub uploader_url: String,
    pub thumbnail: String,
}