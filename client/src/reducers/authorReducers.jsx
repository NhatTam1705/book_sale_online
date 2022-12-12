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
  DELETE_AUTHOR_RESET,
  DELETE_AUTHOR_SUCCESS,
  NEW_AUTHOR_FAIL,
  NEW_AUTHOR_REQUEST,
  NEW_AUTHOR_RESET,
  NEW_AUTHOR_SUCCESS,
  UPDATE_AUTHOR_FAIL,
  UPDATE_AUTHOR_REQUEST,
  UPDATE_AUTHOR_RESET,
  UPDATE_AUTHOR_SUCCESS,
} from '../constants/authorConstants';

// Reducer handle get all author
export const authorsReducer = (state = { authors: [] }, action) => {
  switch (action.type) {
    case ALL_AUTHOR_REQUEST:
    case ALL_AUTHOR_PAGINATION_REQUEST:
      return {
        loading: true,
        authors: [],
      };

    case ALL_AUTHOR_SUCCESS:
    case ALL_AUTHOR_PAGINATION_SUCCESS:
      return {
        loading: false,
        authors: action.payload.authors,
        authorsCount: action.payload.authorsCount,
        filteredAuthorsCount: action.payload.filteredAuthorsCount,
      };

    case ALL_AUTHOR_FAIL:
    case ALL_AUTHOR_PAGINATION_FAIL:
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

// Reducer handle get single author details
export const authorDetailsReducer = (state = { author: {} }, action) => {
  switch (action.type) {
    case AUTHOR_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case AUTHOR_DETAILS_SUCCESS:
      return {
        loading: false,
        author: action.payload,
      };

    case AUTHOR_DETAILS_FAIL:
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

// Reducer handle new author
export const newAuthorReducer = (state = { author: {} }, action) => {
  switch (action.type) {
    case NEW_AUTHOR_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_AUTHOR_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        author: action.payload.author,
      };

    case NEW_AUTHOR_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_AUTHOR_RESET:
      return {
        ...state,
        success: false,
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

// Reducer handle update or delete author
export const authorReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_AUTHOR_REQUEST:
    case UPDATE_AUTHOR_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_AUTHOR_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_AUTHOR_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_AUTHOR_FAIL:
    case UPDATE_AUTHOR_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_AUTHOR_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_AUTHOR_RESET:
      return {
        ...state,
        isUpdated: false,
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
