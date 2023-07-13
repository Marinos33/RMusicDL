use sqlx::FromRow;

#[derive(Debug, FromRow)]
pub struct Playlist {
    id: i32,
    url: String,
    owner: String,
    playlist_name: String,
    last_update: String,
    profile_id: i32,
    downloading_profile: DownloadingProfile,
}

#[derive(Debug, FromRow)]
struct DownloadingProfile {
    id: i32,
    output_extension: String,
    output_path: String,
}