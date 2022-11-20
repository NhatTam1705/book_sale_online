import {
  ALL_AUTHOR_FAIL,
  ALL_AUTHOR_REQUEST,
  ALL_AUTHOR_SUCCESS,
  AUTHOR_DETAILS_FAIL,
  AUTHOR_DETAILS_REQUEST,
  AUTHOR_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/authorConstants';

// Reducer handle get all author
export const authorsReducer = (state = { authors: [] }, action) => {
  switch (action.type) {
    case ALL_AUTHOR_REQUEST:
      return {
        loading: true,
        authors: [],
      };

    case ALL_AUTHOR_SUCCESS:
      return {
        loading: false,
        authors: action.payload.authors,
        authorsCount: action.payload.authorsCount,
      };

    case ALL_AUTHOR_FAIL:
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
