import { HiChevronDoubleRight } from 'react-icons/hi';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import FavoriteAuthorsCard from './FavoriteAuthorsCard';

const FavoriteAuthorsList = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-10">
        <h4 className="text-4xl font-normal">Favorite Authors</h4>
        <div className="flex items-center cursor-pointer hover:text-orange-600">
          <h6 className="hidden text-lg xl:block lg:block md:block">
            View All
          </h6>
          <HiChevronDoubleRight className="w-6 h-6"></HiChevronDoubleRight>
        </div>
      </div>
      <Swiper
        slidesPerView='auto'
        spaceBetween={0}
        slidesPerGroup={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]">
          <FavoriteAuthorsCard></FavoriteAuthorsCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]">
          <FavoriteAuthorsCard></FavoriteAuthorsCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]">
          <FavoriteAuthorsCard></FavoriteAuthorsCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]">
          <FavoriteAuthorsCard></FavoriteAuthorsCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]">
          <FavoriteAuthorsCard></FavoriteAuthorsCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]">
          <FavoriteAuthorsCard></FavoriteAuthorsCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FavoriteAuthorsList;
