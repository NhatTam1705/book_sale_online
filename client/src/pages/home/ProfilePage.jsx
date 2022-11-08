import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBarProfile from '../../components/layouts/home/profile/SideBarProfile';

const ProfilePage = () => {
  return (
    <>
      <div className="grid grid-cols-12 px-12 ">
        <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12 xl:border-r lg:border-r md:border-r sm:border-b border-b border-gray-300 py-24">
          <h3 className='text-4xl font-semibold mb-6'>My Account</h3>
          <SideBarProfile></SideBarProfile>
        </div>
        <div className="xl:col-span-9 lg:col-span-9 md:col-span-9 sm:col-span-12 col-span-12 py-24 xl:pl-12 lg:pl-12 md:pl-12 sm:pl-0 pl-0">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
