import {
  ADD_TO_WISHLIST,
  REMOVE_ITEM_WISHLIST,
} from '../constants/wishlistConstants';

export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };

    case REMOVE_ITEM_WISHLIST:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (i) => i.product !== action.payload
        ),
      };

    default:
      return state;
  }
};
