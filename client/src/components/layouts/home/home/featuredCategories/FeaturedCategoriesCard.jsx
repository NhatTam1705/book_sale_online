import React from 'react';
import { HiOutlinePhotograph } from 'react-icons/hi';
import PropsTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

const FeaturedCategoriesCard = () => {
  return (
    <>
      <div className="p-9 w-full h-[194px] select-none cursor-pointer flex flex-col items-start gap-1 bg-pink-200">
        <HiOutlinePhotograph className="text-pink-500 w-14 h-14"></HiOutlinePhotograph>
        <h4 className="text-xl font-semibold">Arts & Photography</h4>
        <h6 className="text-lg">Shop Now</h6>
      </div>
    </>
  );
};

export default FeaturedCategoriesCard;
