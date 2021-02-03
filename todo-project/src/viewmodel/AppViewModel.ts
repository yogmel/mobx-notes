import TodoListViewModel from "./TodoListViewModel";
import UserViewModel from "./UserViewModel";

export default class AppViewModel {
  userViewModel = new UserViewModel(this);
  todoViewModel = new TodoListViewModel(this);
}
