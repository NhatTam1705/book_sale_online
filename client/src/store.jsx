import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  authorDetailsReducer,
  authorsReducer,
} from './reducers/authorReducers';
import { categoriesReducer } from './reducers/categoryReducers';
import {
  productDetailsReducer,
  productsPaginationReducer,
  productsReducer,
} from './reducers/productReducers';
import { subCategoriesReducer } from './reducers/subCategoryReducers';
import {
  authReducer,
  forgotPasswordReducer,
  userReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  products: productsReducer,
  productsPagination: productsPaginationReducer,
  productDetails: productDetailsReducer,
  categories: categoriesReducer,
  subCategories: subCategoriesReducer,
  authors: authorsReducer,
  authorDetails: authorDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
