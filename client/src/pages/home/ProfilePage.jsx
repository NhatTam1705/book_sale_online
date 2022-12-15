import { Outlet } from 'react-router-dom';
import MetaData from '../../components/dialogs/MetaData';
import SideBarProfile from '../../components/layouts/home/profile/SideBarProfile';

const ProfilePage = () => {
  return (
    <>
      <MetaData title="Profile"></MetaData>
      <div className="grid grid-cols-12 px-12 ">
        <div className="col-span-12 py-24 border-b border-gray-300 xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 xl:border-r lg:border-r md:border-r sm:border-b">
          <h3 className="mb-6 text-4xl font-semibold">My Account</h3>
          <SideBarProfile></SideBarProfile>
        </div>
        <div className="col-span-12 py-24 pl-0 xl:col-span-9 lg:col-span-9 md:col-span-9 sm:col-span-12 xl:pl-12 lg:pl-12 md:pl-12 sm:pl-0">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
