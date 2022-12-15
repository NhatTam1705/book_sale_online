import { HiChevronDoubleRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import AuthorBookCard, { AuthorBookCardSkeleton } from './AuthorBookCard';

const AuthorBookList = ({ products, loading, author }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between mb-10">
        <h4 className="text-4xl font-normal">Author's Books</h4>
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
                <AuthorBookCardSkeleton></AuthorBookCardSkeleton>
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
                return prev.createdDate < next.createdDate ? 1 : -1;
              })
              .map(
                (product, index) =>
                  product.author._id === author && (
                    <SwiperSlide key={product._id}>
                      <AuthorBookCard product={product}></AuthorBookCard>
                    </SwiperSlide>
                  )
              )}
        </Swiper>
      )}
    </div>
  );
};

export default AuthorBookList;
