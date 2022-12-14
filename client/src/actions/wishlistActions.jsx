import axios from 'axios';
import {
  ADD_TO_WISHLIST,
  REMOVE_ITEM_WISHLIST,
} from '../constants/wishlistConstants';

// Action handle add item to wishlist
export const addItemToWishlist = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_WISHLIST,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.soldPrice,
      image: data.product.images[0].url,
      discount: data.product?.discount?.percent || 0,
      stock: data.product.stock,
      format: data.product.format,
      language: data.product.language,
      author: data.product.author,
    },
  });

  localStorage.setItem(
    'wishlistItems',
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};

// Action handle remove item from wishlist
export const removeItemFromWishlist = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_WISHLIST,
    payload: id,
  });

  localStorage.setItem(
    'wishlistItems',
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};
