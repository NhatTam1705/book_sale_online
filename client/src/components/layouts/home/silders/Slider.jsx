import { useNavigate } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '../../../buttons/Button';
import Slider1 from '../../../../assets/images/Slider_1.png';
import Slider2 from '../../../../assets/images/Slider_2.png';

const slidersData = [
  {
    id: 1,
    subTitle: 'The Bookworm Editors',
    title: 'Featured Books of the',
    time: 'February',
    background: Slider1,
    poster: Slider2,
  },
  {
    id: 2,
    subTitle: 'The Bookworm Editors',
    title: 'Featured Books of the',
    time: 'February',
    background: Slider2,
    poster: Slider1,
  },
];

const Slider = () => {
  const navigate = useNavigate();
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
        className="mySwiper h-[580px]"
      >
        {slidersData &&
          slidersData.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className="relative">
                <img
                  className="object-fill w-full h-full"
                  src={item.background}
                  alt={item.title}
                />
                <div className="absolute px-12 justify-center items-center grid h-[580px] w-full grid-cols-2 top-0 left-0 gap-5">
                  <div className="flex flex-col gap-4">
                    <h6 className="text-xl font-bold uppercase text-neutral-700">
                      {item.subTitle}
                    </h6>
                    <h4 className="text-6xl">{item.title}</h4>
                    <h4 className="text-6xl font-bold">{item.time}</h4>
                    <Button
                      className="w-36"
                      bgColor="bg-blue-500"
                      onClick={() => navigate()}
                    >
                      See more
                    </Button>
                  </div>
                  <div className="flex w-full h-auto">
                    <img src={item.poster} alt={item.title} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default Slider;
