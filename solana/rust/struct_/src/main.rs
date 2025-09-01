
// Case 1
// #[derive(Copy, Clone)]
// struct User {
//     active: bool,
//     sign_in_count: u8
// }

// fn main() {
//     let user = User {
//         active: true,
//         sign_in_count: 1
//     };

//     trx(user);

//     println!("Count: {}", user.sign_in_count);
// }

// fn trx(u: User){
//     println!("Trx user: {}", u.sign_in_count);
// }


// Case 2
#[derive(Clone)]
struct User {
    active: bool,
    name: String,
    sign_in_count: u8

}

fn main() {
    let user = User {
        active: true,
        name: String::from("MekYu"),
        sign_in_count: 1
    };

    // Now here only clone trait can work because String stores in the heap memory
    // So it can not be copy just like above example
    // Thats why here are doing clone so that we can access user after sending the user also.
    // Because we are not using referencing here
    trx(user.clone());

    println!("Count: {}", user.name);
}

fn trx(u: User){
    println!("Trx user: {}", u.sign_in_count);
}
