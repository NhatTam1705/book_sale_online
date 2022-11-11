import PropsTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { MdOutlineMenuBook } from 'react-icons/md';

const FeaturedCategoriesCard = ({ category, bg, text }) => {
  const { _id, name } = category;

  return (
    <>
      <div
        className={`p-9 w-full h-[194px] select-none cursor-pointer flex flex-col items-start gap-1 ${bg}`}
      >
        <MdOutlineMenuBook className={`${text} w-14 h-14`}></MdOutlineMenuBook>
        <h4 className="text-xl font-semibold">{name}</h4>
        <h6 className="text-lg">Shop Now</h6>
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
