import axios from 'axios';

import {
  ALL_SUB_CATEGORIES_FAIL,
  ALL_SUB_CATEGORIES_PAGINATION_FAIL,
  ALL_SUB_CATEGORIES_PAGINATION_REQUEST,
  ALL_SUB_CATEGORIES_PAGINATION_SUCCESS,
  ALL_SUB_CATEGORIES_REQUEST,
  ALL_SUB_CATEGORIES_SUCCESS,
  CLEAR_ERRORS,
  DELETE_SUB_CATEGORY_FAIL,
  DELETE_SUB_CATEGORY_REQUEST,
  DELETE_SUB_CATEGORY_SUCCESS,
  NEW_SUB_CATEGORY_FAIL,
  NEW_SUB_CATEGORY_REQUEST,
  NEW_SUB_CATEGORY_SUCCESS,
  UPDATE_SUB_CATEGORY_FAIL,
  UPDATE_SUB_CATEGORY_REQUEST,
  UPDATE_SUB_CATEGORY_SUCCESS,
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

export const getSubCategoriesPagination =
  (
    resPerPage = 4,
    currentPage = 1,
    sortBy = 'createdDate',
    orderBy = 'desc',
    keyword = '',
    category = ''
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_SUB_CATEGORIES_PAGINATION_REQUEST });

      let url = `/api/v1/subCategories/${resPerPage}?sortBy=${sortBy}&orderBy=${orderBy}&page=${currentPage}&keyword=${keyword}`;

      if (category) {
        url = url + `&category=${category}`;
      }

      const { data } = await axios.get(url);

      dispatch({
        type: ALL_SUB_CATEGORIES_PAGINATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_SUB_CATEGORIES_PAGINATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action handle new sub category
export const newSubCategory = (subCategoryData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_SUB_CATEGORY_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post(
      '/api/v1/admin/subCategory/new',
      subCategoryData,
      config
    );

    dispatch({
      type: NEW_SUB_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_SUB_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle update sub category
export const updateSubCategory = (id, subCategoryData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_SUB_CATEGORY_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/subCategory/${id}`,
      subCategoryData,
      config
    );

    dispatch({
      type: UPDATE_SUB_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SUB_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle delete sub category
export const deleteSubCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SUB_CATEGORY_REQUEST,
    });

    const { data } = await axios.delete(`/api/v1/admin/SubCategory/${id}`);

    dispatch({ type: DELETE_SUB_CATEGORY_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_SUB_CATEGORY_FAIL,
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
