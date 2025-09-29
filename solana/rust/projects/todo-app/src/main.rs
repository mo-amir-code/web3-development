use std::env;

mod lib;

use lib::*;

fn main(){
    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        interactWithUser();
    }else{
        execute_commands(args);
    }

    println!("Thank you for using cli based MekYu Todo manager :)")
}

fn execute_commands(args: Vec<String>) {

}

fn interactWithUser() {
    
}