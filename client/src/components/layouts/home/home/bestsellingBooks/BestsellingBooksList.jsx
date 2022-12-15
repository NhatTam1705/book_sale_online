import { HiChevronDoubleRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import BestsellingBooksCard, {
  BestsellingBooksCardSkeleton,
} from './BestsellingBooksCard';

const BestsellingBooksList = ({ products, loading }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-10">
        <h4 className="text-4xl font-normal">Bestselling Books</h4>
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
              slidesPerView: 5,
            },
          }}
          grabCursor={'true'}
          spaceBetween={0}
          slidesPerView={'auto'}
        >
          {Array(5)
            .fill(0)
            .map((value, index) => (
              <SwiperSlide key={index}>
                <BestsellingBooksCardSkeleton></BestsellingBooksCardSkeleton>
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
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
              slidesPerView: 5,
            },
          }}
          grabCursor={'true'}
          spaceBetween={0}
          slidesPerView={'auto'}
        >
          {products &&
            products
              .sort((prev, next) => {
                return prev.stockInput - prev.stock <
                  next.stockInput - next.stock
                  ? 1
                  : -1;
              })
              .map(
                (product, index) =>
                  index < 8 && (
                    <SwiperSlide key={product._id}>
                      <BestsellingBooksCard
                        product={product}
                      ></BestsellingBooksCard>
                    </SwiperSlide>
                  )
              )}
        </Swiper>
      )}
    </div>
  );
};

export default BestsellingBooksList;
