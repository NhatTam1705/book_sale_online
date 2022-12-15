import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import {
  Fragment,
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import { loadUser } from './actions/userActions';
import './App.css';
// import AdvertisementAdminPage from './pages/admin/advertisement/AdvertisementAdminPage';
// import HomePage from './pages/home/HomePage';
import store from './store';

// import Footer from './components/footers/home/Footer';
const Footer = lazy(() => import('./components/footers/home/Footer'));
// import HeaderAdmin from './components/headers/admin/HeaderAdmin';
const HeaderAdmin = lazy(() =>
  import('./components/headers/admin/HeaderAdmin')
);
// import SideBarAdmin from './components/headers/admin/SideBarAdmin';
const SideBarAdmin = lazy(() =>
  import('./components/headers/admin/SideBarAdmin')
);
// import Header from './components/headers/home/Header';
const Header = lazy(() => import('./components/headers/home/Header'));
// import NavigationBar from './components/headers/home/NavigationBar';
const NavigationBar = lazy(() =>
  import('./components/headers/home/NavigationBar')
);
// import AccountProfile from './components/layouts/home/profile/outletProfile/account/AccountProfile';
const AccountProfile = lazy(() =>
  import(
    './components/layouts/home/profile/outletProfile/account/AccountProfile'
  )
);
// import AddressProfile from './components/layouts/home/profile/outletProfile/AddressProfile';
const AddressProfile = lazy(() =>
  import('./components/layouts/home/profile/outletProfile/AddressProfile')
);
// import DashboardProfile from './components/layouts/home/profile/outletProfile/DashboardProfile';
const DashboardProfile = lazy(() =>
  import('./components/layouts/home/profile/outletProfile/DashboardProfile')
);
// import OrdersProfile from './components/layouts/home/profile/outletProfile/orders/OrdersProfile';
const OrdersProfile = lazy(() =>
  import('./components/layouts/home/profile/outletProfile/orders/OrdersProfile')
);
// import WishlistProfile from './components/layouts/home/profile/outletProfile/WishlistProfile';
const WishlistProfile = lazy(() =>
  import('./components/layouts/home/profile/outletProfile/WishlistProfile')
);
// import AdvertisementAdminPage from './pages/admin/advertisement/AdvertisementAdminPage';
const AdAdminPage = lazy(() => import('./pages/admin/ad/AdAdminPage'));
// import AddAuthorPage from './pages/admin/author/AddAuthorPage';
const AddAuthorPage = lazy(() => import('./pages/admin/author/AddAuthorPage'));
// import AuthorListPage from './pages/admin/author/AuthorListPage';
const AuthorListPage = lazy(() =>
  import('./pages/admin/author/AuthorListPage')
);
// import CategoryAdminPage from './pages/admin/category/CategoryAdminPage';
const CategoryAdminPage = lazy(() =>
  import('./pages/admin/category/CategoryAdminPage')
);
// import CustomerAdminPage from './pages/admin/customer/CustomerAdminPage';
const CustomerAdminPage = lazy(() =>
  import('./pages/admin/customer/CustomerAdminPage')
);
// import CustomerProfileAdminPage from './pages/admin/customer/CustomerProfileAdminPage';
const CustomerProfileAdminPage = lazy(() =>
  import('./pages/admin/customer/CustomerProfileAdminPage')
);
// import DashboardAdminPage from './pages/admin/dashboard/DashboardAdminPage';
const DashboardAdminPage = lazy(() =>
  import('./pages/admin/dashboard/DashboardAdminPage')
);
// import DiscountAdminPage from './pages/admin/discount/DiscountAdminPage';
const DiscountAdminPage = lazy(() =>
  import('./pages/admin/discount/DiscountAdminPage')
);
// import OrderAdminPage from './pages/admin/order/OrderAdminPage';
const OrderAdminPage = lazy(() => import('./pages/admin/order/OrderAdminPage'));
// import OrderDetailsAdminPage from './pages/admin/order/OrderDetailsAdminPage';
const OrderDetailsAdminPage = lazy(() =>
  import('./pages/admin/order/OrderDetailsAdminPage')
);
// import AddProductPage from './pages/admin/product/AddProductPage';
const AddProductPage = lazy(() =>
  import('./pages/admin/product/AddProductPage')
);
// import ProductListPage from './pages/admin/product/ProductListPage';
const ProductListPage = lazy(() =>
  import('./pages/admin/product/ProductListPage')
);
// import AuthorPage from './pages/home/AuthorPage';
const AuthorPage = lazy(() => import('./pages/home/AuthorPage'));
// import AuthorSinglePage from './pages/home/AuthorSinglePage';
const AuthorSinglePage = lazy(() => import('./pages/home/AuthorSinglePage'));
// import CartPage from './pages/home/CartPage';
const CartPage = lazy(() => import('./pages/home/CartPage'));
// import CheckoutPage from './pages/home/CheckoutPage';
const CheckoutPage = lazy(() => import('./pages/home/CheckoutPage'));
// import ForgotPasswordPage from './pages/home/ForgotPasswordPage';
const ForgotPasswordPage = lazy(() =>
  import('./pages/home/ForgotPasswordPage')
);
// import HomePage from './pages/home/HomePage';
const HomePage = lazy(() => import('./pages/home/HomePage'));
// import NotFoundPage from './pages/home/NotFoundPage';
const NotFoundPage = lazy(() => import('./pages/home/NotFoundPage'));
// import OrderReceivedPage from './pages/home/OrderReceivedPage';
const OrderReceivedPage = lazy(() => import('./pages/home/OrderReceivedPage'));
// import ProductPage from './pages/home/ProductPage';
const ProductPage = lazy(() => import('./pages/home/ProductPage'));
// import ProfilePage from './pages/home/ProfilePage';
const ProfilePage = lazy(() => import('./pages/home/ProfilePage'));
// import RecoverPasswordPage from './pages/home/RecoverPasswordPage';
const RecoverPasswordPage = lazy(() =>
  import('./pages/home/RecoverPasswordPage')
);
// import ShopPage from './pages/home/ShopPage';
const ShopPage = lazy(() => import('./pages/home/ShopPage'));
// import SignInPage from './pages/home/SignInPage';
const SignInPage = lazy(() => import('./pages/home/SignInPage'));
// import SignUpPage from './pages/home/SignUpPage';
const SignUpPage = lazy(() => import('./pages/home/SignUpPage'));

function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const [stripeApiKey, setStripeApiKey] = useState('');
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }
    getStripApiKey();
  }, []);

  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Wrapper>
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
              <Route path="/login" element={<SignInPage></SignInPage>}></Route>
              <Route
                path="/register"
                element={<SignUpPage></SignUpPage>}
              ></Route>
              <Route path="/home" element={<HomePage></HomePage>}></Route>
              <Route
                path="/password/forgot"
                element={<ForgotPasswordPage></ForgotPasswordPage>}
              ></Route>
              <Route
                path="/password/reset/:token"
                element={<RecoverPasswordPage></RecoverPasswordPage>}
              ></Route>
              {['/shop', '/shop/search/:keyword'].map((path) => (
                <Route
                  key={path}
                  path={path}
                  element={<ShopPage></ShopPage>}
                ></Route>
              ))}
              <Route
                path="/shop/product/:id"
                element={<ProductPage></ProductPage>}
              ></Route>
              <Route path="/shop/cart" element={<CartPage></CartPage>}></Route>
              {stripeApiKey && (
                <Route
                  path="/shop/checkout"
                  element={
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <UserRoute>
                        <CheckoutPage></CheckoutPage>
                      </UserRoute>
                    </Elements>
                  }
                ></Route>
              )}
              <Route
                path="/shop/order/:id"
                element={<OrderReceivedPage></OrderReceivedPage>}
              ></Route>
              <Route
                path="/author/:id"
                element={<AuthorSinglePage></AuthorSinglePage>}
              ></Route>
              <Route path="/author" element={<AuthorPage></AuthorPage>}></Route>
              <Route
                path="/profile"
                element={
                  <UserRoute>
                    <ProfilePage></ProfilePage>
                  </UserRoute>
                }
              >
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
            </Route>
            <Route
              path="/admin"
              element={
                <AdminRoute>
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
                </AdminRoute>
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
                element={<CustomerProfileAdminPage></CustomerProfileAdminPage>}
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
                path="/admin/discounts"
                element={<DiscountAdminPage></DiscountAdminPage>}
              ></Route>
              <Route
                path="/admin/advertisements"
                element={<AdAdminPage></AdAdminPage>}
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
            <Route path="/*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
        </Wrapper>
      </Suspense>
      <ScrollToTop
        smooth
        viewBox="0 0 16 24"
        svgPath="M18 15l-6-6-6 6"
        style={{
          background: 'linear-gradient(94.43deg, #1A6BF0 0%, #0742A5 96.94%)',
        }}
      />
    </Fragment>
  );
}

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function UserRoute({ children }) {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  return isAuthenticated && user.role === 'user' ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

function AdminRoute({ children }) {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  return isAuthenticated && user.role === 'admin' ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default App;
