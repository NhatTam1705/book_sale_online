import { HiChevronDoubleRight } from 'react-icons/hi';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import DealsOfTheWeekCard from './DealsOfTheWeekCard';

const DealsOfTheWeekList = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-between mb-10">
        <h4 className="text-4xl font-normal">Deals Of The Week</h4>
        <div className="flex items-center cursor-pointer hover:text-orange-600">
          <h6 className="hidden text-lg xl:block lg:block md:block">
            View All
          </h6>
          <HiChevronDoubleRight className="w-6 h-6"></HiChevronDoubleRight>
        </div>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={0}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="max-w-[50%]">
          <DealsOfTheWeekCard></DealsOfTheWeekCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[50%]">
          <DealsOfTheWeekCard></DealsOfTheWeekCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[50%]">
          <DealsOfTheWeekCard></DealsOfTheWeekCard>
        </SwiperSlide>
        <SwiperSlide className="max-w-[50%]">
          <DealsOfTheWeekCard></DealsOfTheWeekCard>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default DealsOfTheWeekList;
