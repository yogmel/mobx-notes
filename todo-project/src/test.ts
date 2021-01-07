import { autorun, makeAutoObservable, reaction } from "mobx";

export interface TodoProps {
  id: number;
  description: string;
  isCompleted: boolean;
}

const sampleTodo = {
  id: 0,
  description: 'sample',
  isCompleted: false
}

class TodoList {
  todos: TodoProps[] = [sampleTodo];

  constructor() {
    makeAutoObservable(this);
  }

  get allTodos() {
    return this.todos;
  }

  addTodo(todo: string) {
    this.todos.push({
      id: this.todos.length++,
      description: todo,
      isCompleted: false,
    });
  }
  
  showAllTodos() {
    console.log('allTodos', this.allTodos[0]);
  }
}

const newTodoList = new TodoList();

autorun(() => {
  console.log("Current todos:", newTodoList.todos);

  newTodoList.todos.forEach(todo => {
    console.log(todo.description);
  })
});

newTodoList.addTodo("task one");

export {};
