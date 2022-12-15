import { Autocomplete, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import {
  MdCreditCard,
  MdOutlineDateRange,
  MdOutlineLocalPrintshop,
  MdOutlineLocationOn,
  MdOutlinePersonOutline,
  MdOutlinePinDrop,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from '../../../actions/orderActions';
import Slider from '../../../assets/images/Slider_1.png';
import Button from '../../../components/buttons/Button';
import MetaData from '../../../components/dialogs/MetaData';
import { UPDATE_ORDER_RESET } from '../../../constants/orderConstants';

const status = [
  {
    label: 'Processing',
    value: 'Processing',
  },
  {
    label: 'Preparing',
    value: 'Preparing',
  },
  {
    label: 'Delivering',
    value: 'Delivering',
  },
  {
    label: 'Completed',
    value: 'Completed',
  },
];

const OrderDetailsAdminPage = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    error: errorOrderDetails,
    loading,
    order,
  } = useSelector((state) => state.orderDetails);
  const { error, isUpdated } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (errorOrderDetails) {
      enqueueSnackbar(errorOrderDetails, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, enqueueSnackbar, error, errorOrderDetails, id, isUpdated]);

  return (
    <>
      <MetaData title="Order Details - Admin"></MetaData>
      <div className="flex flex-row items-center justify-between mb-6">
        <h5 className="text-3xl font-medium">Order details</h5>
      </div>
      <div className="flex flex-col gap-6 p-6 rounded-lg bg-gray-50">
        <div className="flex flex-row justify-between w-full">
          <div className="grid grid-cols-12">
            <MdOutlineDateRange className="w-8 h-8 col-span-2 "></MdOutlineDateRange>
            <div className="flex flex-col col-span-10">
              <span className="text-lg font-medium">
                {order && String(order.createdDate).substring(0, 10)}
              </span>
              <span className="text-base text-gray-500">
                #ID {order && order._id}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-8 gap-2 w-[400px]">
            <Autocomplete
              id="status"
              options={status}
              className="w-full col-span-6"
              value={(order && order?.orderStatus) || ''}
              onChange={(event, value) =>
                dispatch(
                  updateOrder(id, {
                    status: (value && value.value) || order?.orderStatus,
                  })
                )
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="bg-white"
                  label={(order && order?.orderStatus) || ''}
                />
              )}
            />
            <Button className="col-span-2 text-white bg-black">
              <MdOutlineLocalPrintshop className="w-6 h-6 m-auto"></MdOutlineLocalPrintshop>
            </Button>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-12">
          <div className="grid grid-cols-12 col-span-6">
            <MdOutlinePersonOutline className="w-16 h-16 col-span-2 p-3 bg-white rounded-full"></MdOutlinePersonOutline>
            <div className="flex flex-col col-span-10 gap-1">
              <h5 className="text-lg font-medium">Customer</h5>
              <div className="flex flex-col">
                <div>
                  <label className="text-gray-500">Name: </label>
                  <span>{order?.shippingInfo?.name}</span>
                </div>
                <div>
                  <label className="text-gray-500">Phone: </label>
                  <span>{order?.shippingInfo?.phone}</span>
                </div>
                <div>
                  <label className="text-gray-500">Email: </label>
                  <span>{order?.shippingInfo?.email}</span>
                </div>
              </div>
              <span
                // onClick={() =>
                //   navigate(`/admin/customer/${order && order.user}`)
                // }
                className="text-blue-500 cursor-pointer"
              >
                View profile
              </span>
            </div>
          </div>
          <div className="grid grid-cols-12 col-span-6">
            <MdOutlineLocationOn className="w-16 h-16 col-span-2 p-3 bg-white rounded-full"></MdOutlineLocationOn>
            <div className="flex flex-col col-span-10 gap-1">
              <h5 className="text-lg font-medium">Deliver to</h5>
              <div className="flex flex-col">
                <div>
                  <label className="text-gray-500">Delivery: </label>
                  <span>{order?.shippingInfo?.delivery}</span>
                </div>
              </div>
              <span className="text-blue-500 cursor-pointer">Open map</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 p-4 bg-white border border-gray-300 rounded-md">
            <div className="grid grid-cols-12 pb-2 text-lg">
              <span className="col-span-6">Product</span>
              <span className="col-span-2">Quantity</span>
              <span className="col-span-2">Unit Price</span>
              <span className="col-span-2">Total</span>
            </div>
            <hr />
            <div>
              {order &&
                order.orderItems &&
                order?.orderItems.map((item, index) => (
                  <ProductOrderItem
                    key={item.product}
                    item={item}
                  ></ProductOrderItem>
                ))}
            </div>
            <div className="grid grid-cols-12 mt-3">
              <div className="col-span-4 col-start-9 text-lg">
                <div className="flex flex-row justify-between w-full">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">
                    ${order?.totalPrice - order?.shippingPrice}
                  </span>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <span className="text-gray-500">Shipping cost</span>
                  <span className="font-medium">${order?.shippingPrice}</span>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <span className="text-gray-500">Total</span>
                  <span className="font-bold font-xl">
                    ${order?.totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 ">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3 p-4 bg-white border border-gray-300 rounded-md">
                <h6 className="text-lg font-medium">Payment info</h6>
                <div className="flex gap-3">
                  {order?.paymentMethod === 'Direct bank transfer' ? (
                    <>
                      <MdCreditCard className="w-6 h-6"></MdCreditCard>
                      <span>{order?.paymentMethod}</span>
                    </>
                  ) : (
                    <>
                      <MdOutlinePinDrop className="w-6 h-6"></MdOutlinePinDrop>
                      <span>{order?.paymentMethod}</span>
                    </>
                  )}
                </div>
                {order?.paymentMethod === 'Direct bank transfer' && (
                  <>
                    <span>ID: {order?.paymentInfo?.id}</span>
                    <span>Status: {order?.paymentInfo?.status}</span>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <h6 className="text-lg font-medium">Notes</h6>
                <div className="p-4 bg-white border border-gray-300 rounded-md">
                  <textarea
                    disabled={true}
                    name=""
                    id=""
                    rows="5"
                    defaultValue={order?.shippingInfo?.note}
                    className="w-full resize-none bg-white"
                    placeholder="Type here"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsAdminPage;

const ProductOrderItem = ({ item }) => {
  const { name, quantity, price } = item;
  return (
    <>
      <div className="grid items-center grid-cols-12 py-3 text-lg">
        <div className="grid grid-cols-12 col-span-6 gap-2">
          <div className="col-span-3">
            <img src={Slider} alt="" className="m-auto w-[70%]" />
          </div>
          <span className="col-span-9 font-medium">{name}</span>
        </div>
        <span className="col-span-2">{quantity}</span>
        <span className="col-span-2">${price}</span>
        <span className="col-span-2">${price * quantity}</span>
      </div>
      <hr />
    </>
  );
};
