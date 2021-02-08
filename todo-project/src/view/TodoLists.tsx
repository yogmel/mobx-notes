import { observer } from "mobx-react";
import TodoListViewModel from "../viewmodel/TodoListViewModel";

export interface TodoListsProps {
  editor: TodoListViewModel;
}

function TodoLists(props: TodoListsProps) {
  const { allCompletedTodos, allNotCompletedTodos } = props.editor;

  return (
    <div>
      <h2>Completed Todos</h2>
			{allCompletedTodos.map(todo => (
        <div>{todo.description}</div>
      ))}

      <hr />
      <h2>Not Completed Todos</h2>
      {allNotCompletedTodos.map(todo => (
        <div>{todo.description}</div>
      ))}
    </div>
  );
}

export default observer(TodoLists);
