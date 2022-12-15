import PropsTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

const AuthorCard = ({ author }) => {
  const { _id, name, avatar, totalBook } = author;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-2 p-5 cursor-pointer">
      <img src={avatar.url} alt={name} className="rounded-full w-44 h-44" />
      <h5
        onClick={() => navigate(`/author/${_id}`)}
        className="text-lg hover:text-orange-600"
      >
        {name}
      </h5>
      <h6 className="text-gray-600">{totalBook} Published Books</h6>
    </div>
  );
};

export const AuthorCardSkeleton = () => {
  return (
    <div className="w-full p-8 items-center flex flex-col gap-10">
      <div className="w-[150px] h-[150px] skeleton rounded-full"></div>
      <div className="items-center gap-1 flex flex-col">
        <div className="w-40 h-7 skeleton"></div>
        <div className="w-52 h-7 skeleton"></div>
      </div>
    </div>
  );
};

AuthorCard.PropsTypes = {
  author: PropsTypes.shape({
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

export default withErrorBoundary(AuthorCard, FallbackComponent);
