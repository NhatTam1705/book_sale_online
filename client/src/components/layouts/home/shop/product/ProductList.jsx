import { Autocomplete, Pagination, TextField } from '@mui/material';
import PropsTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { HiOutlineViewGrid, HiOutlineViewList } from 'react-icons/hi';
import ProductCardGrid from './ProductCardGrid';
import ProductCardList from './ProductCardList';

const sorts = [
  {
    label: 'Sort by price: low to high',
    value: 'asc',
  },
  {
    label: 'Sort by price: high to low',
    value: 'desc',
  },
];

const shows = [
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

const ProductList = ({
  products,
  productsCount,
  loading,
  fallbackPagination,
  filteredProductsCount,
}) => {
  const [isList, setIsList] = useState(false);

  const [perPage, setPerPage] = useState(4);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('createdDate');
  const [order, setOrder] = useState('desc');
  const numberPage = Math.ceil(
    (filteredProductsCount || productsCount) / perPage
  );

  useEffect(() => {
    fallbackPagination(perPage, page, sort, order);
  }, [perPage, page, fallbackPagination, sort, order]);

  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-between">
        <span className="text-lg">
          {filteredProductsCount === 0 || filteredProductsCount === undefined
            ? 'No results'
            : `Show ${perPage * (page - 1) + 1} - 
          ${
            perPage * page < (filteredProductsCount || productsCount)
              ? perPage * page
              : filteredProductsCount || productsCount
          } 
          of ${filteredProductsCount || productsCount} results`}
        </span>
        <div className="flex flex-row flex-wrap gap-5">
          <Autocomplete
            options={sorts}
            onChange={(event, value) => {
              setSort('soldPrice');
              setOrder(value.value);
            }}
            sx={{ width: 270 }}
            renderInput={(params) => <TextField {...params} label="Sort" />}
          />
          <Autocomplete
            options={shows}
            onChange={(event, value) => {
              setPerPage(value.value);
              setPage(1);
            }}
            sx={{ width: 150 }}
            renderInput={(params) => <TextField {...params} label="Show" />}
          />
          <div className="flex">
            <HiOutlineViewGrid
              className={`text-4xl border border-gray-300 h-full w-14 p-2 cursor-pointer ${
                isList ? 'opacity-30' : 'opacity-100'
              }`}
              onClick={() => setIsList(false)}
            ></HiOutlineViewGrid>
            <HiOutlineViewList
              className={`text-4xl border border-gray-300 h-full w-14 p-2 cursor-pointer ${
                isList ? 'opacity-100' : 'opacity-30'
              }`}
              onClick={() => setIsList(true)}
            ></HiOutlineViewList>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 my-8">
        {products &&
          products.map((product, index) => (
            <Fragment key={product._id}>
              {isList ? (
                <div className="col-span-12">
                  <ProductCardList product={product}></ProductCardList>
                </div>
              ) : (
                <div className="col-span-12 xl:col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-6">
                  <ProductCardGrid product={product}></ProductCardGrid>
                </div>
              )}
            </Fragment>
          ))}
      </div>
      {((perPage < (filteredProductsCount || productsCount)) && filteredProductsCount !== 0 ) && (
        <div className="flex justify-center">
          <Pagination
            className=""
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            count={numberPage || 0}
            variant="outlined"
            shape="rounded"
            size="large"
          />
        </div>
      )}
    </>
  );
};

ProductList.PropsTypes = {
  products: PropsTypes.array,
  productsCount: PropsTypes.number,
  loading: PropsTypes.bool,
  fallbackPagination: PropsTypes.func,
  filteredProductsCount: PropsTypes.number,
};

const FallbackComponent = () => {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  );
};

export default withErrorBoundary(ProductList, FallbackComponent);
