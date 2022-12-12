import axios from 'axios';
import {
  ALL_CATEGORIES_FAIL,
  ALL_CATEGORIES_PAGINATION_FAIL,
  ALL_CATEGORIES_PAGINATION_REQUEST,
  ALL_CATEGORIES_PAGINATION_SUCCESS,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  CLEAR_ERRORS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
} from '../constants/categoryConstants';

// Action handle get all category
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

// Action handle get all category with pagination
export const getCategoriesPagination =
  (
    resPerPage = 4,
    currentPage = 1,
    sortBy = 'createdDate',
    orderBy = 'desc',
    keyword = ''
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_CATEGORIES_PAGINATION_REQUEST });

      const { data } = await axios.get(
        `/api/v1/categories/${resPerPage}?sortBy=${sortBy}&orderBy=${orderBy}&page=${currentPage}&keyword=${keyword}`
      );

      dispatch({
        type: ALL_CATEGORIES_PAGINATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_CATEGORIES_PAGINATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action handle new category
export const newCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_CATEGORY_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post(
      '/api/v1/admin/category/new',
      categoryData,
      config
    );

    dispatch({
      type: NEW_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: NEW_CATEGORY_FAIL, payload: error.response.data.message });
  }
};

// Action handle update category
export const updateCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CATEGORY_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/category/${id}`,
      categoryData,
      config
    );

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle delete category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CATEGORY_REQUEST,
    });

    const { data } = await axios.delete(`/api/v1/admin/category/${id}`);

    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
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
