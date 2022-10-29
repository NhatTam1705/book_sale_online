import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBarProfile from '../../components/layouts/home/profile/SideBarProfile';

const ProfilePage = () => {
  return (
    <>
      <div className="grid grid-cols-12 px-12 ">
        <div className="col-span-3 border-r border-gray-300 py-24">
          <h3 className='text-4xl font-semibold mb-6'>My Account</h3>
          <SideBarProfile></SideBarProfile>
        </div>
        <div className="col-span-9 py-24 pl-12">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
