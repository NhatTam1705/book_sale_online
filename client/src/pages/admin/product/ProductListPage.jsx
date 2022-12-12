import { Autocomplete, Pagination, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { MdOutlineImportExport } from 'react-icons/md';
import { TiExportOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  clearErrors as clearErrorsCategory,
  getCategories,
} from '../../../actions/categoryActions';
import {
  clearErrors,
  deleteProduct,
  getProductsPaginationAdmin,
} from '../../../actions/productActions';
import {
  clearErrors as clearErrorsSubCategory,
  getSubCategories,
} from '../../../actions/subCategoryActions';
import Button from '../../../components/buttons/Button';
import ProductCardAdmin, {
  ProductCardAdminSkeleton,
} from '../../../components/layouts/admin/product/ProductCardAdmin';
import { DELETE_PRODUCT_RESET } from '../../../constants/productConstants';
import useDebounce from '../../../hooks/useDebounce';

const show = [
  {
    label: 'Show 4',
    value: 4,
  },
  {
    label: 'Show 8',
    value: 8,
  },
  {
    label: 'Show 12',
    value: 12,
  },
  {
    label: 'Show 16',
    value: 16,
  },
];

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { loading, products, error, productsCount, filteredProductsCount } =
    useSelector((state) => state.productsPaginationAdmin);
  const { error: errorCategory, categories } = useSelector(
    (state) => state.categories
  );
  const { error: errorSubCategory, subCategories } = useSelector(
    (state) => state.subCategories
  );
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [keyword, setKeyword] = useState('');
  const keywordDebounce = useDebounce(keyword, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [resPerPage, setResPerPage] = useState(4);
  const [orderBy, setOrderBy] = useState('desc');
  const numberPage = Math.ceil(
    (filteredProductsCount || productsCount) / resPerPage
  );
  const { error: errorDelete, isDeleted } = useSelector(
    (state) => state.product
  );
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (errorCategory) {
      enqueueSnackbar(errorCategory, { variant: 'error' });
      dispatch(clearErrorsCategory());
    }
    dispatch(getCategories());

    if (errorSubCategory) {
      enqueueSnackbar(errorSubCategory, { variant: 'error' });
      dispatch(clearErrorsSubCategory());
    }
    dispatch(getSubCategories('', category));

    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (errorDelete) {
      enqueueSnackbar(errorDelete, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      enqueueSnackbar('Product is deleted', { variant: 'success' });
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(
      getProductsPaginationAdmin(
        resPerPage,
        currentPage,
        orderBy,
        keywordDebounce,
        subCategory
      )
    );
  }, [
    category,
    currentPage,
    dispatch,
    enqueueSnackbar,
    error,
    errorCategory,
    errorSubCategory,
    keywordDebounce,
    orderBy,
    resPerPage,
    subCategory,
    errorDelete,
    isDeleted,
  ]);

  const handleSort = () => {
    setOrderBy(orderBy === 'desc' ? 'asc' : 'desc');
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-6">
        <h5 className="text-3xl font-medium">Products</h5>
        <div className="flex gap-3">
          <Button className="flex items-center gap-3 text-lg text-black bg-white border border-gray-300 ">
            <TiExportOutline className="w-6 h-6 text-gray-500"></TiExportOutline>
            <span>Export</span>
          </Button>
          <Button
            onClick={() => navigate('/admin/product')}
            className="flex items-center gap-3 text-lg text-white bg-black "
          >
            <HiOutlinePlus className="w-6 h-6 text-gray-500"></HiOutlinePlus>
            <span>Create new</span>
          </Button>
        </div>
      </div>
      <div className="text-lg rounded-lg bg-gray-50">
        <div className="flex flex-row justify-between p-6">
          <input
            type="text"
            className="p-3 border border-gray-300 rounded-md indent-2 w-[300px]"
            placeholder="Search"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <Autocomplete
              options={categories || []}
              getOptionLabel={(option) => option.name || ''}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              onChange={(event, value) => {
                setCategory(String(value ? value._id : ''));
              }}
              className="bg-white"
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />
            <Autocomplete
              options={subCategories || []}
              getOptionLabel={(option) => option.name || ''}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              onChange={(event, value) => {
                setCurrentPage(1);
                setSubCategory(String(value ? value._id : ''));
              }}
              className="bg-white"
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField {...params} label="Sub Category" />
              )}
            />
            <Autocomplete
              options={show}
              className="bg-white"
              sx={{ width: 150 }}
              onChange={(event, value) => setResPerPage(value.value)}
              renderInput={(params) => <TextField {...params} label="Show" />}
            />
            <Button
              onClick={handleSort}
              className="flex items-center h-full gap-3 bg-white border border-gray-300"
            >
              <span>Last added</span>
              <MdOutlineImportExport className="w-6 h-6 text-gray-500"></MdOutlineImportExport>
            </Button>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-12 gap-4 p-6">
          {loading ? (
            <>
              {Array(resPerPage)
                .fill(0)
                .map((item, index) => (
                  <div
                    className="col-span-3 border border-gray-300 rounded-lg shadow-md"
                    key={index}
                  >
                    <ProductCardAdminSkeleton></ProductCardAdminSkeleton>
                  </div>
                ))}
            </>
          ) : (
            <>
              {products &&
                products.map((product, index) => (
                  <div
                    className="col-span-3 border border-gray-300 rounded-lg shadow-md"
                    key={product._id}
                  >
                    <ProductCardAdmin
                      onClickDelete={() => handleDeleteProduct(product._id)}
                      product={product}
                    ></ProductCardAdmin>
                  </div>
                ))}
            </>
          )}
        </div>
        <div className="flex justify-between pb-6 px-6">
          <div>
            {resPerPage < (filteredProductsCount || productsCount) &&
              filteredProductsCount !== 0 && (
                <Pagination
                  className=""
                  page={currentPage}
                  onChange={(event, value) => setCurrentPage(value)}
                  color="primary"
                  count={numberPage || 0}
                  variant="outlined"
                  shape="rounded"
                  size="large"
                />
              )}
          </div>
          <div className="flex items-center">
            {products.length === 0 ? (
              'No result'
            ) : (
              <>{`Show ${resPerPage * (currentPage - 1) + 1} - ${
                resPerPage * currentPage > filteredProductsCount
                  ? filteredProductsCount
                  : resPerPage * currentPage
              } of ${filteredProductsCount} result`}</>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListPage;
