import { IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import { HiOutlineHeart, HiOutlineShoppingBag, HiSwitchHorizontal } from 'react-icons/hi';
import Slider1 from '../../../../../assets/images/Slider_1.png';

const NewReleasesCard = () => {
  const [hover, setHover] = useState(false);
  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-full h-[382px] select-none cursor-pointer border border-gray-300 hover:shadow-md hover:border-black relative col-span-1"
      >
        <img className="px-14 mt-7 h-[180px]" src={Slider1} alt="Book" />
        <div
          className={`flex flex-col gap-1 absolute px-7 mb-7 pt-3 transition-all duration-500 bg-white ${
            hover ? '-translate-y-10' : 'bottom-0'
          }`}
        >
          <h6 className="text-sm text-red-600 uppercase">Paper Back</h6>
          <h5 className="text-base font-medium">
            The Last Sister (Columbia River Book)
          </h5>
          <h5 className="text-base text-gray-500">Old man dev</h5>
          <h5 className="text-lg font-medium">$29</h5>
        </div>
        <div
          className={`grid grid-cols-2 w-full transition-all duration-500 absolute bottom-0 px-7 mb-7 ${
            hover ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Tooltip className="w-10" title="ADD TO CARD" placement="right">
            <IconButton>
              <HiOutlineShoppingBag></HiOutlineShoppingBag>
            </IconButton>
          </Tooltip>
          <div className="flex flex-row items-center justify-end w-full gap-1">
            <span className="p-2 rounded-full w-9 h-9 hover:bg-red-500">
              <HiSwitchHorizontal className="w-full h-full"></HiSwitchHorizontal>
            </span>
            <span className="p-2 rounded-full w-9 h-9 hover:bg-red-500">
              <HiOutlineHeart className="w-full h-full"></HiOutlineHeart>
            </span>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default NewReleasesCard;