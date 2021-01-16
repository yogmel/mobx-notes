import { makeAutoObservable } from "mobx";

import { Todo } from "./TodoViewModel";

export class TodoList {
  todos: Todo[] = [];
  id = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get allTodos() {
    return this.todos;
  }

  get completedTodos() {
    return this.todos.filter((todo) => todo.isCompleted === true);
  }

  get notCompletedTodos() {
    return this.todos.filter((todo) => todo.isCompleted === false);
  }

  addTodo(todo: string) {
    const newTodo = new Todo(this.id, todo, false);
    this.todos.push(newTodo);
    this.id++;
  }

  showNotCompletedTodos() {
    this.notCompletedTodos.forEach((todo) => {
      console.log(todo.description);
    });
  }

  getIndexFromId(id: number) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  updateDescription(id: number, description: string) {
    this.todos[this.getIndexFromId(id)].description = description;
  }

  toggleCompletionState(id: number) {
    this.todos[this.getIndexFromId(id)].isCompleted = !this.todos[id]
      .isCompleted;
  }

  removeTodo(id: number) {
    this.todos.splice(this.getIndexFromId(id), 1);
  }
}
