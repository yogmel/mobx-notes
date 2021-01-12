import { makeAutoObservable } from "mobx";

export interface TodoProps {
  id: number;
  description: string;
  isCompleted: boolean;
}
  
export class TodoList {
  todos: TodoProps[] = [];
  id = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get allTodos() {
    return this.todos;
  }

  get completedTodos() {
    return this.todos.filter(todo => todo.isCompleted === true);
  }

  get notCompletedTodos() {
    return this.todos.filter(todo => todo.isCompleted === false);
  }

  addTodo(todo: string) {
    const newTodo = {
      id: this.id,
      description: todo,
      isCompleted: false
    }

    this.todos.push(newTodo);

    this.id++;
  }
  
  showAllTodos() {
    this.todos.forEach(todo => {
      console.log(`${todo.id}. ${todo.description}`);
    });
  }

  showCompletedTodos() {
    this.completedTodos.forEach(todo => {
      console.log(todo.description);
    });
  }

  showNotCompletedTodos() {
    this.notCompletedTodos.forEach(todo => {
      console.log(todo.description);
    });
  }

  getIndexFromId(id: number) {
    return this.todos.findIndex(todo => todo.id === id);
  }

  toggleCompletionState(id: number) {
    this.todos[this.getIndexFromId(id)].isCompleted = !this.todos[id].isCompleted;    
  }

  updateDescription(id: number, description: string) {
    this.todos[this.getIndexFromId(id)].description = description;
  }

  removeTodo(id: number) {
    this.todos.splice(this.getIndexFromId(id), 1);
  }
}
