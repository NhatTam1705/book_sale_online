import { useState } from 'react';
import { HiOutlineHeart, HiSwitchHorizontal } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Slider1 from '../../../../../assets/images/Slider_1.png';

const BestsellingBooksCard = ({ product }) => {
  const navigate = useNavigate();
  const { _id, name, format, soldPrice } = product;
  const [hover, setHover] = useState(false);
  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-full h-[430PX] select-none cursor-pointer border border-gray-300 hover:shadow-md hover:border-black relative"
        onClick={() => navigate(`/shop/product/${_id}`)}
      >
        <img className="px-16 mt-8 h-[225px]" src={Slider1} alt="Book" />
        <div
          className={`flex flex-col gap-1 w-full absolute px-8 mb-8 pt-3 transition-all duration-500 bg-white ${
            hover ? '-translate-y-12' : 'bottom-0'
          }`}
        >
          <h6 className="text-sm text-red-600 uppercase">{format}</h6>
          <h5 className="text-base font-medium">{name}</h5>
          <h5 className="text-base text-gray-500">Old man dev</h5>
          <h5 className="text-lg font-medium">${soldPrice}</h5>
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

export const BestsellingBooksCardSkeleton = () => {
  return (
    <>
      <div className="w-full h-[430PX] select-none cursor-pointer border border-gray-300 hover:shadow-md hover:border-black">
        <div className="skeleton mx-16 mt-8 h-[200px]" />
        <div className={`flex flex-col gap-2 w-full px-8 mb-8 pt-10 bg-white`}>
          <div className="h-6 w-[50%] skeleton"></div>
          <div className="h-10 skeleton"></div>
          <div className="h-5 skeleton"></div>
          <div className="h-5 w-[25%] skeleton"></div>
        </div>
      </div>
    </>
  );
};

export default BestsellingBooksCard;
