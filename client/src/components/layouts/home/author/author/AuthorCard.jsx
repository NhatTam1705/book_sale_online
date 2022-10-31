import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider1 from '../../../../../assets/images/Slider_1.png';

const AuthorCard = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center gap-2 p-5 cursor-pointer"
      onClick={() => navigate('/author/12')}
    >
      <img src={Slider1} alt="" className="rounded-full w-44 h-44" />
      <h5 className="text-lg">Old man dev</h5>
      <h6 className="text-gray-600">2,123 Published Books</h6>
    </div>
  );
};

export default AuthorCard;
