import React from 'react'
import { HiChevronDoubleRight } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';
import RelatedProductsCard from './RelatedProductsCard';

const RelatedProductsList = () => {
  return (
    <div className='px-12'>
      <div className="flex flex-row items-center justify-between mb-10">
        <h4 className="text-4xl font-normal">Related Product</h4>
        <div className="flex items-center cursor-pointer hover:text-orange-600">
          <h6 className="hidden text-lg xl:block lg:block md:block">
            View All
          </h6>
          <HiChevronDoubleRight className="w-6 h-6"></HiChevronDoubleRight>
        </div>
      </div>
      <Swiper grabCursor={'true'} spaceBetween={0} slidesPerView={'auto'}>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%] max-w-[100%]">
          <RelatedProductsCard></RelatedProductsCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%] max-w-[100%]">
          <RelatedProductsCard></RelatedProductsCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%] max-w-[100%]">
          <RelatedProductsCard></RelatedProductsCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%] max-w-[100%]">
          <RelatedProductsCard></RelatedProductsCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%] max-w-[100%]">
          <RelatedProductsCard></RelatedProductsCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%] max-w-[100%]">
          <RelatedProductsCard></RelatedProductsCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%] max-w-[100%]">
          <RelatedProductsCard></RelatedProductsCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%] max-w-[100%]">
          <RelatedProductsCard></RelatedProductsCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default RelatedProductsList