import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, myOrders } from '../../../../../../actions/orderActions';
import OrderItem from './OrderItem';

const OrdersProfile = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { error, loading, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      enqueueSnackbar('error', { variant: 'error' });
      dispatch(clearErrors());
    }
  }, [dispatch, enqueueSnackbar, error]);

  return (
    <div>
      <h3 className="mb-6 text-4xl font-semibold">Orders</h3>
      <div className="grid grid-cols-12 gap-3 p-4 text-lg font-semibold border border-gray-300">
        <span className="col-span-4">Order</span>
        <span className="col-span-2">Date</span>
        <span className="col-span-2">Status</span>
        <span className="col-span-2">Total</span>
        <span className="col-span-2">Actions</span>
      </div>
      <div>
        {orders &&
          orders
            .sort((prev, next) => {
              return prev.createdDate < next.createdDate ? 1 : -1;
            })
            .map((order, index) => (
              <OrderItem order={order} key={order._id}></OrderItem>
            ))}
      </div>
    </div>
  );
};

export default OrdersProfile;
