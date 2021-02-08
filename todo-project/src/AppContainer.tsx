import React from 'react';
import App from './App';
import AppViewModel from './viewmodel/AppViewModel';

function AppContainer() {

  const appViewModel = new AppViewModel();

  return (
    <App
      editor={appViewModel}
    />
  );
}

export default AppContainer;
