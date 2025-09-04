use reqwest::Client;
use serde_json::json;
use std::env;
use tokio;

#[tokio::main]
async fn main() {
    let args: Vec<String> = env::args().collect();

    let api_key = "";
    let client = Client::new();

    let url =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    let request_body = json!({
        // "model": "gemini-2.5-flash",
        "contents": [
            { "role": "user", "parts": [{ "text": "How many languages do you know" }] }
        ]
    });

    let response = client
        .post(url)
        .header("x-goog-api-key", api_key)
        .header("Content-Type", "application/json")
        .json(&request_body)
        .send()
        .await
        .unwrap();

    // println!("Response: {:?}", response);

    let json_response = response
        .json::<serde_json::Value>()
        .await
        .unwrap_or_else(|_err| {
            println!(
                "Error occurrent while parsing the response data: {:?}",
                _err
            );

            serde_json::Value::Null
        });

    println!("Response: {:?}", json_response);

    if let Some(candidates) = json_response.get("candidates").and_then(|v| v.as_array()) {
        if let Some(first_candidate) = candidates.first() {
            if let Some(content) = first_candidate.get("content") {
                if let Some(parts) = content.get("parts").and_then(|v| v.as_array()) {
                    if let Some(first_part) = parts.first() {
                        if let Some(text) = first_part.get("text").and_then(|v| v.as_str()) {
                            println!("Response text: {}", text);
                        } else {
                            println!("Could not find 'text' field as string");
                        }
                    }
                }
            }
        }
    }
}
