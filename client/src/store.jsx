import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  advertisementReducer,
  advertisementsReducer,
  newAdvertisementReducer,
} from './reducers/advertisementReducers';
import {
  authorDetailsReducer,
  authorReducer,
  authorsReducer,
  newAuthorReducer,
} from './reducers/authorReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  categoriesReducer,
  categoryReducer,
  newCategoryReducer,
} from './reducers/categoryReducers';
import {
  discountReducer,
  discountsReducer,
  newDiscountReducer,
} from './reducers/discountReducers';
import {
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
  ordersReducer,
} from './reducers/orderReducers';
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productsPaginationAdminReducer,
  productsPaginationReducer,
  productsReducer,
} from './reducers/productReducers';
import {
  newSubCategoryReducer,
  subCategoriesReducer,
  subCategoryReducer,
} from './reducers/subCategoryReducers';
import {
  authReducer,
  forgotPasswordReducer,
  userDetailsReducer,
  userReducer,
  usersReducer,
} from './reducers/userReducers';
import { wishlistReducer } from './reducers/wishlistReducers';

const reducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  productsPagination: productsPaginationReducer,
  productsPaginationAdmin: productsPaginationAdminReducer,
  productDetails: productDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,

  categories: categoriesReducer,
  category: categoryReducer,
  newCategory: newCategoryReducer,

  subCategories: subCategoriesReducer,
  subCategory: subCategoryReducer,
  newSubCategory: newSubCategoryReducer,

  authors: authorsReducer,
  authorDetails: authorDetailsReducer,
  newAuthor: newAuthorReducer,
  author: authorReducer,

  auth: authReducer,
  user: userReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  users: usersReducer,

  cart: cartReducer,
  wishlist: wishlistReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  order: orderReducer,
  orders: ordersReducer,

  discounts: discountsReducer,
  newDiscount: newDiscountReducer,
  discount: discountReducer,

  advertisements: advertisementsReducer,
  newAdvertisement: newAdvertisementReducer,
  advertisement: advertisementReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
  wishlist: {
    wishlistItems: localStorage.getItem('wishlistItems')
      ? JSON.parse(localStorage.getItem('wishlistItems'))
      : [],
  },
  // user: {
  //   user: localStorage.getItem('user')
  //     ? JSON.parse(localStorage.getItem('user'))
  //     : [],
  // },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
