
// Case 1
// fn main() {
//     let str = String::from("Hello from the mekyu");
//     let len = get_len(str);

//     // String can't print because owner has been transferred to the get_len function
//     // println!("String is: {}", str);

//     println!("Length of the string: {}", len);
// }

// fn get_len(str: String) -> usize {
//     str.len()
// }


// Case 2
// fn main(){
//     let str = String::from("MekYu");
    
//     let s1 = &str;
//     let s2 = &str;

//     // Both string are printing because both s1 and s2 are getting the refrence of the original string
//     // And with s1 and s2 original string can not be change
//     // And ownership is not transferring also 
//     println!("String 1 ref. is here: {}", s1);
//     println!("String 2 ref. is here: {}", s2);
// }


// Case 3
// fn main(){
//     let mut str = String::from("Hi there");
//     let s1 = &mut str;
//     // Here s2 will get error because str mutable refernce has been assigned to the s1
//     // let s2 = &str;


//     println!("String 1 is here: {}", s1);

//     // String 2 will not print here because s1 has the mutable refrence
//     // println!("String 2 is here: {}", s2);
// }



// Case 4
// fn main() {
//     let mut str = String::from("Harkirat");
//     let ref1 = &mut str;
//     ref1.push_str("Singh");
//     let ref2 = &str;

//     // Here the code will the run because we are not using the ref1 here if we use ref1 here then this code will give an error
//     println!("{}", ref2);
// }

// Case 5
fn main(){

    let mut str = String::from("Hi there");

    println!("Before append: {}", str);
    
    append_word(&mut str);
    
    println!("After append: {}", str);
}


fn append_word(str: &mut String) {
    str.push_str(" MekYu");
}
