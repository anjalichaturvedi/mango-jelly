import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { store } from './store';
import Chat from './components/Chat';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <IconButton
          sx={{ position: 'absolute', top: 10, right: 10 }}
          onClick={toggleDarkMode}
          color="inherit"
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Chat darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;