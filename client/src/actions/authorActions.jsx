import axios from 'axios';

import {
  ALL_AUTHOR_FAIL,
  ALL_AUTHOR_REQUEST,
  ALL_AUTHOR_SUCCESS,
  AUTHOR_DETAILS_FAIL,
  AUTHOR_DETAILS_REQUEST,
  AUTHOR_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from '../constansts/authorConstansts';

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

// Action handle clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
