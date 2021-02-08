import { makeAutoObservable } from "mobx";
import TodoListViewModel from "./TodoListViewModel";
import UserViewModel from "./UserViewModel";

export default class AppViewModel {
  private _todoListViewModel: TodoListViewModel;
  private _userViewModel: UserViewModel;

  constructor() {
    this._todoListViewModel = new TodoListViewModel(this);
    this._userViewModel = new UserViewModel(this);
    makeAutoObservable(this);
  }

  get userViewModel() {
    return this._userViewModel;
  }

  get todoListViewModel() {
    return this._todoListViewModel;
  }
}
