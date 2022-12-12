import axios from 'axios';
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
  DELETE_DISCOUNT_SUCCESS,
  NEW_DISCOUNT_FAIL,
  NEW_DISCOUNT_REQUEST,
  NEW_DISCOUNT_SUCCESS,
  UPDATE_DISCOUNT_FAIL,
  UPDATE_DISCOUNT_REQUEST,
  UPDATE_DISCOUNT_SUCCESS,
} from '../constants/discountConstants';

export const getDiscounts =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_DISCOUNTS_REQUEST });

      const { data } = await axios.get(
        `/api/v1/admin/discounts?keyword=${keyword}`
      );

      dispatch({
        type: ALL_DISCOUNTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_DISCOUNTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action handle get all discount with pagination
export const getDiscountsPagination =
  (
    resPerPage = 4,
    currentPage = 1,
    sortBy = 'createdDate',
    orderBy = 'desc',
    keyword = ''
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_DISCOUNTS_PAGINATION_REQUEST });

      const { data } = await axios.get(
        `/api/v1/admin/discounts/${resPerPage}?sortBy=${sortBy}&orderBy=${orderBy}&page=${currentPage}&keyword=${keyword}`
      );

      dispatch({
        type: ALL_DISCOUNTS_PAGINATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_DISCOUNTS_PAGINATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action handle new discount
export const newDiscount = (discountData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_DISCOUNT_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post(
      '/api/v1/admin/discount/new',
      discountData,
      config
    );

    dispatch({
      type: NEW_DISCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: NEW_DISCOUNT_FAIL, payload: error.response.data.message });
  }
};

// Action handle update discount
export const updateDiscount = (id, discountData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_DISCOUNT_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/discount/${id}`,
      discountData,
      config
    );

    dispatch({
      type: UPDATE_DISCOUNT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DISCOUNT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle delete dicount
export const deleteDiscount = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_DISCOUNT_REQUEST,
    });

    const { data } = await axios.delete(`/api/v1/admin/discount/${id}`);

    dispatch({ type: DELETE_DISCOUNT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_DISCOUNT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
