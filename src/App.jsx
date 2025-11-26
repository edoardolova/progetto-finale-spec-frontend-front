import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import GlobalProvider from './context/GlobalContext';

function App() {
  return(


    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout/>}>
            <Route path='/' element={<HomePage/>} />
          </Route>
        </Routes>
      </BrowserRouter>


    </GlobalProvider>



  )
}

export default App;
