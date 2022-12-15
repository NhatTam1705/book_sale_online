import { useNavigate } from 'react-router-dom';

const FavoriteAuthorsCard = ({ author }) => {
  const { _id, name, avatar, totalBook } = author;
  const navigate = useNavigate();
  return (
    <div className="w-full p-8 items-center flex flex-col gap-10">
      <img
        src={avatar.url}
        alt={name}
        className="w-[150px] h-[150px] object-cover rounded-full"
      />
      <div className="items-center flex flex-col">
        <h6
          onClick={() => navigate(`/author/${_id}`)}
          className="text-base font-semibold hover:text-orange-600 cursor-pointer"
        >
          {name}
        </h6>
        <h6 className="text-base text-gray-500">{totalBook} Published Books</h6>
      </div>
    </div>
  );
};

export const FavoriteAuthorsCardSkeleton = () => {
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

export default FavoriteAuthorsCard;
