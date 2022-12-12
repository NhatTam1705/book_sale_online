import { useNavigate } from 'react-router-dom';
import Avatar from '../../../../assets/images/Slider_1.png';
import Button from '../../../buttons/Button';

const CustomerCardAdmin = ({ user }) => {
  const { _id, name, email, avatar } = user;
  const navigate = useNavigate();

  return (
    <div className="relative w-full bg-white rounded-lg">
      <div className="w-full h-24 bg-orange-200 rounded-tl-md rounded-tr-md"></div>
      <div className="grid w-full grid-rows-3 pb-6 mt-16">
        <h5 className="text-lg text-center row-span-1 font-medium">{name}</h5>
        {/* <span className="text-base text-gray-500">Diamon</span> */}
        <span className="text-base text-center row-span-1 text-gray-500">
          {email}
        </span>
        <Button
          onClick={() => navigate(`/admin/customer/${_id}`)}
          className="mx-16 py-1 mt-2 font-medium text-black row-span-1 bg-white border border-gray-300 rounded-md"
        >
          Profile
        </Button>
      </div>
      <div className="absolute w-full top-10">
        <img
          src={(avatar && avatar.url) || Avatar}
          alt="Customer Avatar"
          className="mx-auto border-4 border-white rounded-full h-28 w-28 "
        ></img>
      </div>
    </div>
  );
};

export const CustomerCardAdminSkeleton = () => {
  return (
    <div className="relative w-full bg-white rounded-lg">
      <div className="w-full h-24 skeleton rounded-tl-md rounded-tr-md"></div>
      <div className="grid w-full grid-rows-3 pb-6 mt-16">
        <div className="row-span-1 mx-20 skeleton h-7"></div>
        {/* <span className="text-base text-gray-500">Diamon</span> */}
        <div className="row-span-1 skeleton mx-12 h-7 "></div>
        <div className="mx-16 py-1 mt-2 row-span-1 h-8 skeleton rounded-md"></div>
      </div>
      <div className="absolute w-full top-10">
        <div className="mx-auto border-4 border-white skeleton rounded-full h-28 w-28 "></div>
      </div>
    </div>
  );
};

export default CustomerCardAdmin;
