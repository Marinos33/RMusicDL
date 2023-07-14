use serde::Serialize;
use sqlx::{Sqlite, FromRow, Error};

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

    pub async fn get_by_id(&self, id: i32) -> DbResult<DownloadingProfileResult> {
        let profile: Result<DownloadingProfileResult, Error> = sqlx::query_as::<_, DownloadingProfileResult>(
            "SELECT * FROM downloading_profiles WHERE id = ?"
        )
        .bind(id)
        .fetch_one(&self.pool)
        .await;

        let success: bool = match profile {
            Ok(_) => true,
            Err(e) => {
                eprintln!("Failed to insert playlist: {:?}", e);
                let result: DbResult<DownloadingProfileResult> = DbResult {
                    success: false,
                    data: None,
                };
                return result;
            },
        };

        let result: DbResult<DownloadingProfileResult> = DbResult {
            success,
            data: Some(profile.unwrap())
        };

        return result;
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

    pub async fn update(&self, id: i32, extension: String, path: String) -> DbResult<DownloadingProfileResult> {
        let profile: Result<DownloadingProfileResult, Error> = sqlx::query_as::<_, DownloadingProfileResult>(
            "UPDATE downloading_profiles 
             SET output_extension = ?, output_path = ?
             WHERE id = ?
             RETURNING *"
        )
        .bind(extension)
        .bind(path)
        .bind(id)
        .fetch_one(&self.pool)
        .await;

        let success: bool = match profile {
            Ok(_) => true,
            Err(e) => {
                eprintln!("Failed to insert playlist: {:?}", e);
                let result: DbResult<DownloadingProfileResult> = DbResult {
                    success: false,
                    data: None,
                };
                return result;
            },
        };

        let result: DbResult<DownloadingProfileResult> = DbResult {
            success,
            data: Some(profile.unwrap())
        };

        return result;
    }
}




