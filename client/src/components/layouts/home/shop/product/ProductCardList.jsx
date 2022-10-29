import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import {
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiSwitchHorizontal,
} from 'react-icons/hi';
import Slider1 from '../../../../../assets/images/Slider_1.png';

const ProductCardList = () => {
  return (
    <div className="grid grid-cols-12 border border-gray-300 hover:shadow-md hover:border-black p-8 h-[300px] space-x-8">
      <div className="col-span-2">
        <img src={Slider1} alt="" className="h-full" />
      </div>
      <div className="col-span-8 flex flex-col gap-1 justify-center">
        <h6 className="text-sm text-red-600 uppercase">Paper Back</h6>
        <h5 className="text-base font-medium">
          The Last Sister (Columbia River Book 1)
        </h5>
        <h5 className="text-base text-gray-500">Old man dev</h5>
        <h6 className="text-base">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis
          assumenda, minus cupiditate sint doloremque sed numquam, quos
          accusamus iste facilis eos quo accusantium. Ut ipsum accusantium optio
          quae excepturi eius!
        </h6>
        <h5 className="text-lg font-medium">$29</h5>
      </div>
      <div className="col-span-2 grid grid-cols-3 items-center justify-center">
        <Tooltip className="col-span-1" title="ADD TO CARD" placement="right">
          <IconButton>
            <HiOutlineShoppingBag></HiOutlineShoppingBag>
          </IconButton>
        </Tooltip>
        <span className=" col-span-1 p-2 rounded-full w-9 h-9 hover:bg-red-500">
          <HiSwitchHorizontal className="w-full h-full"></HiSwitchHorizontal>
        </span>
        <span className=" col-span-1 p-2 rounded-full w-9 h-9 hover:bg-red-500">
          <HiOutlineHeart className="w-full h-full"></HiOutlineHeart>
        </span>
      </div>
    </div>
  );
};

export default ProductCardList;
