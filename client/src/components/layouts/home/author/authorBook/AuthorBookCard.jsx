import { Rating } from '@mui/material';
import { useState } from 'react';
import { HiOutlineHeart, HiSwitchHorizontal } from 'react-icons/hi';
import Slider1 from '../../../../../assets/images/Slider_1.png';

const AuthorBookCard = () => {
  const [hover, setHover] = useState(false);
  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-full h-[500PX] select-none cursor-pointer border border-gray-300 hover:shadow-md hover:border-black relative"
      >
        <img className="px-16 mt-8 h-[250px]" src={Slider1} alt="Book" />
        <div
          className={`flex w-full flex-col gap-1 absolute px-8 mb-8 pt-3 transition-all duration-500 bg-white ${
            hover ? '-translate-y-10' : 'bottom-0'
          }`}
        >
          <h6 className="text-sm text-red-600 uppercase">Paper Back</h6>
          <h5 className="text-lg font-medium">
            The Last Sister (Columbia River Book 1)
          </h5>
          <h5 className="text-base text-gray-500">Old man dev</h5>
          <h5 className="text-lg font-medium">$29</h5>
          <div className="flex items-center gap-2">
            <Rating name="size-small" defaultValue={2} readOnly size="small" />
            <span>(1,123)</span>
          </div>
        </div>
        <div
          className={`grid grid-cols-2 absolute transition-all duration-500 bottom-0 px-8 mb-8 w-full ${
            hover ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button className="font-semibold uppercase transition-all duration-300 border-b-2 hover:border-gray-900">
            Add to card
          </button>
          <div className="flex flex-row items-center justify-end gap-1">
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

export default AuthorBookCard;
