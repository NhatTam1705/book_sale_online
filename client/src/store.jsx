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

const reducer = combineReducers({
  products: productsReducer,
  productsPagination: productsPaginationReducer,
  productDetails: productDetailsReducer,
  categories: categoriesReducer,
  authors: authorsReducer,
  authorDetails: authorDetailsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
