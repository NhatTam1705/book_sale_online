import { HiChevronDoubleRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import RelatedProductsCard, {
  RelatedProductsCardSkeleton,
} from './RelatedProductsCard';

const RelatedProductsList = ({ products, loading, category, product: id }) => {
  const navigate = useNavigate();
  return (
    <div className="px-12">
      <div className="flex flex-row items-center justify-between mb-10">
        <h4 className="text-4xl font-normal">Related Product</h4>
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
                <RelatedProductsCardSkeleton></RelatedProductsCardSkeleton>
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
                  product.category === category &&
                  product._id !== id && (
                    <SwiperSlide key={product._id}>
                      <RelatedProductsCard
                        product={product}
                      ></RelatedProductsCard>
                    </SwiperSlide>
                  )
              )}
        </Swiper>
      )}
    </div>
  );
};

export default RelatedProductsList;
