// use std::fmt::Display;


// fn main() {
//     let vec = vec![1, 2, 3, 4];
//     let vec2 = vec!["A", "B", "C"];

    
//     println!("First element is: {}", first_element(vec).unwrap());

//     println!("Exist: {}", does_exist(&vec2, "A"));
 
//     display("hello from mekyu");
    
//     // This will not run or it will give an erorr because vector elements and element should be comparasible
//     // Thats why we are using the Eq trait in the function generic declaration
//     // println!("Exist 2: {}", does_exist(&vec2, 3));


// }

// fn first_element<T>(v: Vec<T>) -> Option<T> {
//     let mut iter = v.into_iter();
//     iter.nth(0)
// }

// fn does_exist<T: std::cmp::Eq>(vec: &Vec<T>, el: T) -> bool {
//     let mut iter = vec.iter();

//     while let Some(value) = iter.next() {
//         if *value == el {
//             return true
//         }
//     }

//     return false;
// }

// fn display<T: Display>(el: T){
//     println!("{}", el);
// }



// Generic in enum
// enum Result<T> {
//     Ok(T),
//     Err
// }

// enum Option<T> {
//     Some(T),
//     None
// }



// Generic in Struct
use std::ops::Mul;

struct Rect<T> {
    width: T,
    height: T
}


impl<T: Mul<Output = T> + Copy> Rect<T> {
    fn area(&self) -> T {
        return self.height * self.width
    }
}

fn main(){ 
    let r = Rect {
        width: 2,
        height: 4
    };

    println!("Area: {}", r.area());
}