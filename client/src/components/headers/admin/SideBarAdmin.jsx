import { useState } from 'react';
import {
  MdDashboard,
  MdLibraryBooks,
  MdOutlineCategory,
  MdOutlineExpandLess,
  MdOutlineExpandMore,
  MdOutlineFeaturedVideo,
  MdOutlineMonetizationOn,
  MdOutlineShoppingCart,
  MdOutlineSwitchAccount,
  MdPeopleOutline,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const sideBarItems = [
  {
    id: 1,
    name: 'Dashboard',
    icon: (
      <MdDashboard className="w-6 h-6 col-span-1 m-auto text-gray-500 cursor-pointer"></MdDashboard>
    ),
    link: '/admin/dashboard',
  },
  {
    id: 2,
    name: 'Customer',
    icon: (
      <MdPeopleOutline className="w-6 h-6 col-span-1 m-auto text-gray-500 cursor-pointer"></MdPeopleOutline>
    ),
    link: '/admin/customers',
  },
  {
    id: 3,
    name: 'Order',
    icon: (
      <MdOutlineShoppingCart className="w-6 h-6 col-span-1 m-auto text-gray-500 cursor-pointer"></MdOutlineShoppingCart>
    ),
    link: '/admin/orders',
  },
  {
    id: 4,
    name: 'Discount',
    icon: (
      <MdOutlineMonetizationOn className="w-6 h-6 col-span-1 m-auto text-gray-500 cursor-pointer"></MdOutlineMonetizationOn>
    ),
    link: '/admin/discounts',
  },
  {
    id: 5,
    name: 'Advertisement',
    icon: (
      <MdOutlineFeaturedVideo className="w-6 h-6 col-span-1 m-auto text-gray-500 cursor-pointer"></MdOutlineFeaturedVideo>
    ),
    link: '/admin/advertisements',
  },
  {
    id: 6,
    name: 'Category',
    icon: (
      <MdOutlineCategory className="w-6 h-6 col-span-1 m-auto text-gray-500 cursor-pointer"></MdOutlineCategory>
    ),
    link: '/admin/categories',
  },
  {
    id: 7,
    name: 'Product',
    icon: (
      <MdLibraryBooks className="w-6 h-6 col-span-1 m-auto text-gray-500 cursor-pointer"></MdLibraryBooks>
    ),
    subItems: [
      {
        subId: 1,
        subName: 'Add Product',
        subLink: '/admin/product',
      },
      {
        subId: 2,
        subName: 'Product List',
        subLink: '/admin/products',
      },
    ],
  },
  {
    id: 8,
    name: 'Author',
    icon: (
      <MdOutlineSwitchAccount className="w-6 h-6 col-span-1 m-auto text-gray-500 cursor-pointer"></MdOutlineSwitchAccount>
    ),
    subItems: [
      {
        subId: 1,
        subName: 'Add Author',
        subLink: '/admin/author',
      },
      {
        subId: 2,
        subName: 'Author List',
        subLink: '/admin/authors',
      },
    ],
  },
];

const SideBarAdmin = () => {
  return (
    <div className="flex flex-col h-full p-6 shadow-md">
      {sideBarItems &&
        sideBarItems.map((item, index) => (
          <SideBarItem key={item.id} item={item}></SideBarItem>
        ))}
    </div>
  );
};

export default SideBarAdmin;

const SideBarItem = ({ item }) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow((prev) => !prev);
    if (item.link) navigate(`${item.link}`);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="grid grid-cols-6 my-2 text-lg select-none"
      >
        {item.icon}
        <span className="col-span-4 font-medium cursor-pointer">
          {item.name}
        </span>
        {item.subItems &&
          (!show ? (
            <MdOutlineExpandMore className="w-6 h-6 col-span-1 m-auto text-gray-500 cursor-pointer"></MdOutlineExpandMore>
          ) : (
            <MdOutlineExpandLess className="w-6 h-6 col-span-1 m-auto text-gray-500 cursor-pointer"></MdOutlineExpandLess>
          ))}
      </div>
      {item.subItems && show && (
        <div className="flex flex-col gap-1 cursor-pointer">
          {item.subItems.map((subItem, subIndex) => (
            <span
              className="m-1 ml-11"
              key={subItem.subId}
              onClick={() => navigate(`${subItem.subLink}`)}
            >
              {subItem.subName}
            </span>
          ))}
        </div>
      )}
    </>
  );
};
