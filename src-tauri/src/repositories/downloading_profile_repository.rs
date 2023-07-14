use serde::Serialize;
use sqlx::{Connection, Executor, Sqlite, SqliteConnection, SqlitePool, FromRow, Error};

use crate::types::DbResult;

#[derive(Serialize, FromRow)]
pub struct DownloadingProfileResult {
    pub id: i32,
    pub output_extension: String,
    pub output_path: String,
}

pub struct DownloadingProfileRepository {
    pool: sqlx::SqlitePool,
}

impl DownloadingProfileRepository {
    pub async fn new(pool: sqlx::Pool<Sqlite>) -> Self{

        DownloadingProfileRepository {
            pool
        }
    }

    pub async fn get_all(&self) {

    }

    pub async fn get_by_id(&self, id: i32) {
    }

    pub async fn create(&self, extension: String, path: String) -> DbResult<DownloadingProfileResult> {
        
        let downloading_profile: Result<DownloadingProfileResult, Error> = sqlx::query_as::<_, DownloadingProfileResult>(
            "INSERT INTO downloading_profiles (output_extension, output_path) 
             VALUES (?, ?)
             RETURNING *",
        )
        .bind(extension)
        .bind(path)
        .fetch_one(&self.pool)
        .await;

        let success: bool  = match downloading_profile {
            Ok(_) => true,
            Err(e) => {
                eprintln!("Failed to insert DownloadingProfile: {:?}", e);
                let result: DbResult<DownloadingProfileResult> = DbResult {
                    success: false,
                    data: None,
                };
                return result
            },
        };
    
        let result: DbResult<DownloadingProfileResult> = DbResult {
            success,
            data: Some(downloading_profile.unwrap())
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




