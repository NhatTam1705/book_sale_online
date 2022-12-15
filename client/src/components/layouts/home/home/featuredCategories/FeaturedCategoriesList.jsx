import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  clearErrors,
  getSubCategories,
} from '../../../../../actions/subCategoryActions';
import FeaturedCategoriesCard, {
  FeaturedCategoriesCardSkeleton,
} from './FeaturedCategoriesCard';

const themeCategoryColors = [
  { bg: 'bg-red-200', text: 'text-red-500' },
  { bg: 'bg-blue-200', text: 'text-blue-500' },
  { bg: 'bg-pink-200', text: 'text-pink-500' },
  { bg: 'bg-orange-200', text: 'text-orange-500' },
  { bg: 'bg-green-200', text: 'text-green-500' },
  { bg: 'bg-purple-200', text: 'text-purple-500' },
  { bg: 'bg-yellow-200', text: 'text-yellow-500' },
  { bg: 'bg-amber-200', text: 'text-amber-500' },
  { bg: 'bg-lime-200', text: 'text-lime-500' },
  { bg: 'bg-emerald-200', text: 'text-emerald-500' },
  { bg: 'bg-teal-200', text: 'text-teal-500' },
  { bg: 'bg-cyan-200', text: 'text-cyan-500' },
  { bg: 'bg-sky-200', text: 'text-sky-500' },
  { bg: 'bg-indigo-200', text: 'text-indigo-500' },
  { bg: 'bg-violet-200', text: 'text-violet-500' },
  { bg: 'bg-fuchsia-200', text: 'text-fuchsia-500' },
  { bg: 'bg-rose-200', text: 'text-rose-500' },
];

const FeaturedCategoriesList = ({ loading, subCategories }) => {
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
      {loading ? (
        <>
          <Swiper
            breakpoints={{
              576: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
            grabCursor={'true'}
            spaceBetween={30}
            slidesPerView={'auto'}
          >
            {Array(8)
              .fill(0)
              .map((item, index) => (
                <SwiperSlide key={index}>
                  <FeaturedCategoriesCardSkeleton></FeaturedCategoriesCardSkeleton>
                </SwiperSlide>
              ))}
          </Swiper>
        </>
      ) : (
        <>
          <Swiper
            breakpoints={{
              576: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
            grabCursor={'true'}
            spaceBetween={30}
            slidesPerView={'auto'}
          >
            {subCategories &&
              subCategories
                .sort((prev, next) => {
                  return prev.createdDate < next.createdDate ? 1 : -1;
                })
                .map((subCategory) => {
                  let index = Math.floor(
                    Math.random() * themeCategoryColors.length
                  );
                  return (
                    <SwiperSlide key={subCategory._id}>
                      <FeaturedCategoriesCard
                        subCategory={subCategory}
                        bg={themeCategoryColors[index].bg}
                        text={themeCategoryColors[index].text}
                      ></FeaturedCategoriesCard>
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </>
      )}
    </div>
  );
};

const FallbackComponent = () => {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  );
};

export default withErrorBoundary(FeaturedCategoriesList, {
  FallbackComponent,
});
