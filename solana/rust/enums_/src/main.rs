
// Implementation 1
// enum Direction {
//     North,
//     West,
//     East,
//     South
// }

// fn main() {
//     let dir = Direction::East;

//     let new_dir = dir; // No error because direction is copy
// }



// Implemenation 2 (Pattern Matching)

use std::{f64::consts::PI};

enum Shape {
    Circle(f64),
    Square(f64)
}

fn main() {
    let circle = Shape::Circle(3.7);
    let square = Shape::Square(4.2);

    println!("Circle calc: {}", calc_shape(circle));
    println!("Square calc: {}", calc_shape(square));
}


fn calc_shape(shape: Shape) -> f64 {
    match shape {
        Shape::Circle(r) => PI * r * r,
        Shape::Square(side_len) => side_len * side_len
    }
}