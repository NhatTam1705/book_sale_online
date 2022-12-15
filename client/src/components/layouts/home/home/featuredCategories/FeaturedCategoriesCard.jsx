import PropsTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { MdOutlineMenuBook } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const FeaturedCategoriesCard = ({ subCategory, bg, text }) => {
  const { _id, name } = subCategory;
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`p-9 w-full grid grid-rows-5 select-none cursor-pointer items-start gap-1 ${bg}`}
      >
        <MdOutlineMenuBook
          className={`${text} w-14 h-14 row-span-2`}
        ></MdOutlineMenuBook>
        <h4 className="text-xl font-semibold row-span-2">{name}</h4>
        <h6
          onClick={() => navigate('/shop')}
          className=" cursor-pointer hover:text-orange-600 text-lg row-span-1"
        >
          Shop Now
        </h6>
      </div>
    </>
  );
};

export const FeaturedCategoriesCardSkeleton = () => {
  return (
    <>
      <div
        className={`p-9 w-full grid grid-rows-5 select-none cursor-pointer items-start gap-1 border border-gray-300f`}
      >
        <div className=" w-14 h-14 row-span-2 skeleton"></div>
        <div className="row-span-2 h-14 w-full skeleton"></div>
        <div className=" h-7 w-16 row-span-1 skeleton"></div>
      </div>
    </>
  );
};

FeaturedCategoriesCard.PropsTypes = {
  category: PropsTypes.shape({
    _id: PropsTypes.string,
    name: PropsTypes.string,
  }),
};

const FallbackComponent = () => {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  );
};

export default withErrorBoundary(FeaturedCategoriesCard, {
  FallbackComponent,
});
