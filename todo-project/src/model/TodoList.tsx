import { Todo } from "./Todo";

export interface TodoListDTO {
    todos: Todo[];
}

export class TodoList {
    private _todos: Todo[] = [];

    constructor(
      private _userId: number,
      todo?: Todo[]
    ) {
      if (todo) {
        this.todos.push(...todo);
      }
    }

    get userId() {
      return this._userId;
    }
  
    get todos(): Todo[] {
      return this._todos;
    }
  
    get completedTodos(): Todo[] {
      return this._todos.filter((todo) => todo.isCompleted === true);
    }
  
    get notCompletedTodos(): Todo[] {
      return this._todos.filter((todo) => todo.isCompleted === false);
    }

    addNewTodo(todo: Todo) {
      this._todos.push(todo);
    }
  }
