import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import GlobalProvider from './context/GlobalContext';
import ProductsPage from './pages/ProductsPage';
import DetailPage from './pages/DetailPage';
import ComparePage from './pages/ComparePage';

function App() {
  return(


    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout/>}>
            <Route path='/' element={<HomePage/>} />
            <Route path='/products' element={<ProductsPage/>} />
            <Route path='/products/:id' element={<DetailPage/>} />
            <Route path='/products/:id1/:id2' element={<ComparePage/>} />
          </Route>
        </Routes>
      </BrowserRouter>


    </GlobalProvider>



  )
}

export default App;
