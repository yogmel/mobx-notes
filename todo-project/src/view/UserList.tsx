import { observer } from "mobx-react";
import { ChangeEvent, useEffect, useState } from "react";
import { TodoList } from "../model/TodoList";
import User from "../model/User";
import UserViewModel from "../viewmodel/UserViewModel";

export interface UserListProps {
  editor: UserViewModel;
}

function UserList(props: UserListProps) {
  const { editor } = props;

  const [userName, setUserName] = useState("");
  const [chosenUser, setChosenUser] = useState<User>();
  const [chosenUserTodoList, setChosenUserTodoList] = useState<TodoList>();
  const [todoDescription, setTodoDescription] = useState("");

  const createUser = () => {
    editor.createUser(userName);
  };

  const onInputNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onInputTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoDescription(e.target.value);
  };

  const removeUser = (userId: number) => {
    if (userId) {
      editor.removeUser(userId);
    }
  };

  const onAddTodo = () => {
    if (chosenUser) {
      editor.addTodo(chosenUser.id, todoDescription);
      console.log(editor.getUserTodoList(chosenUser.id));
      setChosenUserTodoList(editor.getUserTodoList(chosenUser.id));
    }
  };

  const viewUser = (user: User) => {
    setChosenUser(user);
    setChosenUserTodoList(editor.getUserTodoList(user.id));
  };

  useEffect(() => {
    if (chosenUser) {
      setChosenUserTodoList(editor.getUserTodoList(chosenUser.id));
    }
  }, [chosenUser, chosenUserTodoList, editor]);

  const userTodoList = (user: User): TodoList | undefined => {
    console.log('aloka', editor.getUserTodoList(user.id));
    return editor.getUserTodoList(user.id);
  }

  useEffect(() => {

  }, []);

  return (
    <div>
      <input type="text" onChange={onInputNameChange} />
      <button onClick={createUser}>Create user</button>

      {editor.users.map((user) => (
        <button
          key={user.id}
          data-userid={user.id}
          onClick={() => viewUser(user)}
        >
          {user.name}
        </button>
      ))}

      {chosenUser && (
        <div>
          <h3>
            {chosenUser.id}. {chosenUser.name}
          </h3>

          <p>Add new todo</p>
          <input type="text" onChange={onInputTodoChange} />
          <button onClick={onAddTodo}>Add todo</button>

          {chosenUserTodoList && chosenUserTodoList.todos.map(todo => (
            <div>{todo.description}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default observer(UserList);
