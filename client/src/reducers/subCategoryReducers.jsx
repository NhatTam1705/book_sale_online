import {
  ALL_SUB_CATEGORIES_FAIL,
  ALL_SUB_CATEGORIES_REQUEST,
  ALL_SUB_CATEGORIES_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/subCategoryConstants';

export const subCategoriesReducer = (state = { subCategories: [] }, action) => {
  switch (action.type) {
    case ALL_SUB_CATEGORIES_REQUEST:
      return {
        loading: true,
        subCategories: [],
      };

    case ALL_SUB_CATEGORIES_SUCCESS:
      return {
        loading: false,
        subCategories: action.payload.subCategories,
        subCategoriesCount: action.payload.subCategoriesCount,
      };

    case ALL_SUB_CATEGORIES_FAIL:
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
