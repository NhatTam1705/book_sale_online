import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBarProfile from '../../components/layouts/home/profile/SideBarProfile';

const ProfilePage = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/home');
      enqueueSnackbar('Login first to access resource!', {
        variant: 'warning',
      });
    }
  });
  return (
    <>
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
