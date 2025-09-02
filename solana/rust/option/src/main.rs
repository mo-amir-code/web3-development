


// Default Option
// enum Option<T> {
//     None,
//     Some(T)
// }


// In rust, there is no concept of null, so if value is not exist in any case then it returns the None
// if exist then it returns the Some with generic type that we define while using
// Basically we gets Option enum and then we have to check that value is exist or not
fn main() {
    let name = String::from("Mo Amir");

    let res = find_first_a(&name);

    match res {
        Some(idx) => println!("Found at index: {}", idx),
        None => println!("A is not exist")
    }
}

fn find_first_a(str: &String) -> Option<u32> {
    for (idx, char) in str.to_lowercase().chars().enumerate() {
        if char == 'a' {
            return Some(idx as u32);
        }
    }

    None
}

