import axios from 'axios';
import {
  ALL_ORDER_BY_USER_PAGINATION_FAIL,
  ALL_ORDER_BY_USER_PAGINATION_REQUEST,
  ALL_ORDER_BY_USER_PAGINATION_SUCCESS,
  ALL_ORDER_PAGINATION_FAIL,
  ALL_ORDER_PAGINATION_REQUEST,
  ALL_ORDER_PAGINATION_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from '../constants/orderConstants';

// Action handle create new order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/order/new', order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLEAR_ERRORS,
      payload: error.response.data.message,
    });
  }
};

// Action hanle get all my order
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_ORDERS_REQUEST,
    });

    const { data } = await axios.get('/api/v1/orders/me');

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle get all order pagination by user
export const getOrdersPagination =
  (
    resPerPage = 4,
    currentPage = 1,
    sortBy = 'createdDate',
    orderBy = 'desc',
    id
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDER_BY_USER_PAGINATION_REQUEST });

      const { data } = await axios.get(
        `/api/v1/orders/${id}/${resPerPage}?sortBy=${sortBy}&orderBy=${orderBy}&page=${currentPage}`
      );

      dispatch({
        type: ALL_ORDER_BY_USER_PAGINATION_SUCCESS,
        payload: data.orders,
      });
    } catch (error) {
      dispatch({
        type: ALL_ORDER_BY_USER_PAGINATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action handle get order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/order/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle update order
export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      orderData,
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle delete order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle get all category with pagination
export const getAllOrdersPagination =
  (
    resPerPage = 4,
    currentPage = 1,
    sortBy = 'createdDate',
    orderBy = 'desc',
    user = '',
    orderStatus = 'Processing'
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDER_PAGINATION_REQUEST });

      let url = `/api/v1/admin/orders/${resPerPage}?sortBy=${sortBy}&orderBy=${orderBy}&page=${currentPage}`;

      if (user) {
        url = url + `&user=${user}`;
      }

      if (orderStatus) {
        url = url + `&orderStatus=${orderStatus}`;
      }

      const { data } = await axios.get(url);

      dispatch({
        type: ALL_ORDER_PAGINATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ORDER_PAGINATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action handle clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
