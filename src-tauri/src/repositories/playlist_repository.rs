use serde::Serialize;
use sqlx::{Connection, Executor, Sqlite, SqliteConnection, SqlitePool, FromRow, Error};
use chrono::Utc;

use crate::types::DbResult;


#[derive(Serialize, FromRow)]
pub struct PlaylistResult {
    pub id: i32,
    pub url: String,
    pub owner: String,
    pub playlist_name: String,
    pub last_update: String,
}

pub struct PlaylistRepository {
    pool: sqlx::SqlitePool,
}

impl PlaylistRepository {
    pub async fn new(pool: sqlx::Pool<Sqlite>) -> Self{

        PlaylistRepository {
            pool
        }
    }

    pub async fn get_all(&self) {

    }

    pub async fn get_by_id(&self, id: i32) {
    }

    pub async fn create(&self, url: String, owner: String, name: String, downloading_profile_id: i32) -> DbResult<PlaylistResult> {
        let now: chrono::NaiveDateTime = Utc::now().naive_utc();
        let now_str: String = now.format("%d-%m-%Y %H:%M").to_string();

        let playlist: Result<PlaylistResult, Error> = sqlx::query_as::<_, PlaylistResult>(
            "INSERT INTO playlists (url, owner, playlist_name, last_update, profile_id) 
             VALUES (?, ?, ?, ?, ?)
             RETURNING *",
        )
        .bind(url)
        .bind(owner)
        .bind(name)
        .bind(now_str)
        .bind(downloading_profile_id)
        .fetch_one(&self.pool)
        .await;

        let success: bool  = match playlist {
            Ok(_) => true,
            Err(e) => {
                eprintln!("Failed to insert playlist: {:?}", e);
                let result: DbResult<PlaylistResult> = DbResult {
                    success: false,
                    data: None,
                };
                return result;
            },
        };
    
        let result: DbResult<PlaylistResult> = DbResult {
            success,
            data: Some(playlist.unwrap())
        };

        return result;
    }

    pub async fn update(&self) {

    }

    pub async fn delete(&self) {

    }

    pub async fn refresh_date(&self){

    }
}




