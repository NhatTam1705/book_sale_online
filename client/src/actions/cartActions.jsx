import axios from 'axios';
import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_SHIPPING_INFO,
  REMOVE_ALL_CART_AND_INFORMATION,
} from '../constants/cartConstants';

// Action handle add item to cart
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.soldPrice,
      // image: data.product.image[0].url,
      stock: data.product.stock,
      format: data.product.format,
      language: data.product.language,
      author: data.product.author,
      quantity,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// Action handle remove item from cart
export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// Action handle remove all cart and information
export const removeAllCartAndInformation = () => async (dispatch) => {
  dispatch({ type: REMOVE_ALL_CART_AND_INFORMATION });
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingInfo');
};

// Action handle save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem('shippingInfo', JSON.stringify(data));
};
