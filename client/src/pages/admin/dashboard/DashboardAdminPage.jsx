import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  clearErrors as clearErrorsOrder,
  getAllOrdersPagination,
} from '../../../actions/orderActions';
import {
  clearErrors as clearErrorsProduct,
  getProducts,
} from '../../../actions/productActions';
import {
  clearErrors as clearErrorsUser,
  getUsers,
} from '../../../actions/userActions';
import MetaData from '../../../components/dialogs/MetaData';

const DashboardAdminPage = () => {
  const {
    products,
    productsCount,
    error: errorProduct,
  } = useSelector((state) => state.products);
  const {
    ordersCount,
    orders,
    error: errorOrder,
  } = useSelector((state) => state.orders);
  const {
    users,
    usersCount,
    error: errorUser,
  } = useSelector((state) => state.users);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (errorOrder) {
      enqueueSnackbar(errorOrder, { variant: 'error' });
      dispatch(clearErrorsOrder());
    }

    if (errorProduct) {
      enqueueSnackbar(errorProduct, { variant: 'error' });
      dispatch(clearErrorsProduct());
    }

    if (errorUser) {
      enqueueSnackbar(errorUser, { variant: 'error' });
      dispatch(clearErrorsUser());
    }

    dispatch(getProducts());
    dispatch(getAllOrdersPagination());
    dispatch(getUsers());
  }, [dispatch, enqueueSnackbar, errorOrder, errorProduct, errorUser]);

  let outOfStock = 0;
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });
  return (
    <>
      <MetaData title="Dashboard - Admin"></MetaData>
      <div className="flex flex-col gap-6">
        <div className="w-full p-8 text-black border border-gray-300 shadow-md rounded-lg flex flex-col gap-2 justify-center items-center text-2xl font-medium">
          <h4 className="">Total Amount</h4>
          <h3 className="">$200</h3>
        </div>
        <div className="grid grid-cols-12 grid-rows-1 gap-6">
          <div className="col-span-3 row-span-1 rounded-lg text-black border border-gray-300 shadow-md text-2xl font-medium grid grid-rows-4">
            <div className="row-span-3 flex flex-col gap-2 p-8 justify-center items-center border-b border-gray-300">
              <h4>Products</h4>
              <h4>{(productsCount && productsCount) || 0}</h4>
            </div>
            <div
              onClick={() => navigate('/admin/products')}
              className="text-lg font-normal mx-6 row-span-1 flex flex-row justify-between items-center cursor-pointer"
            >
              <span>View Details</span>
              <HiChevronDoubleRight></HiChevronDoubleRight>
            </div>
          </div>
          <div className="col-span-3 row-span-1 rounded-lg text-black border border-gray-300 shadow-md text-2xl font-medium grid grid-rows-4">
            <div className="row-span-3 flex flex-col gap-2 p-8 justify-center items-center border-b border-gray-300">
              <h4>Orders</h4>
              <h4>{(orders && ordersCount) || 0}</h4>
            </div>
            <div
              onClick={() => navigate('/admin/orders')}
              className="text-lg font-normal mx-6 row-span-1 flex flex-row justify-between items-center cursor-pointer"
            >
              <span>View Details</span>
              <HiChevronDoubleRight></HiChevronDoubleRight>
            </div>
          </div>
          <div className="col-span-3 row-span-1 rounded-lg text-black border border-gray-300 shadow-md text-2xl font-medium grid grid-rows-4">
            <div className="row-span-3 flex flex-col gap-2 p-8 justify-center items-center border-b border-gray-300">
              <h4>Users</h4>
              <h4>{(users && usersCount) || 0}</h4>
            </div>
            <div
              onClick={() => navigate('/admin/customers')}
              className="text-lg font-normal mx-6 row-span-1 flex flex-row justify-between items-center cursor-pointer"
            >
              <span>View Details</span>
              <HiChevronDoubleRight></HiChevronDoubleRight>
            </div>
          </div>
          <div className="col-span-3 row-span-1 rounded-lg text-black border border-gray-300 shadow-md text-2xl font-medium grid grid-rows-4">
            <div className="row-span-3 flex flex-col gap-2 p-8 justify-center items-center ">
              <h4>Out Of Stock</h4>
              <h4>{outOfStock}</h4>
            </div>
            {/* <div className="text-lg font-normal mx-6 row-span-1 flex flex-row justify-between items-center cursor-pointer">
            <span>View detail</span>
            <HiChevronDoubleRight></HiChevronDoubleRight>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAdminPage;
