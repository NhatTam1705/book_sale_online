import axios from 'axios';
import { useEffect } from 'react';

import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_PAGINATION_FAIL,
  ALL_PRODUCTS_PAGINATION_REQUEST,
  ALL_PRODUCTS_PAGINATION_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from '../constansts/productConstansts';

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
    author
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_PAGINATION_REQUEST });

      let url = `/api/v1/products/${resPerPage}?sortBy=${sortBy}&orderBy=${orderBy}&page=${currentPage}&keyword=${keyword}&soldPrice[gte]=${
        price[0] * 10
      }&soldPrice[lte]=${price[1] * 10}`;

      if (format) {
        url = url + `&format=${format}`;
      }

      if (language) {
        url = url + `&language=${language}`;
      }

      if (author) {
        url = url + `&author=${author}`;
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

// Action handle clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
