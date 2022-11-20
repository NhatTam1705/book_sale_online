import { useSnackbar } from 'notistack';
import {
  HiOutlineHeart,
  HiOutlineIdentification,
  HiOutlineLocationMarker,
  HiOutlineLogout,
  HiOutlineNewspaper,
  HiOutlineViewBoards,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../../actions/userActions';

const dashboardItems = [
  {
    id: 1,
    name: 'Dashboard',
    icon: <HiOutlineViewBoards className="w-14 h-14"></HiOutlineViewBoards>,
    link: '/profile/dashboard',
  },
  {
    id: 2,
    name: 'Orders',
    icon: <HiOutlineNewspaper className="w-14 h-14"></HiOutlineNewspaper>,
    link: '/profile/orders',
  },
  {
    id: 3,
    name: 'Address',
    icon: (
      <HiOutlineLocationMarker className="w-14 h-14"></HiOutlineLocationMarker>
    ),
    link: '/profile/address',
  },
  {
    id: 4,
    name: 'Account',
    icon: (
      <HiOutlineIdentification className="w-14 h-14"></HiOutlineIdentification>
    ),
    link: '/profile/account',
  },
  {
    id: 5,
    name: 'Wishlist',
    icon: <HiOutlineHeart className="w-14 h-14"></HiOutlineHeart>,
    link: '/profile/wishlist',
  },
  {
    id: 6,
    name: 'Logout',
    icon: <HiOutlineLogout className="w-14 h-14"></HiOutlineLogout>,
    link: null,
  },
];

const DashboardProfile = () => {
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    enqueueSnackbar('Logout successfully!', { variant: 'success' });
  };
  return (
    <div>
      <h3 className="text-4xl font-semibold mb-6">Dashboard</h3>
      <div className="flex flex-col gap-4">
        <h5 className="text-lg">Hello {user.name}</h5>
        <h6>
          From your account dashboard you can view your recent orders, manage
          your shipping and billing addresses, and edit your password and
          account details.
        </h6>
        <div className="grid grid-cols-12">
          {dashboardItems &&
            dashboardItems.map((item, index) => (
              <div
                key={item.id}
                className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-4 col-span-6 px-6 py-12 flex flex-col gap-2 items-center border border-gray-300 cursor-pointer"
                onClick={() => navigate(`${item.link}`)}
              >
                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-pink-50 hover:bg-red-300 text-red-500 hover:text-white">
                  {item.icon}
                </div>
                <span className="text-lg">{item.name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
