import { Fragment, Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footers/home/Footer';
import HeaderAdmin from './components/headers/admin/HeaderAdmin';
import SideBarAdmin from './components/headers/admin/SideBarAdmin';
import Header from './components/headers/home/Header';
import NavigationBar from './components/headers/home/NavigationBar';
import AccountProfile from './components/layouts/home/profile/outletProfile/AccountProfile';
import AddressProfile from './components/layouts/home/profile/outletProfile/AddressProfile';
import DashboardProfile from './components/layouts/home/profile/outletProfile/DashboardProfile';
import OrdersProfile from './components/layouts/home/profile/outletProfile/OrdersProfile';
import WishlistProfile from './components/layouts/home/profile/outletProfile/WishlistProfile';
import AddAuthorPage from './pages/admin/author/AddAuthorPage';
import AuthorListPage from './pages/admin/author/AuthorListPage';
import CategoryAdminPage from './pages/admin/category/CategoryAdminPage';
import CustomerAdminPage from './pages/admin/customer/CustomerAdminPage';
import CustomerProfileAdmin from './pages/admin/customer/CustomerProfileAdmin';
import DashboardAdminPage from './pages/admin/dashboard/DashboardAdminPage';
import OrderAdminPage from './pages/admin/order/OrderAdminPage';
import OrderDetailsAdminPage from './pages/admin/order/OrderDetailsAdminPage';
import AddProductPage from './pages/admin/product/AddProductPage';
import ProductListPage from './pages/admin/product/ProductListPage';
import AuthorPage from './pages/home/AuthorPage';
import AuthorSinglePage from './pages/home/AuthorSinglePage';
import CartPage from './pages/home/CartPage';
import CheckoutPage from './pages/home/CheckoutPage';
import HomePage from './pages/home/HomePage';
import NotFoundPage from './pages/home/NotFoundPage';
import OrderReceivedPage from './pages/home/OrderReceivedPage';
import ProductPage from './pages/home/ProductPage';
import ProfilePage from './pages/home/ProfilePage';
import ShopPage from './pages/home/ShopPage';

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
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
              path="/shop/search/:keyword?format=:format"
              element={<ShopPage></ShopPage>}
            ></Route>
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
              element={<OrderReceivedPage></OrderReceivedPage>}
            ></Route>
            <Route
              path="/author/:id"
              element={<AuthorSinglePage></AuthorSinglePage>}
            ></Route>
            <Route path="/author" element={<AuthorPage></AuthorPage>}></Route>
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
          <Route
            path="/admin"
            element={
              <>
                <HeaderAdmin></HeaderAdmin>
                <div className="grid grid-cols-10">
                  <div className="col-span-2 ">
                    <SideBarAdmin></SideBarAdmin>
                  </div>
                  <div className="col-span-8 p-6 ">
                    <Outlet></Outlet>
                  </div>
                </div>
              </>
            }
          >
            <Route
              path="/admin/dashboard"
              element={<DashboardAdminPage></DashboardAdminPage>}
            ></Route>
            <Route
              path="/admin/customers"
              element={<CustomerAdminPage></CustomerAdminPage>}
            ></Route>
            <Route
              path="/admin/customer/:id"
              element={<CustomerProfileAdmin></CustomerProfileAdmin>}
            ></Route>
            <Route
              path="/admin/orders"
              element={<OrderAdminPage></OrderAdminPage>}
            ></Route>
            <Route
              path="/admin/order/:id"
              element={<OrderDetailsAdminPage></OrderDetailsAdminPage>}
            ></Route>
            <Route
              path="/admin/products"
              element={<ProductListPage></ProductListPage>}
            ></Route>
            <Route
              path="/admin/product"
              element={<AddProductPage></AddProductPage>}
            ></Route>
            <Route
              path="/admin/categories"
              element={<CategoryAdminPage></CategoryAdminPage>}
            ></Route>
            <Route
              path="/admin/authors"
              element={<AuthorListPage></AuthorListPage>}
            ></Route>
            <Route
              path="/admin/author"
              element={<AddAuthorPage></AddAuthorPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
