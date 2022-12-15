import { HiChevronDoubleRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import FavoriteAuthorsCard, {
  FavoriteAuthorsCardSkeleton,
} from './FavoriteAuthorsCard';

const FavoriteAuthorsList = ({ authors, loading }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-10">
        <h4 className="text-4xl font-normal">Favorite Authors</h4>
        <div
          onClick={() => navigate('/authors')}
          className="flex items-center cursor-pointer hover:text-orange-600"
        >
          <h6 className="hidden text-lg xl:block lg:block md:block">
            View All
          </h6>
          <HiChevronDoubleRight className="w-6 h-6"></HiChevronDoubleRight>
        </div>
      </div>
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
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {loading ? (
          <>
            {Array(5)
              .fill(0)
              .map((item, index) => (
                <SwiperSlide key={index}>
                  <FavoriteAuthorsCardSkeleton></FavoriteAuthorsCardSkeleton>
                </SwiperSlide>
              ))}
          </>
        ) : (
          <>
            {authors.length > 0 &&
              authors.map((author, index) => (
                <SwiperSlide key={author._id}>
                  <FavoriteAuthorsCard author={author}></FavoriteAuthorsCard>
                </SwiperSlide>
              ))}
          </>
        )}
      </Swiper>
    </div>
  );
};

export default FavoriteAuthorsList;
