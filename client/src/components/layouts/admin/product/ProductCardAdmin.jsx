import { Rating } from '@mui/material';
import { useState } from 'react';
import { MdOutlineDelete, MdOutlineModeEdit } from 'react-icons/md';
import Product from '../../../../assets/images/Slider_1.png';
import Button from '../../../buttons/Button';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';

const ProductCardAdmin = ({ product, onClickDelete }) => {
  const { _id, name, soldPrice, stock, ratings } = product;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="grid w-full h-full grid-rows-5 gap-3 p-6">
      <img
        src={(product.images && product?.images[0]?.url) || Product}
        alt=""
        className="object-cover w-auto h-48 row-span-3 mx-auto"
      />
      <div className="grid grid-rows-4 row-span-2 gap-1 text-lg">
        <h6 className="row-span-2">{name}</h6>
        <div className="flex flex-row justify-between row-span-1">
          <h5 className="">
            <span className="font-bold">Price:</span> ${soldPrice}
          </h5>
          <h6 className={`${stock === 0 ? 'text-red-700' : 'text-green-700'}`}>
            {stock === 0 ? 'Out Of Stock' : 'In Stock'}
          </h6>
        </div>
        <Rating
          name=""
          className="row-span-1 "
          value={ratings}
          precision={0.5}
          readOnly
        ></Rating>
      </div>
      <div className="flex flex-row items-center justify-between row-span-1">
        <Button className="flex items-center gap-2 px-4 py-2 text-black bg-white border-2 border-green-300">
          <MdOutlineModeEdit></MdOutlineModeEdit>
          <span>Edit</span>
        </Button>
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-black bg-white border-2 border-red-300"
        >
          <MdOutlineDelete></MdOutlineDelete>
          <span>Delete</span>
        </Button>
      </div>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        handleComfirm={onClickDelete}
        message="Do you want to delete product?"
      ></ConfirmDialog>
    </div>
  );
};

export const ProductCardAdminSkeleton = () => {
  return (
    <div className="grid w-full h-full grid-rows-5 gap-3 p-6">
      <div className="h-48 object-cover w-full max-w-[80%] skeleton mx-auto row-span-3" />
      <div className="grid grid-rows-4 row-span-2 gap-1 text-lg">
        <div className="row-span-2 skeleton"></div>
        <div className="flex flex-row justify-between row-span-1">
          <div className="skeleton w-[40%]"></div>
          <div className="skeleton w-[40%]"></div>
        </div>
        <div className="row-span-1 skeleton"></div>
      </div>
      <div className="flex flex-row items-center justify-between h-10 row-span-1">
        <div className="skeleton w-[40%] h-full"></div>
        <div className="skeleton w-[50%] h-full"></div>
      </div>
    </div>
  );
};

export default ProductCardAdmin;
