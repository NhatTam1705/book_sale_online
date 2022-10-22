import { TabContext, TabList } from '@mui/lab';
import { Rating, Tab } from '@mui/material';
import React, { useState } from 'react';
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
import Button from '../../buttons/Button';
import Slider1 from './../../../assets/images/Slider_1.png';

const ProductDetails = () => {
  const [value, setValue] = useState('');

  const [quantity, setQuantity] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="grid grid-cols-12 gap-16">
      <div className="col-span-5 flex items-center">
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
          className="mySwiper w-full"
        >
          <SwiperSlide className="max-w-[55%]">
            <img src={Slider1} alt="" className="w-full h-auto" />
          </SwiperSlide>
          <SwiperSlide className="max-w-[55%]">
            <img className="w-full h-auto" src={Slider1} alt="" />
          </SwiperSlide>
          <SwiperSlide className="max-w-[55%]">
            <img className="w-full h-auto" src={Slider1} alt="" />
          </SwiperSlide>
          <SwiperSlide className="max-w-[55%]">
            <img className="w-full h-auto" src={Slider1} alt="" />
          </SwiperSlide>
          <SwiperSlide className="max-w-[55%]">
            <img className="w-full h-auto" src={Slider1} alt="" />
          </SwiperSlide>
          <SwiperSlide className="max-w-[55%]">
            <img className="w-full h-auto" src={Slider1} alt="" />
          </SwiperSlide>
          <SwiperSlide className="max-w-[55%]">
            <img className="w-full h-auto" src={Slider1} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="col-span-7 flex flex-col gap-4">
        <h3 className="text-4xl font-semibold">Where the Crawdads Sing</h3>
        <div className="flex flex-row- gap-5 text-lg">
          <Rating name="read-only" value={4} readOnly />
          <span>(3,714)</span>
          <span className="font-semibold">By (author)</span>
          <h6 className="text-gray-500">Old man dev</h6>
        </div>
        <h4 className="text-3xl font-semibold">$1.999</h4>
        <div className="text-lg">
          <span className="font-semibold text-xl">Book format: </span>
          <span>{value === '' ? 'Choose an option' : value}</span>
        </div>
        <div>
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab className="tab-format" value="Hardcover" label="Hardcover" />
              <Tab className="tab-format" value="Paperback" label="Paperback" />
            </TabList>
          </TabContext>
        </div>
        <h6 className="text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
          expedita repudiandae aspernatur dolorum commodi molestias reiciendis
          nihil, animi inventore, in sequi. Corrupti, id! Voluptas, praesentium
          aliquid? Accusantium saepe exercitationem id?
        </h6>
        <div className="grid grid-cols-12 gap-5 h-14">
          <div className="col-span-2 flex items-center space-x-2 p-2 border boder-gray-300 rounded-md">
            <HiMinus
              onClick={() => setQuantity(quantity - 1)}
              className="cursor-pointer"
            ></HiMinus>
            <input
              type="number"
              name=""
              id=""
              value={quantity}
              className="w-12 bg-transparent text-center"
            />
            <HiPlus onClick={() => setQuantity(quantity + 1)}></HiPlus>
          </div>
          <Button className="text-white w-full col-span-4 h-full">Add To Card</Button>
          <div className="col-span-3 flex items-center hover:text-orange-600 space-x-3 cursor-pointer">
            <HiOutlineHeart className="text-2xl"></HiOutlineHeart>
            <span className="text-lg">Add to Wishlist</span>
          </div>
          <div className="col-span-3 flex items-center hover:text-orange-600 space-x-3 cursor-pointer">
            <HiOutlineShare className="text-2xl"></HiOutlineShare>
            <span className="text-lg">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
