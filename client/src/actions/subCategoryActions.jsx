import axios from 'axios';

import {
  ALL_SUB_CATEGORIES_FAIL,
  ALL_SUB_CATEGORIES_REQUEST,
  ALL_SUB_CATEGORIES_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/subCategoryConstants';

export const getSubCategories =
  (keyword = '', category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_SUB_CATEGORIES_REQUEST });

      let url = `/api/v1/subCategories?keyword=${keyword}`;

      if (category) {
        url = url + `&category=${category}`;
      }

      const { data } = await axios.get(url);

      dispatch({
        type: ALL_SUB_CATEGORIES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_SUB_CATEGORIES_FAIL,
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
