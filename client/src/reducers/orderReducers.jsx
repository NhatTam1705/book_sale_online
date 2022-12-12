import {
  ALL_ORDER_BY_USER_PAGINATION_FAIL,
  ALL_ORDER_BY_USER_PAGINATION_REQUEST,
  ALL_ORDER_BY_USER_PAGINATION_SUCCESS,
  ALL_ORDER_PAGINATION_FAIL,
  ALL_ORDER_PAGINATION_REQUEST,
  ALL_ORDER_PAGINATION_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_RESET,
  DELETE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_SUCCESS,
} from '../constants/orderConstants';

// Reducer hanlde create new order
export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case CREATE_ORDER_FAIL:
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

// Reducer handle get all my order
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
    case ALL_ORDER_BY_USER_PAGINATION_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDERS_SUCCESS:
    case ALL_ORDER_BY_USER_PAGINATION_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDERS_FAIL:
    case ALL_ORDER_BY_USER_PAGINATION_FAIL:
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

// Reducer handle get order details
export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS: {
      return {
        loading: false,
        order: action.payload,
      };
    }

    case ORDER_DETAILS_FAIL:
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

// Reducer handle update or delete order
export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
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

export const ordersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_PAGINATION_REQUEST:
      return {
        loading: true,
        orders: [],
      };

    case ALL_ORDER_PAGINATION_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        ordersCount: action.payload.ordersCount,
        filteredOrdersCount: action.payload.filteredOrdersCount,
      };

    case ALL_ORDER_PAGINATION_FAIL:
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
