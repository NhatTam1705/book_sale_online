import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getProducts } from '../../../../../actions/productActions';
import BestsellingBooksCard, {
  BestsellingBooksCardSkeleton,
} from './BestsellingBooksCard';

const BestsellingBooksList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const disptach = useDispatch();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return enqueueSnackbar(error, {
        variant: 'error',
      });
    }
    disptach(getProducts());
  }, [disptach, enqueueSnackbar, error]);

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
      {loading ? (
        <Swiper grabCursor={'true'} spaceBetween={0} slidesPerView={'auto'}>
          {Array(5)
            .fill(0)
            .map((value, index) => (
              <SwiperSlide
                key={index}
                className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]"
              >
                <BestsellingBooksCardSkeleton></BestsellingBooksCardSkeleton>
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <Swiper grabCursor={'true'} spaceBetween={0} slidesPerView={'auto'}>
          {products &&
            products.sort().map((product) => (
              <SwiperSlide
                key={product._id}
                className="xl:max-w-[20%] lg:max-w-[25%] md:max-w-[33.33%] sm:max-w-[50%]"
              >
                <BestsellingBooksCard product={product}></BestsellingBooksCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default BestsellingBooksList;
