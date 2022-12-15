import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../actions/orderActions';
import MetaData from '../../components/dialogs/MetaData';

const OrderReceivedPage = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
  }, [dispatch, enqueueSnackbar, error, id]);

  return (
    <>
      <MetaData title="Order Received"></MetaData>
      <div className="flex flex-col text-lg gap-8 px-12 py-24 bg-[#fff6f6]">
        <h1 className="col-span-8 text-4xl font-semibold text-center">
          Order Received
        </h1>
        <div className="flex flex-col w-full max-w-4xl gap-8 p-8 mx-auto bg-white">
          <h5 className="text-xl font-semibold text-center">
            Thank you. Your order has been received.
          </h5>
          <div className="grid grid-cols-12">
            <div className="flex flex-col col-span-4 text-lg">
              <span className="font-semibold">Order Id:</span>
              <span className="text-lg">{order && order._id}</span>
            </div>
            <div className="flex flex-col col-span-3 text-lg">
              <span className="font-semibold">Date:</span>
              <span className="text-lg">
                {order && String(order.createdDate).substring(0, 10)}
              </span>
            </div>
            <div className="flex flex-col col-span-2 text-lg">
              <span className="font-semibold">Total:</span>
              <span className="text-lg">${order && order.totalPrice}</span>
            </div>
            <div className="flex flex-col col-span-3 text-lg">
              <span className="font-semibold">Payment method:</span>
              <span className="text-lg">{order && order.paymentMethod}</span>
            </div>
          </div>
          <hr />
          <h5 className="text-xl font-semibold text-center">Order details</h5>
          <div className="flex flex-col gap-4">
            {order &&
              order.orderItems &&
              order.orderItems.map((item, index) => (
                <div key={item.product} className="grid grid-cols-12">
                  <div className="col-span-6">
                    <h6
                      onClick={() => navigate(`/shop/product/${item.product}`)}
                      className="text-lg cursor-pointer hover:text-orange-600"
                    >
                      {item.name}
                    </h6>
                    <h6 className="text-lg text-gray-600">
                      {`(${item.format}, ${item.language})`}
                    </h6>
                  </div>
                  <span className="col-span-1 col-start-8">
                    x{item.quantity}
                  </span>
                  <span className="col-span-1 col-start-12 text-right">
                    $
                    {(item.discount
                      ? item.price * (1 - item.discount / 100)
                      : item.price) * item.quantity}
                  </span>
                </div>
              ))}
          </div>
          <hr />
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2">
              <span className="text-lg font-semibold text-left">Subtotal:</span>
              <span className="text-lg text-right">
                ${order && order.itemsPrice}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-lg font-semibold text-left">Shipping:</span>
              <span className="text-lg text-right">
                {order &&
                  (order.shippingPrice === 0
                    ? `Free Shipping: $${order.shippingPrice}`
                    : `None Free Shipping: $${order.shippingPrice}`)}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-lg font-semibold text-left">
                Payment Method:
              </span>
              <span className="text-lg text-right">{order?.paymentMethod}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-lg font-semibold text-left">
                Order Status:
              </span>
              <span className="text-lg text-right">{order?.orderStatus}</span>
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-2">
            <span className="text-lg font-semibold text-left">Total:</span>
            <span className="text-lg text-right">${order?.totalPrice}</span>
          </div>
          <hr />
          <h5 className="text-xl font-semibold text-center">
            Delivery address
          </h5>
          <div className="flex flex-col gap-4">
            <h6 className="text-lg">
              <span className="font-semibold">Name: </span>
              {order?.shippingInfo?.name}
            </h6>
            <h6 className="text-lg">
              <span className="font-semibold">Phone: </span>
              {order?.shippingInfo?.phone}
            </h6>
            <h6 className="text-lg">
              <span className="font-semibold">Email: </span>
              {order?.shippingInfo?.email}
            </h6>
            <h6 className="text-lg">
              <span className="font-semibold">Delivery Address: </span>
              {order?.shippingInfo?.delivery}
            </h6>
            <h6 className="text-lg">
              <span className="font-semibold">Note: </span>
              {order?.shippingInfo?.note}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderReceivedPage;
