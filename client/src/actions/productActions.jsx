import axios from 'axios';

import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_PAGINATION_ADMIN_FAIL,
  ALL_PRODUCTS_PAGINATION_ADMIN_REQUEST,
  ALL_PRODUCTS_PAGINATION_ADMIN_SUCCESS,
  ALL_PRODUCTS_PAGINATION_FAIL,
  ALL_PRODUCTS_PAGINATION_REQUEST,
  ALL_PRODUCTS_PAGINATION_SUCCESS,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants';

// Action handle get all product
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    const { data } = await axios.get('/api/v1/products');

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle get all product with pagination
export const getProductsPagination =
  (
    resPerPage = 4,
    currentPage = 1,
    sortBy = 'createdDate',
    orderBy = 'desc',
    keyword = '',
    price = [0, 100],
    format,
    language,
    author,
    rating = [-1, 5],
    category
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_PAGINATION_REQUEST });

      let url = `/api/v1/products/${resPerPage}?sortBy=${sortBy}&orderBy=${orderBy}&page=${currentPage}&keyword=${keyword}&soldPrice[gte]=${
        price[0] * 10
      }&soldPrice[lte]=${price[1] * 10}&ratings[gt]=${rating[0]}&ratings[lte]=${
        rating[1]
      }`;

      if (format) {
        url = url + `&format=${format}`;
      }

      if (language) {
        url = url + `&language=${language}`;
      }

      if (author) {
        url = url + `&author=${author}`;
      }

      if (category) {
        url = url + `&category=${category}`;
      }

      const { data } = await axios.get(url);

      dispatch({
        type: ALL_PRODUCTS_PAGINATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_PAGINATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action handle get all product with pagination admin
export const getProductsPaginationAdmin =
  (
    resPerPage = 4,
    currentPage = 1,
    orderBy = 'desc',
    keyword = '',
    subCategory
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_PAGINATION_ADMIN_REQUEST });

      let url = `/api/v1/products/${resPerPage}?sortBy=createdDate&orderBy=${orderBy}&page=${currentPage}`;

      if (keyword) {
        url = url + `&keyword=${keyword}`;
      }

      if (subCategory) {
        url = url + `&category=${subCategory}`;
      }

      const { data } = await axios.get(url);

      dispatch({
        type: ALL_PRODUCTS_PAGINATION_ADMIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_PAGINATION_ADMIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Action handle get single product details
export const getProductDetials = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action handle new review for product
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put('/api/v1/review', reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({ type: NEW_REVIEW_FAIL, payload: error.response.data.message });
  }
};

// Action handle new product
export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_PRODUCT_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post(
      '/api/v1/admin/product/new',
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: NEW_PRODUCT_FAIL, payload: error.response.data.message });
  }
};

// Action handle delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
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
