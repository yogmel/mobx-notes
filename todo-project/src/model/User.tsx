import { Todo } from "./Todo";

export interface UserDTO {
    id: number;
    name: string;
    todoList: Todo[];
}

export default class User {
    constructor(public id: number, public name: string, public todoList: Todo[]) {}
}
