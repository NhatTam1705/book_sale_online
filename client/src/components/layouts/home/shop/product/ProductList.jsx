import { Autocomplete, Pagination, TextField } from '@mui/material';
import { Fragment, useState } from 'react';
import { HiOutlineViewGrid, HiOutlineViewList } from 'react-icons/hi';
import ProductCardGrid from './ProductCardGrid';
import ProductCardList from './ProductCardList';

const sort = [
  {
    label: 'Sort by price: low to high',
    value: 'asc',
  },
  {
    label: 'Sort by price: high to low',
    value: 'desc',
  },
];

const show = [
  {
    label: 'Show 5',
    value: 5,
  },
  {
    label: 'Show 10',
    value: 5,
  },
  {
    label: 'Show 15',
    value: 15,
  },
  {
    label: 'Show 20',
    value: 20,
  },
];

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const ProductList = () => {
  const [value, setValue] = useState('');

  const [isList, setIsList] = useState(false);

  const handleChange = () => {
    console.log(value);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <span className="text-lg">Show 1 - 20 of 100 results</span>
        <div className="flex flex-row gap-5">
          <Autocomplete
            options={sort}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Sort" />}
          />
          <Autocomplete
            options={show}
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
        {array.map((item, index) => (
          <Fragment key={index}>
            {isList ? (
              <div className="col-span-12">
                <ProductCardList></ProductCardList>
              </div>
            ) : (
              <div className="col-span-3">
                <ProductCardGrid></ProductCardGrid>
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div className='flex justify-center'>
        <Pagination className='' color='primary' count={10} variant="outlined" shape="rounded"  size='large'/>
      </div>
    </>
  );
};

export default ProductList;
