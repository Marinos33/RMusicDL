use serde::Serialize;
use sqlx::FromRow;

#[derive(Serialize)]
pub struct DbResult<T> {
    pub success: bool,
    pub data: Option<T>,
}

#[derive(Serialize, FromRow)]
pub struct PlaylistResult {
    pub id: i32,
    pub url: String,
    pub owner: String,
    pub playlist_name: String,
    pub last_update: String,
}