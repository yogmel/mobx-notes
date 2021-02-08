import { makeAutoObservable } from "mobx";
import { Todo } from "../model/Todo";
import { TodoList } from "../model/TodoList";
import AppViewModel from "./AppViewModel";


export default class TodoListViewModel {
  _todoLists: TodoList[] = [];
  appViewModel: AppViewModel

  constructor(appViewModel: AppViewModel) {
    this.appViewModel = appViewModel;
    makeAutoObservable(this);
  }

  get todoLists() {
    return this._todoLists;
  }

  get allCompletedTodos() {
    return this.getAllCompletedTodos();
  }

  get allNotCompletedTodos() {
    return this.getAllNotCompletedTodos();
  }

  createTodoList(userId: number, todo?: Todo) {
    if (todo) {
      this._todoLists.push(new TodoList(userId, [todo]));
    } else {
      this._todoLists.push(new TodoList(userId));
    }
  }

  getAllCompletedTodos(): Todo[]{
    let completedTodos: Todo[] = [];

    this.todoLists.forEach((todoList) => 
    {
      completedTodos = [...completedTodos, ...todoList.completedTodos];
    });
    return completedTodos;
  }

  getAllNotCompletedTodos(): Todo[]{
    let completedTodos: Todo[] = [];
    this.todoLists.forEach((todoList) => 
    {
      completedTodos = [...completedTodos, ...todoList.notCompletedTodos];
    });
    return completedTodos;
  }

  // addTodo(userId: number, todo: string) {
  //   const newTodo = new Todo(this.id, userId, todo, false);
  //   this.todoLists.push(newTodo);
  //   this.id++;
  //   console.log('addTodo', this.todoLists);
  // }

  // showNotCompletedTodos() {
  //   this.notCompletedTodos.forEach((todo) => {
  //     console.log(todo.description);
  //   });
  // }

  getIndexFromId(userId: number) {
    return this.todoLists.findIndex((todoList) => todoList.userId === userId);
  }

  // updateDescription(id: number, description: string) {
  //   this.todoLists[this.getIndexFromId(id)].description = description;
  // }

  // toggleCompletionState(id: number) {
  //   this.todoLists[this.getIndexFromId(id)].isCompleted = !this.todoLists[id]
  //     .isCompleted;
  // }

  removeTodoList(userId: number): void {
    this.todoLists.splice(this.getIndexFromId(userId), 1);
  }

  getUserTodoList(userId: number): TodoList | undefined {
    return this.todoLists.find(todoList => userId === todoList.userId);
  }

  addTodoInTodoList(userId: number, description: string): void {
    const userTodoList = this.getUserTodoList(userId);
    const newTodo = new Todo(userId, userId, description);
    userTodoList?.addNewTodo(newTodo);
  }
}
