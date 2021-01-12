import { autorun } from "mobx";
import { TodoList } from "../viewmodel";

const newTodoList = new TodoList();

autorun(() => {
  console.log("-------------------------");
  console.log("\\ --- CURRENT TODOS --- //");
  newTodoList.showAllTodos();

  console.log("---");

  console.log("*** COMPLETED ***");
  newTodoList.showCompletedTodos();

  console.log("---");

  console.log("*** NOT COMPLETED ***");
  newTodoList.showNotCompletedTodos();
});

let answer;

do {
  answer = prompt('What do you want to do? \nType add, remove, change status, show all, show completed, show not completed \nOr exit to close the prompt')?.toLowerCase();

  switch(answer) {
    case 'add': {
      const todo = prompt('What do you want to add?');
      if (todo) {
        newTodoList.addTodo(todo);
      }
      break;
    }
    case 'remove': {
      const todo = prompt('What is the id of the task you want to remove?');
      if (todo) {
        const chosenTask = newTodoList.allTodos.find(item => item.id === parseInt(todo));
        if (chosenTask) {
          newTodoList.removeTodo(chosenTask.id);
        }
      }
      break;
    }
    case 'change status': {
      const todo = prompt('What is the id of the task you want to change status?');
      if (todo) {
        const chosenTask = newTodoList.allTodos.find(item => item.id === parseInt(todo));
        if (chosenTask) {
          newTodoList.toggleCompletionState(chosenTask.id);
        }
      }
      break;
    }
    case 'show all': {
      console.log("*** ALL TODOS ***");
      newTodoList.showAllTodos();
      break;
    }
    case 'show completed': {
      console.log("*** COMPLETED ***");
      newTodoList.showCompletedTodos();
      break;
    }
    case 'show not completed': {
      console.log("*** NOT COMPLETED ***");
      newTodoList.showNotCompletedTodos();
      break;
    }
  }

} while (answer !== 'exit')

export {};
