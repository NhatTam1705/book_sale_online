import { Swiper, SwiperSlide } from 'swiper/react';
import AuthorBookCard from './AuthorBookCard';

const AuthorBookList = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-10">
        <h4 className="text-4xl font-normal">Author's Books</h4>
      </div>
      <Swiper grabCursor={'true'} spaceBetween={0} slidesPerView={'auto'}>
        <SwiperSlide className="xl:max-w-[25%] lg:max-w-[33.33%] md:max-w-[50%] sm:max-w-[50%] max-w-[100%]">
          <AuthorBookCard></AuthorBookCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[25%] lg:max-w-[33.33%] md:max-w-[50%] sm:max-w-[50%] max-w-[100%]">
          <AuthorBookCard></AuthorBookCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[25%] lg:max-w-[33.33%] md:max-w-[50%] sm:max-w-[50%] max-w-[100%]">
          <AuthorBookCard></AuthorBookCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[25%] lg:max-w-[33.33%] md:max-w-[50%] sm:max-w-[50%] max-w-[100%]">
          <AuthorBookCard></AuthorBookCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[25%] lg:max-w-[33.33%] md:max-w-[50%] sm:max-w-[50%] max-w-[100%]">
          <AuthorBookCard></AuthorBookCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[25%] lg:max-w-[33.33%] md:max-w-[50%] sm:max-w-[50%] max-w-[100%]">
          <AuthorBookCard></AuthorBookCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[25%] lg:max-w-[33.33%] md:max-w-[50%] sm:max-w-[50%] max-w-[100%]">
          <AuthorBookCard></AuthorBookCard>
        </SwiperSlide>
        <SwiperSlide className="xl:max-w-[25%] lg:max-w-[33.33%] md:max-w-[50%] sm:max-w-[50%] max-w-[100%]">
          <AuthorBookCard></AuthorBookCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AuthorBookList;
