import { Fragment } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footers/Footer';
import Header from './components/headers/Header';
import NavigationBar from './components/headers/NavigationBar';
import AccountProfile from './components/layouts/home/profile/outletProfile/AccountProfile';
import AddressProfile from './components/layouts/home/profile/outletProfile/AddressProfile';
import DashboardProfile from './components/layouts/home/profile/outletProfile/DashboardProfile';
import OrdersProfile from './components/layouts/home/profile/outletProfile/OrdersProfile';
import WishlistProfile from './components/layouts/home/profile/outletProfile/WishlistProfile';
import CartPage from './pages/home/CartPage';
import CheckoutPage from './pages/home/CheckoutPage';
import HomePage from './pages/home/HomePage';
import NotFoundPage from './pages/home/NotFoundPage';
import OrderReceived from './pages/home/OrderReceived';
import ProductPage from './pages/home/ProductPage';
import ProfilePage from './pages/home/ProfilePage';
import ShopPage from './pages/home/ShopPage';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header></Header>
              <NavigationBar></NavigationBar>
              <Outlet></Outlet>
              <Footer></Footer>
            </>
          }
        >
          <Route path="/home" element={<HomePage></HomePage>}></Route>
          <Route path="/shop" element={<ShopPage></ShopPage>}></Route>
          <Route
            path="/shop/product/:id"
            element={<ProductPage></ProductPage>}
          ></Route>
          <Route path="/shop/cart" element={<CartPage></CartPage>}></Route>
          <Route
            path="/shop/checkout"
            element={<CheckoutPage></CheckoutPage>}
          ></Route>
          <Route
            path="/shop/order/:id"
            element={<OrderReceived></OrderReceived>}
          ></Route>
          <Route path="/profile" element={<ProfilePage></ProfilePage>}>
            <Route
              path="/profile/dashboard"
              element={<DashboardProfile></DashboardProfile>}
            ></Route>
            <Route
              path="/profile/orders"
              element={<OrdersProfile></OrdersProfile>}
            ></Route>
            <Route
              path="/profile/address"
              element={<AddressProfile></AddressProfile>}
            ></Route>
            <Route
              path="/profile/account"
              element={<AccountProfile></AccountProfile>}
            ></Route>
            <Route
              path="/profile/wishlist"
              element={<WishlistProfile></WishlistProfile>}
            ></Route>
          </Route>
          <Route path="/*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
