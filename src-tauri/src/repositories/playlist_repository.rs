use serde::Serialize;
use sqlx::{ Sqlite, FromRow, Error };
use chrono::Utc;

use crate::types::DbResult;


#[derive(Serialize, FromRow)]
pub struct PlaylistResult {
    pub id: i32,
    pub url: String,
    pub owner: String,
    pub playlist_name: String,
    pub last_update: String,
    pub profile_id: i32
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

    pub async fn get_all(&self) -> DbResult<Vec<PlaylistResult>>  {
        let playlists: Result<Vec<PlaylistResult>, Error> = sqlx::query_as::<_, PlaylistResult>(
            "SELECT * FROM playlists"
        )
        .fetch_all(&self.pool)
        .await;

        let success: bool = match playlists {
            Ok(_) => true,
            Err(e) => {
                eprintln!("Failed to insert playlist: {:?}", e);
                let result: DbResult<Vec<PlaylistResult>> = DbResult {
                    success: false,
                    data: None,
                };
                return result;
            },
        };

        let result: DbResult<Vec<PlaylistResult>> = DbResult {
            success,
            data: Some(playlists.unwrap())
        };

        return result;
    }

    pub async fn get_by_id(&self, id: i32) -> DbResult<PlaylistResult>  {
        let playlist: Result<PlaylistResult, Error> = sqlx::query_as::<_, PlaylistResult>(
            "SELECT * FROM playlists WHERE id = ?"
        )
        .bind(id)
        .fetch_one(&self.pool)
        .await;

        let success: bool = match playlist {
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

    pub async fn create(&self, url: String, owner: String, name: String, downloading_profile_id: i32) -> DbResult<PlaylistResult> {
        let now: chrono::NaiveDateTime = Utc::now().naive_utc();
        let now_str: String = now.format("%Y-%m-%dT%H:%M:%S%.fZ").to_string();

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

    /*pub async fn update(&self) {

    }*/

    pub async fn delete(&self, id: i32) -> DbResult<PlaylistResult> {
       let row_deleted = sqlx::query_as::<_, PlaylistResult>(
            "DELETE FROM playlists WHERE id = ?"
        )
        .bind(id)
        .fetch_one(&self.pool)
        .await;

        let success = match row_deleted {
            Ok(_) => true,
            Err(e) => {
                eprintln!("Failed to delete playlist: {:?}", e);
                let result: DbResult<PlaylistResult> = DbResult {
                    success: false,
                    data: None,
                };
                return result;
            },
        };

        let result: DbResult<PlaylistResult> = DbResult {
            success,
            data: None,
        };

        return result;
        
    }

    pub async fn refresh_date(&self, id: i32) -> DbResult<PlaylistResult>{
        let now: chrono::NaiveDateTime = Utc::now().naive_utc();
        let now_str: String = now.format("%Y-%m-%dT%H:%M:%S%.fZ").to_string();

        let row_updated: Result<PlaylistResult, Error> = sqlx::query_as::<_, PlaylistResult>(
            "UPDATE playlists 
            SET last_update = ? 
            WHERE id = ? 
            RETURNING *"
        )
        .bind(now_str)
        .bind(id)
        .fetch_one(&self.pool)
        .await;

        let success: bool = match row_updated {
            Ok(_) => true,
            Err(e) => {
                eprintln!("Failed to update playlist: {:?}", e);
                let result: DbResult<PlaylistResult> = DbResult {
                    success: false,
                    data: None,
                };
                return result;
            },
        };

        let result: DbResult<PlaylistResult> = DbResult {
            success,
            data : Some(row_updated.unwrap())
        };

        return result;
    }
}




