// Used asynchronus programming with api calling
// use tokio;
// use reqwest;


// #[tokio::main]
// async fn main() {
//     call_api().await;
// }


// async fn call_api() {
//     let res = reqwest::get("https://jsonplaceholder.typicode.com/todos/1").await.unwrap();

//     let body = res.text().await.unwrap();

//     println!("{body:?}");
// }


// chrono package
// use chrono::prelude:: {
//     DateTime,
//     Utc,
//     Local
// };

// fn main() {
//     let date_time: DateTime<Utc> = Utc::now();
//     println!("UTC Date & Time: {}", date_time);


//     let local_date_time: DateTime<Local> = Local::now();
//     println!("Local Date & Time: {}", local_date_time);
// }


// dotenv package implementation
// use dotenv::dotenv;
// use std::env;


// fn main() {
//     dotenv().ok();

//     // for (key, value) in env::vars() {
//     //     println!("key {}: {}", key, value);
//     // }

//     print!("admin: {}", env::var("admin").unwrap());
// }


// tui
use std::io;
use tui::{backend::TermionBackend, Terminal};
use termion::raw::IntoRawMode;

fn main() -> Result<(), io::Error> {
    let stdout = io::stdout().into_raw_mode()?;
    let backend = TermionBackend::new(stdout);
    let mut terminal = Terminal::new(backend)?;
    Ok(())
}