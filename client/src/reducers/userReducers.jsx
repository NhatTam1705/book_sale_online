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
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from '../constants/userConstants';

// Reducer handle authentication
export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Reducer handle user
export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdatedProfile: action.payload,
      };

    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdatedPassword: action.payload,
      };

    case UPDATE_PROFILE_RESET:
      return {
        ...state,
        isUpdatedProfile: false,
      };

    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdatedPassword: false,
      };

    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        errorProfile: action.payload,
      };

    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        errorPassword: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        errorPassword: null,
        errorProfile: null,
      };

    default:
      return state;
  }
};

// Reducer handle forgot password
export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case NEW_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
    case NEW_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USER_PAGINATION_REQUEST:
    case ALL_USER_REQUEST:
      return {
        loading: true,
        users: [],
      };

    case ALL_USER_PAGINATION_SUCCESS:
    case ALL_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
        usersCount: action.payload.usersCount,
        filteredUsersCount: action.payload.filteredUsersCount,
      };

    case ALL_USER_PAGINATION_FAIL:
    case ALL_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Reducer handle get single user details
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
