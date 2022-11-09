import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { categoriesReducer } from './reducers/categoryReducers';
import { productsReducer } from './reducers/productReducers';

const reducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
