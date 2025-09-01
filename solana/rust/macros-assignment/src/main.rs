// Code from the cohort notes
// use serde::{Serialize, Deserialize};

// #[derive(Serialize, Deserialize, Debug)]
// struct User {
//     #[serde(rename = "user_name")]
//     username: String,

//     #[serde(rename = "user_password")]
//     password: String,

//     #[serde(rename = "user_age")]
//     age: u8
// }

// fn main() {
//     let user = User {
//         username: String::from("moamircode"),
//         password: String::from("passwordishere"),
//         age: 21
//     };

//     let serialized_user = serde_json::to_string(&user).unwrap();

//     println!("Serialized user: {}", serialized_user);

//     println!("Deserialized user: {:?}", serde_json::from_str::<User>(&serialized_user).unwrap());
// }


// code from the assignment
macro_rules! generate_functions {
    ($($func_name:ident),*) => {
        $(
            fn $func_name() {
                println!("Hello from {}", stringify!($func_name));
            }
        )*
    };
}

generate_functions!(foo);

fn main() {
    foo();  // Prints: Hello from foo
    // bar();  // Prints: Hello from bar
    // baz();  // Prints: Hello from baz
}


// For testing
// use serde::{Serialize, Deserialize};
// #[derive(Serialize)]
// struct User {
//     name: String
// }

// extern crate std;

// macro_rules! makeyu {
//     () => {
//         print!("Hi there from the mekyu");
//     };
// }

// fn main(){
//     println!("Hi from me: {}", "hi there");
//     print!("");
//     makeyu!();
// }
