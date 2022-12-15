import axios from 'axios';
import {
  ALL_ADVERTISEMENTS_FAIL,
  ALL_ADVERTISEMENTS_PAGINATION_FAIL,
  ALL_ADVERTISEMENTS_PAGINATION_REQUEST,
  ALL_ADVERTISEMENTS_PAGINATION_SUCCESS,
  ALL_ADVERTISEMENTS_REQUEST,
  ALL_ADVERTISEMENTS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_ADVERTISEMENT_FAIL,
  DELETE_ADVERTISEMENT_REQUEST,
  DELETE_ADVERTISEMENT_SUCCESS,
  NEW_ADVERTISEMENT_FAIL,
  NEW_ADVERTISEMENT_REQUEST,
  NEW_ADVERTISEMENT_SUCCESS,
  UPDATE_ADVERTISEMENT_FAIL,
  UPDATE_ADVERTISEMENT_REQUEST,
  UPDATE_ADVERTISEMENT_SUCCESS,
} from '../constants/advertisementConstants';

// Action handle get all advertisement
export const getAdvertisements = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ADVERTISEMENTS_REQUEST });

    const { data } = await axios.get(`/api/v1/advertisements`);

    dispatch({ type: ALL_ADVERTISEMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_ADVERTISEMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle get all advertisement with pagination
export const getAdvertisementsPagination =
  (
    resPerPage = 4,
    currentPage = 1,
    sortBy = 'createdDate',
    orderBy = 'desc',
    keyword = ''
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_ADVERTISEMENTS_PAGINATION_REQUEST });

      const { data } = await axios.get(
        `/api/v1/admin/advertisements/${resPerPage}?sortBy=${sortBy}&orderBy=${orderBy}&page=${currentPage}&keyword=${keyword}`
      );

      dispatch({
        type: ALL_ADVERTISEMENTS_PAGINATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ADVERTISEMENTS_PAGINATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action handle new advertisement
export const newAdvertisement = (advertisementData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_ADVERTISEMENT_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post(
      '/api/v1/admin/advertisement/new',
      advertisementData,
      config
    );

    dispatch({
      type: NEW_ADVERTISEMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ADVERTISEMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle update advertisement
export const updateAdvertisement =
  (id, advertisementData) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_ADVERTISEMENT_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.put(
        `/api/v1/admin/advertisement/${id}`,
        advertisementData,
        config
      );

      dispatch({
        type: UPDATE_ADVERTISEMENT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ADVERTISEMENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action handle delete advertisement
export const deleteAdvertisement = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ADVERTISEMENT_REQUEST,
    });

    const { data } = await axios.delete(`/api/v1/admin/advertisement/${id}`);

    dispatch({ type: DELETE_ADVERTISEMENT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ADVERTISEMENT_FAIL,
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
