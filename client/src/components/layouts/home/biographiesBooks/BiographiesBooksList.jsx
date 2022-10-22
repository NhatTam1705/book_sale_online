import React from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';
import BiographiesBooksCard from './BiographiesBooksCard';

const BiographiesBooksList = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-10">
        <h4 className="text-4xl font-normal">Biographies Books</h4>
        <div className="flex items-center cursor-pointer hover:text-orange-600">
          <h6 className="hidden text-lg xl:block lg:block md:block">
            View All
          </h6>
          <HiChevronDoubleRight className="w-6 h-6"></HiChevronDoubleRight>
        </div>
      </div>
      <Swiper grabCursor={'true'} spaceBetween={0} slidesPerView={'auto'}>
        <SwiperSlide className="max-w-[33.32%]">
          <BiographiesBooksCard></BiographiesBooksCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[33.32%]">
          <BiographiesBooksCard></BiographiesBooksCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[33.32%]">
          <BiographiesBooksCard></BiographiesBooksCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[33.32%]">
          <BiographiesBooksCard></BiographiesBooksCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[33.32%]">
          <BiographiesBooksCard></BiographiesBooksCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[33.32%]">
          <BiographiesBooksCard></BiographiesBooksCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[33.32%]">
          <BiographiesBooksCard></BiographiesBooksCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[33.32%]">
          <BiographiesBooksCard></BiographiesBooksCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BiographiesBooksList;
