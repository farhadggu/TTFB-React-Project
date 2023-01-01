import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext, useMode } from "./theme";
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SettingPage from './pages/SettingPage';

const getLocalStorage = () => {
  let list = localStorage.getItem('data');
  if(list) {
    return JSON.parse(localStorage.getItem('data'))

  } else {
    return []
  }
}

function App() {
  const [theme, colorMode] = useMode();
  const [items, setItems] = useState(getLocalStorage())

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    setTimeout(() => {
      window.location.reload()
    }, 600000)
  }, [])

  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage items={items} />} />
            <Route path='/settings' element={<SettingPage items={items} setItems={setItems} />} />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;