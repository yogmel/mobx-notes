import { makeAutoObservable } from "mobx";
import { Todo } from "../model/Todo";
import User from "../model/User";
import AppViewModel from "./AppViewModel";

export default class UserStore {
	users: User[] = [];
	id: number = 0;

	todoViewModel = this.appViewModel.todoViewModel;

  constructor(public appViewModel: AppViewModel) {
    makeAutoObservable(this);
	}
	
	createUser(name: string) {
		const todoList: Todo[] = [];
		const user = new User(this.id, name, todoList);

		this.users.push(user);
		this.id++;
	}

	getUserTodo(id: number) {
		const user = this.users.find((user) => id === user.id);
		return user?.todoList;
	}

	removeUser(id: number) {
		this.users.splice(id, 1);
	}
}
