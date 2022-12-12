import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  clearErrors,
  getProductsPagination,
} from '../../actions/productActions';
import ProductList from '../../components/layouts/home/shop/product/ProductList';
import SideBarAuthor from '../../components/layouts/home/shop/sideBar/SideBarAuthor';
import SideBarByRating from '../../components/layouts/home/shop/sideBar/SideBarByRating';
import SideBarCategory from '../../components/layouts/home/shop/sideBar/SideBarCategory';
import SideBarFilterByPrice from '../../components/layouts/home/shop/sideBar/SideBarFilterByPrice';
import SideBarFormat from '../../components/layouts/home/shop/sideBar/SideBarFormat';
import SideBarLanguage from '../../components/layouts/home/shop/sideBar/SideBarLanguage';

const ShopPage = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { loading, products, error, productsCount, filteredProductsCount } =
    useSelector((state) => state.productsPagination);

  const [resPerPage, setResPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdDate');
  const [orderBy, setOrderBy] = useState('desc');
  const [price, setPrice] = useState([0, 100]);
  const [format, setFormat] = useState('');
  const [language, setLanguage] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState([-1, 5]);
  const [category, setCategory] = useState('');

  const fallbackCategory = useCallback((cat) => {
    setCategory(cat);
  }, []);

  const fallbackRating = useCallback((rat) => {
    setRating(rat);
  }, []);

  const fallbackAuthor = useCallback((aut) => {
    setAuthor(aut);
  }, []);

  const fallbackPrice = useCallback((pri) => {
    setPrice(pri);
  }, []);

  const fallbackLanguage = useCallback((lan) => {
    setLanguage(lan);
  }, []);

  const fallbackFormat = useCallback((type) => {
    setFormat(type);
  }, []);

  const fallbackPagination = useCallback((perPage, page, sort, order) => {
    setResPerPage(perPage);
    setCurrentPage(page);
    setSortBy(sort);
    setOrderBy(order);
  }, []);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
    dispatch(
      getProductsPagination(
        resPerPage,
        currentPage,
        sortBy,
        orderBy,
        keyword,
        price,
        format,
        language,
        author,
        rating,
        category
      )
    );
  }, [
    dispatch,
    enqueueSnackbar,
    error,
    resPerPage,
    currentPage,
    sortBy,
    orderBy,
    keyword,
    price,
    format,
    language,
    author,
    rating,
    category,
  ]);

  return (
    <>
      <div className="grid grid-cols-2 gap-8 px-12 py-24 xl:grid-cols-9 lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-2">
        <div className="col-span-2">
          <SideBarCategory
            fallbackCategory={fallbackCategory}
          ></SideBarCategory>
          <SideBarAuthor fallbackAuthor={fallbackAuthor}></SideBarAuthor>
          <SideBarLanguage
            fallbackLanguage={fallbackLanguage}
          ></SideBarLanguage>
          <SideBarFormat fallbackFormat={fallbackFormat}></SideBarFormat>
          <SideBarFilterByPrice
            fallbackPrice={fallbackPrice}
          ></SideBarFilterByPrice>
          <SideBarByRating fallbackRating={fallbackRating}></SideBarByRating>
        </div>
        <div className="col-span-2 xl:col-span-7 lg:col-span-5 md:col-span-3 sm:col-span-2">
          <ProductList
            products={products}
            loading={loading}
            productsCount={productsCount}
            filteredProductsCount={filteredProductsCount}
            fallbackPagination={fallbackPagination}
          ></ProductList>
        </div>
      </div>
    </>
  );
};

const FallbackComponent = () => {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  );
};

export default withErrorBoundary(ShopPage, FallbackComponent);
