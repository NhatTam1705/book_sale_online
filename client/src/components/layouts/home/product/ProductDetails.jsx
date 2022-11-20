import { Rating } from '@mui/material';
import PropsTypes from 'prop-types';
import { useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import {
  HiMinus,
  HiOutlineHeart,
  HiOutlineShare,
  HiPlus,
} from 'react-icons/hi';
import { EffectCoverflow, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '../../../buttons/Button';
import Slider1 from './../../../../assets/images/Slider_1.png';

const ProductDetails = ({ product }) => {
  const {
    _id,
    name,
    ratings,
    numOfReviews,
    soldPrice,
    stock,
    author,
    discount,
  } = product;

  const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <div className="grid grid-cols-12 xl:gap-16 lg:gap-8 md:gap-y-16 sm:gap-y-8 gap-y-8">
      <div className="flex items-center col-span-12 xl:col-span-5 lg:col-span-5 md:col-span-12 sm:col-span-12">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="w-full mySwiper"
        >
          <SwiperSlide className="max-w-[55%] ">
            <img src={Slider1} alt="" className="w-full h-auto" />
          </SwiperSlide>
          <SwiperSlide className="max-w-[55%] ">
            <img className="w-full h-auto" src={Slider1} alt="" />
          </SwiperSlide>
          <SwiperSlide className="max-w-[55%] ">
            <img className="w-full h-auto" src={Slider1} alt="" />
          </SwiperSlide>
          <SwiperSlide className="max-w-[55%] ">
            <img className="w-full h-auto" src={Slider1} alt="" />
          </SwiperSlide>
          <SwiperSlide className="max-w-[55%] ">
            <img className="w-full h-auto" src={Slider1} alt="" />
          </SwiperSlide>
          <SwiperSlide className="max-w-[55%] ">
            <img className="w-full h-auto" src={Slider1} alt="" />
          </SwiperSlide>
          <SwiperSlide className="max-w-[55%] ">
            <img className="w-full h-auto" src={Slider1} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex flex-col col-span-12 gap-4 xl:col-span-7 lg:col-span-7 md:col-span-12 sm:col-span-12">
        <h3 className="text-4xl font-semibold">{name}</h3>
        <div className="flex flex-row flex-wrap gap-5 text-lg">
          <Rating name="read-only" value={ratings || 0} readOnly />
          <span>({numOfReviews})</span>
          <span className="font-semibold">By (author)</span>
          <h6 className="text-gray-500">{author && author.name}</h6>
        </div>
        <h4 className="text-3xl font-semibold">${soldPrice}</h4>
        <h6 className="text-lg">Discount</h6>
        <h6 className="text-lg">
          <strong>Status: </strong>
          <span className={`${stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stock > 0 ? 'In stock' : 'Out of stock'}
          </span>
        </h6>
        <div className="grid grid-cols-6 gap-5 xl:grid-cols-12 lg:grid-cols-6 md:grid-cols-12 sm:grid-cols-12 h-14">
          <div className="flex items-center col-span-2 p-2 space-x-2 border rounded-md boder-gray-300">
            <HiMinus
              onClick={() => setQuantity(quantity - 1)}
              className="cursor-pointer"
            ></HiMinus>
            <input
              type="number"
              name="quanity"
              id=""
              onChange={handleChangeQuantity}
              value={quantity}
              className="w-12 text-center bg-transparent"
            />
            <HiPlus
              className="cursor-pointer"
              onClick={() => setQuantity(quantity + 1)}
            ></HiPlus>
          </div>
          <Button
            disabled={stock > 0 ? false : true}
            className={`${
              stock > 0 ? '' : 'bg-gray-500 cursor-not-allowed'
            }  w-full h-full col-span-4 text-white`}
          >
            Add To Card
          </Button>
          <div className="flex items-center col-span-3 space-x-3 cursor-pointer hover:text-orange-600">
            <HiOutlineHeart className="text-2xl"></HiOutlineHeart>
            <span className="text-lg">Add to Wishlist</span>
          </div>
          <div className="flex items-center col-span-3 space-x-3 cursor-pointer hover:text-orange-600">
            <HiOutlineShare className="text-2xl"></HiOutlineShare>
            <span className="text-lg">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetails.PropsTypes = {
  product: PropsTypes.shape({
    _id: PropsTypes.string,
    name: PropsTypes.string,
    ratings: PropsTypes.number,
    numOfReviews: PropsTypes.number,
    soldPrice: PropsTypes.number,
    stock: PropsTypes.number,
    author: PropsTypes.object,
    discount: PropsTypes.object,
  }),
};

const FallbackComponent = () => {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  );
};

export default withErrorBoundary(ProductDetails, FallbackComponent);
