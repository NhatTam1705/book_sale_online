import axios from 'axios';

import {
  ALL_AUTHOR_FAIL,
  ALL_AUTHOR_PAGINATION_FAIL,
  ALL_AUTHOR_PAGINATION_REQUEST,
  ALL_AUTHOR_PAGINATION_SUCCESS,
  ALL_AUTHOR_REQUEST,
  ALL_AUTHOR_SUCCESS,
  AUTHOR_DETAILS_FAIL,
  AUTHOR_DETAILS_REQUEST,
  AUTHOR_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_AUTHOR_FAIL,
  DELETE_AUTHOR_REQUEST,
  DELETE_AUTHOR_SUCCESS,
  NEW_AUTHOR_FAIL,
  NEW_AUTHOR_REQUEST,
  NEW_AUTHOR_SUCCESS,
  UPDATE_AUTHOR_FAIL,
  UPDATE_AUTHOR_REQUEST,
  UPDATE_AUTHOR_SUCCESS,
} from '../constants/authorConstants';

// Action handle get all author
export const getAuthors =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_AUTHOR_REQUEST });

      const { data } = await axios.get(`/api/v1/authors?keyword=${keyword}`);

      dispatch({
        type: ALL_AUTHOR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_AUTHOR_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action handle get all auhtor with pagination
export const getAuthorsPagination =
  (
    resPerPage = 4,
    currentPage = 1,
    sortBy = 'createdDate',
    orderBy = 'desc',
    keyword = ''
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_AUTHOR_PAGINATION_REQUEST });

      const { data } = await axios.get(
        `/api/v1/authors/${resPerPage}?sortBy=${sortBy}&orderBy=${orderBy}&page=${currentPage}&keyword=${keyword}`
      );

      dispatch({
        type: ALL_AUTHOR_PAGINATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_AUTHOR_PAGINATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action handle get single author details
export const getAuthorDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: AUTHOR_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/author/${id}`);

    dispatch({
      type: AUTHOR_DETAILS_SUCCESS,
      payload: data.author,
    });
  } catch (error) {
    dispatch({
      type: AUTHOR_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle new auhor
export const newAuthor = (authorData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_AUTHOR_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post(
      '/api/v1/admin/author/new',
      authorData,
      config
    );

    dispatch({
      type: NEW_AUTHOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: NEW_AUTHOR_FAIL, payload: error.response.data.message });
  }
};

// Action handle update author
export const updateAuthor = (id, authorData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_AUTHOR_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/author/${id}`,
      authorData,
      config
    );

    dispatch({
      type: UPDATE_AUTHOR_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_AUTHOR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle delete author
export const deleteAuthor = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_AUTHOR_REQUEST,
    });

    const { data } = await axios.delete(`/api/v1/admin/author/${id}`);

    dispatch({ type: DELETE_AUTHOR_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_AUTHOR_FAIL,
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
