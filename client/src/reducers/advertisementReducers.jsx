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
  DELETE_ADVERTISEMENT_RESET,
  DELETE_ADVERTISEMENT_SUCCESS,
  NEW_ADVERTISEMENT_FAIL,
  NEW_ADVERTISEMENT_REQUEST,
  NEW_ADVERTISEMENT_RESET,
  NEW_ADVERTISEMENT_SUCCESS,
  UPDATE_ADVERTISEMENT_FAIL,
  UPDATE_ADVERTISEMENT_REQUEST,
  UPDATE_ADVERTISEMENT_RESET,
  UPDATE_ADVERTISEMENT_SUCCESS,
} from '../constants/advertisementConstants';

// Reducer handle get all advertisement
export const advertisementsReducer = (
  state = { advertisements: [] },
  action
) => {
  switch (action.type) {
    case ALL_ADVERTISEMENTS_REQUEST:
    case ALL_ADVERTISEMENTS_PAGINATION_REQUEST:
      return {
        loading: true,
        advertisements: [],
      };

    case ALL_ADVERTISEMENTS_SUCCESS:
    case ALL_ADVERTISEMENTS_PAGINATION_SUCCESS:
      return {
        loading: false,
        advertisements: action.payload.advertisements,
        advertisementsCount: action.payload.advertisementsCount,
        filteredAdvertisementsCount: action.payload.filteredAdvertisementsCount,
      };

    case ALL_ADVERTISEMENTS_FAIL:
    case ALL_ADVERTISEMENTS_PAGINATION_FAIL:
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

// Reducer handle new advertisement
export const newAdvertisementReducer = (
  state = { advertisement: {} },
  action
) => {
  switch (action.type) {
    case NEW_ADVERTISEMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_ADVERTISEMENT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        advertisement: action.payload.advertisement,
      };

    case NEW_ADVERTISEMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_ADVERTISEMENT_RESET:
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

// Reducer handle update or delete advertisement
export const advertisementReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ADVERTISEMENT_REQUEST:
    case UPDATE_ADVERTISEMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_ADVERTISEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ADVERTISEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ADVERTISEMENT_FAIL:
    case UPDATE_ADVERTISEMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_ADVERTISEMENT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_ADVERTISEMENT_RESET:
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
