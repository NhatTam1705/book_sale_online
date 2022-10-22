import { Fragment } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footers/Footer';
import Header from './components/headers/Header';
import NavigationBar from './components/headers/NavigationBar';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import ShopPage from './pages/ShopPage';

function App() {
  return (
    <Fragment>
      <Routes path="/">
        <Route
          element={
            <>
              <Header></Header>
              <NavigationBar></NavigationBar>
              <Outlet></Outlet>
              <Footer></Footer>
            </>
          }
        >
          <Route
            path="/home"
            element={
              <>
                <HomePage></HomePage>
              </>
            }
          ></Route>
          <Route
            path="/shop"
            element={
              <>
                <ShopPage></ShopPage>
              </>
            }
          ></Route>
          <Route
            path="/shop/product/:id"
            element={<ProductPage></ProductPage>}
          ></Route>
          <Route path="/*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
