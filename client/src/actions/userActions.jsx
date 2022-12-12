import axios from 'axios';
import {
  ALL_USER_FAIL,
  ALL_USER_PAGINATION_FAIL,
  ALL_USER_PAGINATION_REQUEST,
  ALL_USER_PAGINATION_SUCCESS,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  CLEAR_ERRORS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  NEW_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from '../constants/userConstants';

// Action handle login
export const login = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'api/v1/login',
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
    // localStorage.setItem('user', JSON.stringify(getState().auth.user));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle register
export const register =
  (name, email, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/v1/register',
        { name, email, password, confirmPassword },
        config
      );

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action handle load user
export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get('api/v1/me');

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle logout
export const logout = () => async (dispatch) => {
  try {
    await axios.get('/api/v1/logout');
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.put('/api/v1/me/update', userData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle update password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      '/api/v1/password/update',
      passwords,
      config
    );

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({
      type: NEW_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/password/forgot', email, config);

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle get all user with pagination
export const getUsersPagination =
  (
    resPerPage = 4,
    currentPage = 1,
    sortBy = 'createdDate',
    orderBy = 'desc',
    keyword = ''
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_USER_PAGINATION_REQUEST });

      const { data } = await axios.get(
        `/api/v1/admin/users/${resPerPage}?sortBy=${sortBy}&orderBy=${orderBy}&page=${currentPage}&keyword=${keyword}`
      );

      dispatch({
        type: ALL_USER_PAGINATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_USER_PAGINATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action handle get all user with pagination
export const getUsers =
  (sortBy = 'createdDate', orderBy = 'desc') =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_USER_REQUEST });

      const { data } = await axios.get(
        `/api/v1/admin/users?sortBy=${sortBy}&orderBy=${orderBy}`
      );

      dispatch({
        type: ALL_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action handle get single user details
export const getUserDetials = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/user/${id}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
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
