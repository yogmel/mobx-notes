import { makeAutoObservable } from "mobx";
import AppViewModel from "./AppViewModel";
import TodoListViewModel from "./TodoListViewModel";

class User {
  constructor(private id: number, public name: string, private todoList: TodoListViewModel) {}
}

export default class UserStore {
	users: User[] = [];
	id: number = 0;

  constructor(public appViewModel: AppViewModel) {
    makeAutoObservable(this);
	}
	
	createUser(name: string) {
		const user = new User(this.id, name);

		this.users.push(user);

		this.id++;
	}
}
