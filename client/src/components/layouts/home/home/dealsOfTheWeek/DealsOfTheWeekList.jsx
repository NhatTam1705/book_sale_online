import { Fragment } from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import DealsOfTheWeekCard, {
  DealsOfTheWeekCardSkeleton,
} from './DealsOfTheWeekCard';

const DealsOfTheWeekList = ({ products, loading }) => {
  let count = 0;
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row items-center justify-between mb-10">
        <h4 className="text-4xl font-normal">Deals Of The Week</h4>
        <div
          onClick={() => navigate('/shop')}
          className="flex items-center cursor-pointer hover:text-orange-600"
        >
          <h6 className="hidden text-lg xl:block lg:block md:block">
            View All
          </h6>
          <HiChevronDoubleRight className="w-6 h-6"></HiChevronDoubleRight>
        </div>
      </div>
      {loading ? (
        <>
          <Swiper
            spaceBetween={0}
            breakpoints={{
              576: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              992: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 2,
              },
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            slidesPerView={'auto'}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {Array(4)
              .fill(0)
              .map((item, index) => (
                <SwiperSlide key={index}>
                  <DealsOfTheWeekCardSkeleton></DealsOfTheWeekCardSkeleton>
                </SwiperSlide>
              ))}
          </Swiper>
        </>
      ) : (
        <>
          <Swiper
            spaceBetween={0}
            breakpoints={{
              576: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              992: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 2,
              },
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            slidesPerView={'auto'}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {products.length > 0 &&
              products.map((product, index) => {
                if (product.discount && count < 4) {
                  count++;
                  return (
                    <Fragment key={product._id}>
                      {product.discount && (
                        <SwiperSlide>
                          <DealsOfTheWeekCard
                            product={product}
                          ></DealsOfTheWeekCard>
                        </SwiperSlide>
                      )}
                    </Fragment>
                  );
                } else {
                  return <Fragment key={index}></Fragment>;
                }
              })}
          </Swiper>
        </>
      )}
    </>
  );
};

export default DealsOfTheWeekList;
