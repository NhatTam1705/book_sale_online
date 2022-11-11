import PropsTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import Slider1 from '../../../../../assets/images/Slider_1.png';

const AuthorCard = ({ author }) => {
  const { _id, name } = author;

  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center gap-2 p-5 cursor-pointer"
      onClick={() => navigate(`/author/${_id}`)}
    >
      <img src={Slider1} alt="" className="rounded-full w-44 h-44" />
      <h5 className="text-lg">{name}</h5>
      <h6 className="text-gray-600">2,123 Published Books</h6>
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
