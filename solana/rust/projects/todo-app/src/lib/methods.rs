use super::enums::*;
use super::structs::*;

impl User {
    pub fn new(id: u64, name: &str) -> User {
        User {
            id,
            name: name.into(),
            todos: Vec::new(),
        }
    }

    pub fn add_new_todo(&mut self, todo: &str) {
        if let Some(todo) = self
            .todos
            .iter()
            .find(|t| t.name.to_lowercase() == todo.to_lowercase())
        {
            let status = Status::AlreadyExist;
            println!("{:?}", todo);
            status.print_error();
        }

        let id = (self.todos.len()+1) as u64;

        let new_todo = Todo::new(id, todo);

        self.todos.push(new_todo);
    }

    pub fn delete_todo(&mut self, id: u64) {
        self.todos.retain(|t| t.id != id);
    }

    pub fn get_todo_by_id(&mut self, id: u64) -> Option<&mut Todo> {
        self.todos.iter_mut().find(|t| t.id == id)
    }

    #[allow(dead_code)]
    pub fn search_todo(&self, query: &str) -> Vec<Todo> {
        let results: Vec<Todo> = self
            .todos
            .iter()
            .filter(|t| t.name.to_lowercase().contains(&query.to_lowercase()))
            .cloned()
            .collect();

        results
    }

    pub fn show_todos(&self) {
        println!(">>> Your Todo's");
        for todo in self.todos.iter() {
            println!(
                " - Id: {}, {}, isCompleted: {}",
                todo.id, todo.name, todo.is_completed
            );
        }
    }

    pub fn update_user_name(&mut self, name: &str) {
        self.name = name.to_string();
    }
}

impl Todo {
    pub fn new(id: u64, name: &str) -> Todo {
        Todo {
            id,
            name: name.to_string(),
            is_completed: false,
        }
    }

    pub fn update_status(&mut self, status: bool) {
        self.is_completed = status;
    }

    pub fn update_name(&mut self, name: String) {
        self.name = name;
    }
}

impl Status {
    pub fn print_error(&self) {
        match self {
            Status::AlreadyCompleted => {
                panic!("Task is already completed");
            }
            Status::AlreadyExist => {
                panic!("Task is already exist");
            }
            Status::NotFound => {
                panic!("Task is not found");
            }
        }
    }
}
