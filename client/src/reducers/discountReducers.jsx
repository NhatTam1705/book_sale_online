import {
  ALL_DISCOUNTS_FAIL,
  ALL_DISCOUNTS_PAGINATION_FAIL,
  ALL_DISCOUNTS_PAGINATION_REQUEST,
  ALL_DISCOUNTS_PAGINATION_SUCCESS,
  ALL_DISCOUNTS_REQUEST,
  ALL_DISCOUNTS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_DISCOUNT_FAIL,
  DELETE_DISCOUNT_REQUEST,
  DELETE_DISCOUNT_RESET,
  DELETE_DISCOUNT_SUCCESS,
  NEW_DISCOUNT_FAIL,
  NEW_DISCOUNT_REQUEST,
  NEW_DISCOUNT_RESET,
  NEW_DISCOUNT_SUCCESS,
  UPDATE_DISCOUNT_FAIL,
  UPDATE_DISCOUNT_REQUEST,
  UPDATE_DISCOUNT_RESET,
  UPDATE_DISCOUNT_SUCCESS,
} from '../constants/discountConstants';

export const discountsReducer = (state = { discounts: [] }, action) => {
  switch (action.type) {
    case ALL_DISCOUNTS_REQUEST:
    case ALL_DISCOUNTS_PAGINATION_REQUEST:
      return {
        loading: true,
        discounts: [],
      };

    case ALL_DISCOUNTS_SUCCESS:
    case ALL_DISCOUNTS_PAGINATION_SUCCESS:
      return {
        loading: false,
        discounts: action.payload.discounts,
        discountsCount: action.payload.discountsCount,
        filteredDiscountsCount: action.payload.filteredDiscountsCount,
      };

    case ALL_DISCOUNTS_FAIL:
    case ALL_DISCOUNTS_PAGINATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Reducer handle new discount
export const newDiscountReducer = (state = { discount: {} }, action) => {
  switch (action.type) {
    case NEW_DISCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_DISCOUNT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        discount: action.payload.discount,
      };

    case NEW_DISCOUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_DISCOUNT_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Reducer handle update or delete discount
export const discountReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DISCOUNT_REQUEST:
    case UPDATE_DISCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_DISCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_DISCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_DISCOUNT_FAIL:
    case UPDATE_DISCOUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_DISCOUNT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_DISCOUNT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
