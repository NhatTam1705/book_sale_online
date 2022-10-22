import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import FeaturedCategoriesCard from './FeaturedCategoriesCard';
import { HiChevronDoubleRight } from 'react-icons/hi';

const FeaturedCategoriesList = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-10">
        <h4 className="text-4xl font-normal">Featured Categories</h4>
        <div className="flex items-center cursor-pointer hover:text-orange-600">
          <h6 className="hidden text-lg xl:block lg:block md:block">
            All Categories
          </h6>
          <HiChevronDoubleRight className="w-6 h-6"></HiChevronDoubleRight>
        </div>
      </div>
      <Swiper grabCursor={'true'} spaceBetween={30} slidesPerView={'auto'}>
        <SwiperSlide className="max-w-[18%]">
          <FeaturedCategoriesCard></FeaturedCategoriesCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[18%]">
          <FeaturedCategoriesCard></FeaturedCategoriesCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[18%]">
          <FeaturedCategoriesCard></FeaturedCategoriesCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[18%]">
          <FeaturedCategoriesCard></FeaturedCategoriesCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[18%]">
          <FeaturedCategoriesCard></FeaturedCategoriesCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[18%]">
          <FeaturedCategoriesCard></FeaturedCategoriesCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[18%]">
          <FeaturedCategoriesCard></FeaturedCategoriesCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[18%]">
          <FeaturedCategoriesCard></FeaturedCategoriesCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[18%]">
          <FeaturedCategoriesCard></FeaturedCategoriesCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FeaturedCategoriesList;
