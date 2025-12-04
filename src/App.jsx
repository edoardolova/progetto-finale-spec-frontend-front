import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import GlobalProvider from './context/GlobalContext';
import ProductsPage from './pages/ProductsPage';
import DetailPage from './pages/DetailPage';
import ComparePage from './pages/ComparePage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return(


    <GlobalProvider>
      <BrowserRouter>
      <ScrollToTop></ScrollToTop>
        <Routes>
          <Route element={<DefaultLayout/>}>
            <Route path='/' element={<HomePage/>} />
            <Route path='/products' element={<ProductsPage/>} />
            <Route path='/products/:id' element={<DetailPage/>} />
            <Route path='/products/compare/:ids' element={<ComparePage/>} />
          </Route>
        </Routes>
      </BrowserRouter>


    </GlobalProvider>



  )
}

export default App;
