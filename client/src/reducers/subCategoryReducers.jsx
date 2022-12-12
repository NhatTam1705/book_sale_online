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
  DELETE_SUB_CATEGORY_RESET,
  DELETE_SUB_CATEGORY_SUCCESS,
  NEW_SUB_CATEGORY_FAIL,
  NEW_SUB_CATEGORY_REQUEST,
  NEW_SUB_CATEGORY_RESET,
  NEW_SUB_CATEGORY_SUCCESS,
  UPDATE_SUB_CATEGORY_FAIL,
  UPDATE_SUB_CATEGORY_REQUEST,
  UPDATE_SUB_CATEGORY_RESET,
  UPDATE_SUB_CATEGORY_SUCCESS,
} from '../constants/subCategoryConstants';

export const subCategoriesReducer = (state = { subCategories: [] }, action) => {
  switch (action.type) {
    case ALL_SUB_CATEGORIES_REQUEST:
    case ALL_SUB_CATEGORIES_PAGINATION_REQUEST:
      return {
        loading: true,
        subCategories: [],
      };

    case ALL_SUB_CATEGORIES_SUCCESS:
    case ALL_SUB_CATEGORIES_PAGINATION_SUCCESS:
      return {
        loading: false,
        subCategories: action.payload.subCategories,
        subCategoriesCount: action.payload.subCategoriesCount,
        filteredSubCategoriesCount: action.payload.filteredSubCategoriesCount,
      };

    case ALL_SUB_CATEGORIES_FAIL:
    case ALL_SUB_CATEGORIES_PAGINATION_FAIL:
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

// Reducer handle new sub category
export const newSubCategoryReducer = (state = { subCategory: {} }, action) => {
  switch (action.type) {
    case NEW_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_SUB_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        subCategory: action.payload.subCategory,
      };

    case NEW_SUB_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_SUB_CATEGORY_RESET:
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

// Reducer handle update or delete sub category
export const subCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SUB_CATEGORY_REQUEST:
    case UPDATE_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_SUB_CATEGORY_FAIL:
    case UPDATE_SUB_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_SUB_CATEGORY_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_SUB_CATEGORY_RESET:
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
