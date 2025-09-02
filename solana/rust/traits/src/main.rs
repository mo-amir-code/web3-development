trait Shape {
    fn area(&self) -> f32;
}

struct Rect {
    width: f32,
    height: f32,
}

impl Shape for Rect {
    fn area(&self) -> f32 {
        self.height * self.width
    }
}

fn main() {
    let rect = Rect {
        height: 2.2,
        width: 2.5,
    };


    println!("Area: {}", get_area(rect));
}

fn get_area<T: Shape>(rect: T) -> f32 {
    rect.area()
}

// fn get_area<T>(rect: T) -> f32
// where
//     T: Shape,
// {
//     rect.area()
// }
