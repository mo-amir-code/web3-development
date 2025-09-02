// Default error 
// use std::fs;

// // Default enum error 
// // enum Result<T, E> {
// //     Ok(T),
// //     Err(E)
// // }


// fn main() {
//     // Any risking code that can cause the error that returns Result enum whether it fails or not
//     // so that due to that error program should not stop running while executing
//     let file_data = fs::read_to_string("text.txt");

//     match file_data {
//         Ok(data) => println!("File Data: {}", data),
//         Err(err) => println!("File is not found error occurred while executing the program: {}", err) 
//     }
// }



// Implemenation 2 with .unwrap()
// use std::fs;


// fn main() {
//     let file_data = fs::read_to_string("text.txt");

//     // If you are okay with stopping program while running then you can use unwrap mehtod
//     // If there is any error the code will stop running from that point
//     // If there is no error then program will execute smoothly
//     println!("File data: {}", file_data.unwrap());
// }


// Implemenation of Custom Error
use std::fs::{self};

struct FileReadError {
    msg: String
}

fn main(){
    let res = read_file("text.txt".to_string());


    match res {
        Ok(data) => println!("Data: {}", data),
        Err(err) => println!("Error is: {}", err.msg)
    }
}


fn read_file(file_name: String) -> Result<String, FileReadError>{
    let data = fs::read_to_string(file_name);

    match data {
        Ok(str_data) => Ok(str_data),
        Err(_error) => {
            let custom_error = FileReadError{
                msg: String::from("Error occurred while reading file")
            };
            Err(custom_error)
        }
    }
}