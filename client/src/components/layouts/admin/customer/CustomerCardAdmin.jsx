import { useNavigate } from 'react-router-dom';
import Avatar from '../../../../assets/images/Slider_1.png';
import Button from '../../../buttons/Button';

const CustomerCardAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full bg-white rounded-lg">
      <div className="w-full h-24 bg-orange-200 rounded-tl-md rounded-tr-md"></div>
      <div className="flex flex-col items-center justify-center pb-6 mt-16">
        <h5 className="text-lg font-medium">Old man dev</h5>
        <span className="text-base text-gray-500">Diamon</span>
        <span className="text-base text-gray-500">oldmandev@gmail.com</span>
        <Button
          onClick={() => navigate('/admin/customer/1')}
          className="px-4 py-1 mt-2 font-medium text-black bg-white border border-gray-300 rounded-md"
        >
          Profile
        </Button>
      </div>
      <div className="absolute w-full top-10">
        <img
          src={Avatar}
          alt=""
          className="mx-auto border-4 border-white rounded-full h-28 w-28 "
        ></img>
      </div>
    </div>
  );
};

export default CustomerCardAdmin;
