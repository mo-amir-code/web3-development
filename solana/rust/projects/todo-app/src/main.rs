use std::fs;
use std::io;

mod lib;

use lib::*;

fn main() {
    let mut is_user_logged_in: bool = false;
    let mut users: Vec<User> = load_data_from_json_file();

    let res = find_or_create_user(&mut is_user_logged_in, &mut users);
    let mut current_user;

    match res {
        Some(user) => {
            current_user = user;
        }
        None => {
            panic!("Something went wrong...");
        }
    }

    show_user_data(&current_user);
    manipulate_todo(&mut current_user);

    // Storing data back to file
    store_data_in_json_file(&users);
}

fn take_input() -> String {
    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read input");

    input.trim().to_string() // <- removes \n and whitespace
}

fn find_user<'a>(users: &'a mut Vec<User>) -> Option<&'a mut User> {
    println!("\nEnter user id >> ");
    let input = take_input();
    let id: u64 = input.trim().parse().expect("Enter a integer id");

    users.iter_mut().find(|u| u.id == id)
}

fn create_user(users: &mut Vec<User>) -> u64 {
    println!("\n\n");

    println!("Enter user name: ");
    let input = take_input();

    if let Some(user) = users
        .iter()
        .find(|u| u.name.to_lowercase() == input.to_lowercase())
    {
        panic!("User is already exist with your name: {:?}", user);
    }

    let id = users.len() as u64;

    let user = User::new(id, &input);
    users.push(user);

    return id;
}

fn find_or_create_user<'a>(is_user_logged_in: &mut bool, users: &'a mut Vec<User>) -> Option<&'a mut User> {
    println!("<------------ Welcome to your Todo's Manager MekYu ------------>");

    while !(*is_user_logged_in) {
        println!("\n\nYou are not logged in yet");

        println!(">> Choose any one ->");
        println!("- Press (1) to enter id (if your account is already exist) >> ");
        println!("- Press (2) to create fresh account >> ");

        let input = take_input();
        let choice: i32 = input.trim().parse().expect("Please enter a valid integer");

        if choice == 1 {
            let res = find_user(users);

            match res {
                Some(user) => {
                    *is_user_logged_in = true;
                    return Some(user);
                }
                None => {
                    return None;
                }
            }
        } else if choice == 2 {
            let user_id = create_user(users);
            let user = users.iter_mut().find(|u| u.id == user_id);

            return user;
        } else {
            println!("Enter choice from given options");
        }
    }

    None
}

fn load_data_from_json_file() -> Vec<User> {
    let data = fs::read_to_string("data.json").unwrap();

    let users: Vec<User> = serde_json::from_str(&data).unwrap();

    users
}

fn store_data_in_json_file(users: &Vec<User>) {
    let updated_data = serde_json::to_string_pretty(users).unwrap();

    fs::write("data.json", updated_data).unwrap();
}

fn show_user_data(user: &User) {
    println!("<-------------- Account Info ------------->");
    println!(" - Id: {}", user.id);
    println!(" - Name: {}\n", user.name);

    // Showing todos
    user.show_todos();
}

fn manipulate_todo(user: &mut User) {
    loop {
        println!("\n\n>>>Enter a key from given options to perform action.");
        println!("> (a) - Change your account name");
        println!("> (b) - Add new todo");
        println!("> (c) - Get todo by id");
        println!("> (d) - Update todo by id");
        println!("> (e) - Delete todo by id");
        println!("> (f) - Toggle status of todo by id");
        println!("> (q) - To quit and save");
        println!(">>> ");

        let mut input = take_input();
        let choice = input.chars().next().unwrap();

        match choice {
            'a' => {
                println!("Enter new name: ");
                input = take_input();
                user.update_user_name(&input);
            },
            'b' => {
                println!("Enter new todo: ");
                input = take_input();
                user.add_new_todo(&input);
                println!(">> Todo added successfully");
                user.show_todos();
            },
            'c' => {
                println!("Enter todo id: ");
                input = take_input();
                let todo_id:u64 = input.trim().parse().expect("Enter valid(integer) todo Id");

                let todo = user.get_todo_by_id(todo_id).unwrap();

                println!("- Id: {}, {}, isCompleted: {}", todo.id, todo.name, todo.is_completed);
            },
            'd' => {
                println!("Enter todo id: ");
                input = take_input();
                let todo_id:u64 = (&input).trim().parse().expect("Enter valid(integer) todo Id");
                let todo = user.get_todo_by_id(todo_id).unwrap();

                println!("Enter new name of todo: ");
                input = take_input();

                todo.update_name(input);                

                println!("- Id: {}, {}, isCompleted: {}", todo.id, todo.name, todo.is_completed);
            },
            'e' => {
                println!("Enter todo id: ");
                input = take_input();
                let todo_id:u64 = (&input).trim().parse().expect("Enter valid todo id");
                
                user.delete_todo(todo_id);
                println!("Todo has been deleted");
            },
            'f' => {
                println!("Enter todo id: ");
                input = take_input();
                let todo_id:u64 = (&input).trim().parse().expect("Enter valid todo id");

                let todo = user.get_todo_by_id(todo_id).unwrap();
                todo.update_status(!todo.is_completed);

                println!("- Id: {}, {}, isCompleted: {}", todo.id, todo.name, todo.is_completed);
            },
            'q' => {
                break;
            },
            _ => {
                println!("Enter a correct choice");
            }
        }

        show_user_data(user);
    }
}