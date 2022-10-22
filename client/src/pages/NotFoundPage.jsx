import React from 'react';
import Button from '../components/buttons/Button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col my-[120px] items-center gap-5">
      <h1 className="text-[150px] font-bold">404</h1>
      <div className="items-center flex flex-col">
        <h5 className="text-xl font-semibold">
          Woops, looks like this page does not exist
        </h5>
        <h6>You could either go back or go to homepage</h6>
      </div>
      <Button
        bgColor="bg-black"
        className="text-white w-[200px]"
        onClick={() => navigate('/home')}
      >
        Go Back
      </Button>
    </div>
  );
};

export default NotFoundPage;
