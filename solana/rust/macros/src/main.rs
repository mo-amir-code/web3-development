// Creating dynamic function
// macro_rules! create_function {
//     ($func_name:ident) => {
//         fn $func_name() {
//             println!("This function name is {}", stringify!($func_name));
//         }
//     };
// }

// it can create only a function
// create_function!(hello);

// macro_rules! create_more_than_one_functions {
//     ($($method_name:ident), *) => {
//         $(
//             fn $method_name() {
//                 println!("This function name is: {}", stringify!($method_name));
//             }
//         )+
//     };
//     ($($method_name:ident, $var_to_print: expr), *) => {
//         $(
//             fn $method_name() {
//                 println!("This function value is: {}", $var_to_print);
//             }
//         )*
//     };
// }

// create_more_than_one_functions!(foo, "FOooFaa");

fn main() {
    // println!("Hello, world!");
    // hello();
    // foo();

    // println!("To kya bolti public {}", "Sdsd");
    // let v = vec![1, 2, 3, 4];

    // let formatted = format!("{} {}", "Hello", "World");

    // assert!(5 > 2);


    panic!("Nakul pratap singh from banngadi");
}
