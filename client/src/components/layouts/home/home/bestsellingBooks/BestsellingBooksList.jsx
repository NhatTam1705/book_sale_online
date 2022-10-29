import React from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';
import BestsellingBooksCard from './BestsellingBooksCard';

const BestsellingBooksList = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-10">
        <h4 className="text-4xl font-normal">Bestselling Books</h4>
        <div className="flex items-center cursor-pointer hover:text-orange-600">
          <h6 className="hidden text-lg xl:block lg:block md:block">
            View All
          </h6>
          <HiChevronDoubleRight className="w-6 h-6"></HiChevronDoubleRight>
        </div>
      </div>
      <Swiper grabCursor={'true'} spaceBetween={0} slidesPerView={'auto'}>
        <SwiperSlide className="max-w-[20%]">
          <BestsellingBooksCard></BestsellingBooksCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[20%]">
          <BestsellingBooksCard></BestsellingBooksCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[20%]">
          <BestsellingBooksCard></BestsellingBooksCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[20%]">
          <BestsellingBooksCard></BestsellingBooksCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[20%]">
          <BestsellingBooksCard></BestsellingBooksCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[20%]">
          <BestsellingBooksCard></BestsellingBooksCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[20%]">
          <BestsellingBooksCard></BestsellingBooksCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[20%]">
          <BestsellingBooksCard></BestsellingBooksCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BestsellingBooksList;
