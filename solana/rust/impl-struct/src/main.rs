

// #[derive(Clone)]
struct User {
    username: String,
    password: String
}


impl User {
    fn get_name(&mut self) -> &mut String {
        &mut self.username
    }
}

fn main() {
    let mut user = User {
        username: String::from("MekYu"),
        password: String::from("aise hi")
    };


    println!("Before Change Username is : {}", user.username);
    
    let mut username = user.get_name();
    
    username.push_str(" : Web3 Dev");
    
    
    println!("After Change Username is : {}", user.username);
}
