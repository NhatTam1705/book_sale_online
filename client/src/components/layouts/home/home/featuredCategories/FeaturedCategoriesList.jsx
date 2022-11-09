import { useEffect } from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getCategories } from '../../../../../actions/categoryActions';
import FeaturedCategoriesCard from './FeaturedCategoriesCard';

const themeCategoryColors = [
  'red',
  'blue',
  'pink',
  'orange',
  'green',
  'purple',
  'yellow',
  'amber',
  'lime',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'indigo',
  'violet',
  'fuchsia',
  'rose',
];

const FeaturedCategoriesList = () => {
  const disptach = useDispatch();

  const { loading, categories, error, categoriesCount } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    disptach(getCategories());
  }, [disptach]);

  console.log(
    '🚀 ~ file: FeaturedCategoriesList.jsx ~ line 32 ~ FeaturedCategoriesList ~ categoriesCount',
    categoriesCount
  );
  console.log(
    '🚀 ~ file: FeaturedCategoriesList.jsx ~ line 32 ~ FeaturedCategoriesList ~ categories',
    categories
  );
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-10">
        <h4 className="text-4xl font-normal">Featured Categories</h4>
        <div className="flex items-center cursor-pointer hover:text-orange-600">
          <h6 className="hidden text-lg xl:block lg:block md:block">
            All Categories
          </h6>
          <HiChevronDoubleRight className="w-6 h-6"></HiChevronDoubleRight>
        </div>
      </div>
      <Swiper grabCursor={'true'} spaceBetween={30} slidesPerView={'auto'}>
        {categories &&
          categories.map((category) => (
            <SwiperSlide
              key={category._id}
              className="xl:max-w-[18%] lg:max-w-[22.5%] md:max-w-[30.5%] sm:max-w-[48%] max-w-[100%]"
            >
              <FeaturedCategoriesCard
                category={category}
                color={
                  themeCategoryColors[
                    Math.floor(Math.random() * themeCategoryColors.length)
                  ]
                }
              ></FeaturedCategoriesCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default FeaturedCategoriesList;
