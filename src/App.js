// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import Chat from './components/Chat';
import { store } from './store.js';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Chat />
    </Provider>
  );
}

export default App;