import { NavLink } from 'react-router-dom';

const sideBarItems = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/profile/dashboard',
  },
  {
    id: 2,
    name: 'Orders',
    path: '/profile/orders',
  },
  {
    id: 3,
    name: 'Address',
    path: '/profile/address',
  },
  {
    id: 4,
    name: 'Account',
    path: '/profile/account',
  },
  {
    id: 5,
    name: 'Wishlist',
    path: '/profile/wishlist',
  },
];

const SideBarProfile = () => {
  return (
    <div className="flex flex-col gap-2">
      {sideBarItems &&
        sideBarItems.map((item, index) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-lg text-orange-600 translate-x-4 transition-all'
                : 'text-lg hover:text-orange-600 hover:translate-x-4 transition-all'
            }
            to={item.path}
            key={item.id}
          >
            {item.name}
          </NavLink>
        ))}
      <NavLink className="text-lg hover:text-orange-600 hover:translate-x-4 transition-all">
        Logout
      </NavLink>
    </div>
  );
};

export default SideBarProfile;
