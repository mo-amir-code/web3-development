use std::vec;

use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq)]
struct User {
    username: String,
}

#[derive(BorshSerialize, BorshDeserialize, Debug, PartialEq)]
struct JSObject {
    x: u8,
    y: u64,
    z: String,
    arr: Vec<u8>,
}

fn main() {
    let user = User {
        username: String::from("MekYu"),
    };

    let mut bytes: Vec<u8> = Vec::new();

    user.serialize(&mut bytes).unwrap();

    let deserialized = User::try_from_slice(&bytes).unwrap();

    println!("Bytes: {:?}", bytes);
    println!("Deserialized: {:?}", deserialized);

    let js_bytes: Vec<u8> = vec![
        255, 20, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 49, 50, 51, 3, 0, 0, 0, 1, 2, 3,
    ];
    let js_deserialized = JSObject::try_from_slice(&js_bytes).unwrap();


    println!("JS-Deserialized: {:?}", js_deserialized);

    assert_eq!(deserialized, user);

    print!("Done");
}
