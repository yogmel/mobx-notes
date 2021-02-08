import { makeAutoObservable } from "mobx";
import { TodoList } from "../model/TodoList";
import User from "../model/User";
import AppViewModel from "./AppViewModel";
import TodoListViewModel from "./TodoListViewModel";

export default class UserViewModel {
  users: User[] = [];
  id: number = 0;
  todoListViewModel: TodoListViewModel

  constructor(appViewModel: AppViewModel) {
    this.todoListViewModel = appViewModel.todoListViewModel;
    makeAutoObservable(this);
  }
  
  createUser(name: string) {
    const user = new User(this.id, name);
    
    this.users.push(user);
    this.todoListViewModel.createTodoList(this.id);

    this.id++;
  }

  getUserTodoList(userId: number): TodoList | undefined {
    return this.todoListViewModel.getUserTodoList(userId);
  }

  removeUser(id: number) {
    const userId = this.users.findIndex((user) => user.id === id);
    this.users.splice(userId, 1);
    this.todoListViewModel.removeTodoList(userId);
    console.log('onremove user', this.todoListViewModel.todoLists);
  }

  addTodo(userId: number, description: string) {
    this.todoListViewModel.addTodoInTodoList(userId, description);
  }
}
