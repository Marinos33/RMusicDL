use serde::Serialize;

#[derive(Serialize)]
pub struct DbResult<T> {
    pub success: bool,
    pub data: Option<T>,
}