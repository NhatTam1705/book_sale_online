import axios from 'axios';

import {
  ALL_CATEGORIES_FAIL,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/categoryConstants';

export const getCategories =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_CATEGORIES_REQUEST });

      const { data } = await axios.get(`/api/v1/categories?keyword=${keyword}`);

      dispatch({
        type: ALL_CATEGORIES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_CATEGORIES_FAIL,
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
