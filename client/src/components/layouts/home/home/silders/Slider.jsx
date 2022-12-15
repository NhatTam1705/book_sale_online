import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  clearErrors,
  getAdvertisements,
} from '../../../../../actions/advertisementActions';
import Button from '../../../../buttons/Button';
import ComingSoon from '../../../../../assets/images/coming_soon.jpg';
import MerryChristmas from '../../../../../assets/images/merry_christmas.jpg';

const advertisements = [
  {
    _id: 1,
    name: 'New Book',
    description: 'Coming soon',
    image: {
      url: ComingSoon,
    },
  },
  {
    _id: 2,
    name: 'Merry Christmas',
    description: 'And Happy New Year',
    image: {
      url: MerryChristmas,
    },
  },
];

const Slider = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();
  // const { advertisements, error, loading, advertisementsCount } = useSelector(
  //   (state) => state.advertisements
  // );

  // useEffect(() => {
  //   if (error) {
  //     enqueueSnackbar(error, { variant: 'error' });
  //     dispatch(clearErrors());
  //   }
  //   dispatch(getAdvertisements());
  // }, [dispatch, enqueueSnackbar, error]);
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[500px] bg-[#fff6f6]"
      >
        {advertisements.length > 0 &&
          advertisements.map((advertisement, index) => (
            <SwiperSlide key={advertisement._id}>
              <div className="pt-12 pb-36 px-48 justify-center items-center grid h-[580px] w-full grid-cols-2 gap-16">
                <div className="col-span-1 flex flex-col gap-4">
                  <h6 className="text-xl font-bold uppercase text-neutral-700">
                    {advertisement.name}
                  </h6>
                  {/* <h4 className="text-6xl">{ advertisement.title}</h4> */}
                  <h4 className="text-6xl font-bold">
                    {advertisement.description}
                  </h4>
                  <Button
                    className="w-36"
                    bgColor="bg-blue-500"
                    onClick={() => navigate('/shop')}
                  >
                    See more
                  </Button>
                </div>
                <img
                  src={advertisement.image.url}
                  alt={advertisement.name}
                  className="col-span-1 bg-transparent w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default Slider;
