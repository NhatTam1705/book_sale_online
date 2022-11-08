import React from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';
import BestsellingBooksCard from './BestsellingBooksCard';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../../../actions/productActions';
import { useEffect } from 'react';
import ProductPage from '../../../../../pages/home/ProductPage';

const BestsellingBooksList = () => {
  const disptach = useDispatch();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    disptach(getProducts());
  }, [disptach]);

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
        {products &&
          products.map((product) => (
            <SwiperSlide key={product._id} className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]">
              <BestsellingBooksCard></BestsellingBooksCard>
            </SwiperSlide>
          ))}
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]">
          <BestsellingBooksCard></BestsellingBooksCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]">
          <BestsellingBooksCard></BestsellingBooksCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]">
          <BestsellingBooksCard></BestsellingBooksCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]">
          <BestsellingBooksCard></BestsellingBooksCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]">
          <BestsellingBooksCard></BestsellingBooksCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]">
          <BestsellingBooksCard></BestsellingBooksCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]">
          <BestsellingBooksCard></BestsellingBooksCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BestsellingBooksList;
