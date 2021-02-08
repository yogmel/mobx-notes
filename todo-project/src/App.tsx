import React, { useState } from 'react';
import TodoLists from './view/TodoLists';
import UserList from './view/UserList';
import AppViewModel from './viewmodel/AppViewModel';

export interface AppProps {
  editor: AppViewModel;
}

function App(props: AppProps) {
  const { editor } = props;
  
  const [listView, setListView] = useState(true);
  const toggleView = () => setListView(!listView);

  return (
    <div>
      <button onClick={toggleView}>Toggle View</button>
      {listView && (
        <TodoLists editor={editor.todoListViewModel} />
      )}
      {!listView && (
        <UserList editor={editor.userViewModel} />
      )}
    </div>
  );
}

export default App;
