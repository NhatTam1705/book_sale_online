import { Pagination } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  deleteOrder,
  getAllOrdersPagination,
} from '../../../../actions/orderActions';
import { DELETE_ORDER_RESET } from '../../../../constants/orderConstants';
import OrderItem, { OrderItemAdminSkeleton } from './OrderItemAdmin';

const OrderTableAdmin = ({ user, status }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const { orders, error, loading, ordersCount, filteredOrdersCount } =
    useSelector((state) => state.orders);
  const { error: errorDelete, isDeleted } = useSelector((state) => state.order);
  const numberPage = Math.ceil((filteredOrdersCount || ordersCount) / 6);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (errorDelete) {
      enqueueSnackbar(errorDelete, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      enqueueSnackbar('Order is deleted', { variant: 'success' });
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(
      getAllOrdersPagination(
        6,
        currentPage,
        'createdDate',
        'desc',
        user,
        status
      )
    );
  }, [
    currentPage,
    dispatch,
    enqueueSnackbar,
    error,
    errorDelete,
    isDeleted,
    status,
    user,
  ]);

  const handleDeleteOrder = (id) => {
    dispatch(deleteOrder(id));
  };

  return (
    <>
      <div className="col-span-9 p-6 text-lg rounded-lg bg-gray-50">
        <div className="grid grid-cols-12 pb-2">
          <span className="col-span-1">ID</span>
          <span className="col-span-4">Customer name</span>
          <span className="col-span-1">Price</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2">Date</span>
          <span className="col-span-2">Action</span>
        </div>
        <hr />
        <div>
          {loading ? (
            <>
              {Array(6)
                .fill(0)
                .map((item, index) => (
                  <OrderItemAdminSkeleton key={index}></OrderItemAdminSkeleton>
                ))}
            </>
          ) : (
            <>
              {orders &&
                orders.map((order, index) => (
                  <OrderItem
                    key={order._id}
                    order={order}
                    onClickDelete={() => handleDeleteOrder(order._id)}
                  ></OrderItem>
                ))}
            </>
          )}
        </div>
        <div className="flex justify-between pt-6">
          <div>
            {6 < (filteredOrdersCount || ordersCount) &&
              filteredOrdersCount !== 0 && (
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
            {orders.length === 0 ? (
              'No result'
            ) : (
              <>{`Show ${6 * (currentPage - 1) + 1} - ${
                6 * currentPage > filteredOrdersCount
                  ? filteredOrdersCount
                  : 6 * currentPage
              } of ${filteredOrdersCount} result`}</>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTableAdmin;
