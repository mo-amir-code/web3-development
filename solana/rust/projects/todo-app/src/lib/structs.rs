
#[derive(Debug, Clone)]
pub struct User {
    pub id: u64,
    pub name: String,
    pub todos: Vec<Todo>
}

#[derive(Debug, Clone)]
pub struct Todo {
    pub id: u64,
    pub name: String,
    pub is_completed: bool
}