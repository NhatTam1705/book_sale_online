import { Pagination, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  clearErrors as clearErrorsOrder,
  deleteOrder,
  getOrdersPagination,
} from '../../../actions/orderActions';
import {
  clearErrors as clearErrorsUser,
  getUserDetials,
} from '../../../actions/userActions';
import Avatar from '../../../assets/images/Slider_1.png';
import MetaData from '../../../components/dialogs/MetaData';
import OrderItemCustomerAdmin from '../../../components/layouts/admin/customer/OrderItemCustomerAdmin';
import { DELETE_ORDER_RESET } from '../../../constants/orderConstants';

const CustomerProfileAdminPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    error: errorOrder,
    loading,
    orders,
  } = useSelector((state) => state.myOrders);
  const { user, error: errorUser } = useSelector((state) => state.userDetails);
  const { error: errorDelete, isDeleted } = useSelector((state) => state.order);
  const numberPage = Math.ceil((orders && orders.length) / 4);

  useEffect(() => {
    if (errorOrder) {
      enqueueSnackbar(errorOrder, { variant: 'error' });
      dispatch(clearErrorsOrder());
    }

    if (errorUser) {
      enqueueSnackbar(errorUser, { variant: 'error' });
      dispatch(clearErrorsUser());
    }

    if (errorDelete) {
      enqueueSnackbar(errorDelete, { variant: 'error' });
      dispatch(clearErrorsUser());
    }

    if (isDeleted) {
      enqueueSnackbar('Order is deleted', { variant: 'success' });
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getUserDetials(id));
    dispatch(getOrdersPagination(4, currentPage, 'createdDate', 'desc', id));
  }, [
    currentPage,
    dispatch,
    enqueueSnackbar,
    errorDelete,
    errorOrder,
    errorUser,
    id,
    isDeleted,
  ]);

  const handleDeleteOrder = (id) => {
    dispatch(deleteOrder(id));
  };

  return (
    <>
      <MetaData title="Customer Profile - Admin"></MetaData>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-row items-center justify-between mb-6">
          <h5 className="text-3xl font-medium">Customer Profile</h5>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg grid grid-cols-12 gap-6">
          <div className="col-span-8 flex flex-col gap-4 text-lg">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6 flex flex-col gap-1">
                <label>Full name</label>
                <TextField
                  disabled
                  className="bg-white"
                  value={(user && user.name) || ''}
                />
              </div>
              <div className="col-span-6 flex flex-col gap-1">
                <label>Created date</label>
                <TextField
                  disabled
                  className="bg-white"
                  value={
                    (user && String(user.createdDate).substring(0, 10)) || ''
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6 flex flex-col gap-1">
                <label>Phone</label>
                <TextField
                  disabled
                  className="bg-white"
                  value={(user && user.phone) || ''}
                />
              </div>
              <div className="col-span-6 flex flex-col gap-1">
                <label>Gender</label>
                <TextField
                  disabled
                  className="bg-white"
                  value={(user && user.gender) || ''}
                />
              </div>
            </div>
            <div className="col-span-6 flex flex-col gap-1">
              <label>Email</label>
              <TextField
                disabled
                className="bg-white"
                value={(user && user.email) || ''}
              />
            </div>
          </div>
          <div className="col-span-4">
            <img
              src={(user && user?.avatar?.url) || Avatar}
              alt=""
              className="w-44 h-44 rounded-full mx-auto"
            />
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <h6 className="text-2xl font-medium mb-6">Dashboard Customer</h6>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-12 gap-6 h-32">
              <div className="col-span-6 rounded-lg h-full border border-gray-300 shadow-md bg-white flex-col flex items-center justify-center">
                <h6 className="text-xl font-medium">Total Order</h6>
                <span className="text-2xl font-bold">
                  {orders && orders.length}
                </span>
              </div>
              <div className="col-span-6 rounded-lg h-full border border-gray-300 shadow-md bg-white flex-col flex items-center justify-center">
                <h6 className="text-xl font-medium">Total Money</h6>
                <span className="text-2xl font-bold">
                  $
                  {(orders &&
                    orders.reduce((acc, item) => acc + item.totalPrice, 0)) ||
                    0}
                </span>
              </div>
            </div>
            <hr className="my-6" />
          </div>
        </div>
        <div className="col-span-6">
          <h6 className="text-2xl font-medium mb-6">Order Customer</h6>
          <div className="bg-gray-50 rounded-lg p-6 text-lg">
            <div className="grid grid-cols-12 pb-2">
              <span className="col-span-1">ID</span>
              <span className="col-span-2">Price</span>
              <span className="col-span-3">Status</span>
              <span className="col-span-3">Date</span>
              <span className="col-span-3">Action</span>
            </div>
            <hr />
            <div>
              {loading ? (
                <></>
              ) : (
                <>
                  {orders &&
                    orders.map((order, index) => (
                      <OrderItemCustomerAdmin
                        order={order}
                        key={order._id}
                        onClickDelete={() => handleDeleteOrder(order._id)}
                      ></OrderItemCustomerAdmin>
                    ))}
                </>
              )}
            </div>
            <div className="flex justify-between pt-6 ">
              <div>
                {4 < (orders && orders.length) && (
                  <Pagination
                    className=""
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    color="primary"
                    count={numberPage || 0}
                    variant="outlined"
                    shape="rounded"
                    size="large"
                  />
                )}
              </div>
              <div className="flex items-center">
                {orders && orders.length === 0 ? (
                  'No result'
                ) : (
                  <>{`Show ${4 * (currentPage - 1) + 1} - ${
                    4 * currentPage > (orders && orders.length)
                      ? orders && orders.length
                      : 4 * currentPage
                  } of ${orders && orders.length} result`}</>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerProfileAdminPage;
