import { Autocomplete, TextField } from '@mui/material';
import {
  MdCreditCard,
  MdOutlineDateRange,
  MdOutlineLocalPrintshop,
  MdOutlineLocationOn,
  MdOutlinePersonOutline,
} from 'react-icons/md';
import Slider from '../../../assets/images/Slider_1.png';
import Button from '../../../components/buttons/Button';

const status = [
  {
    label: 'Status 1',
    value: 1,
  },
  {
    label: 'Status 2',
    value: 2,
  },
  {
    label: 'Status 3',
    value: 3,
  },
  {
    label: 'Status 4',
    value: 4,
  },
];

const OrderDetailsAdminPage = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-between mb-6">
        <h5 className="text-3xl font-medium">Order details</h5>
      </div>
      <div className="flex flex-col gap-6 p-6 rounded-lg bg-gray-50">
        <div className="flex flex-row justify-between w-full">
          <div className="grid grid-cols-12">
            <MdOutlineDateRange className="w-8 h-8 col-span-2 "></MdOutlineDateRange>
            <div className="flex flex-col col-span-10">
              <span className="text-lg font-medium">
                Wed, Aug 13, 2020, 4:24PM
              </span>
              <span className="text-base text-gray-500">#ID 19110313</span>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2 w-[450px]">
            <Autocomplete
              id="status"
              options={status}
              className="w-full col-span-6"
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Change status"
                  className="bg-white"
                />
              )}
            />
            <Button className="col-span-4 text-black bg-white border border-gray-300">
              Save
            </Button>
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
                <span>Old man dev</span>
                <span>oldmandev@gmail.com</span>
                <span>0334193816</span>
              </div>
              <span className="text-blue-500 cursor-pointer">View profile</span>
            </div>
          </div>
          <div className="grid grid-cols-12 col-span-6">
            <MdOutlineLocationOn className="w-16 h-16 col-span-2 p-3 bg-white rounded-full"></MdOutlineLocationOn>
            <div className="flex flex-col col-span-10 gap-1">
              <h5 className="text-lg font-medium">Deliver to</h5>
              <div className="flex flex-col">
                <div>
                  <label className="text-gray-500">City: </label>
                  <span>Long An</span>
                </div>
                <div>
                  <label className="text-gray-500">Street: </label>
                  <span>19/5</span>
                </div>
                <div>
                  <label className="text-gray-500">Address: </label>
                  <span>Can Duoc</span>
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
              <ProductOrderItem></ProductOrderItem>
              <ProductOrderItem></ProductOrderItem>
              <ProductOrderItem></ProductOrderItem>
            </div>
            <div className="grid grid-cols-12 mt-3">
              <div className="col-span-4 col-start-9 text-lg">
                <div className="flex flex-row justify-between w-full">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">$11</span>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <span className="text-gray-500">Shipping cost</span>
                  <span className="font-medium">$6</span>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <span className="text-gray-500">Total</span>
                  <span className="font-bold font-xl">$17</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 ">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3 p-4 bg-white border border-gray-300 rounded-md">
                <h6 className="text-lg font-medium">Payment info</h6>
                <div className="flex gap-3">
                  <MdCreditCard className="w-6 h-6"></MdCreditCard>
                  <span>Master Card</span>
                </div>
                <span>Business name:</span>
                <span>Phone:</span>
              </div>
              <div className="flex flex-col gap-3">
                <h6 className="text-lg font-medium">Notes</h6>
                <div className="p-4 bg-white border border-gray-300 rounded-md">
                  <textarea
                    name=""
                    id=""
                    rows="5"
                    className="w-full resize-none"
                    placeholder="Type here"
                  ></textarea>
                </div>
                <Button className="text-white bg-black">Save note</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsAdminPage;

const ProductOrderItem = () => {
  return (
    <>
      <div className="grid items-center grid-cols-12 py-3 text-lg">
        <div className="grid grid-cols-12 col-span-6 gap-2">
          <div className="col-span-3">
            <img src={Slider} alt="" className="m-auto w-[70%]" />
          </div>
          <span className="col-span-9 font-medium">Old man dev</span>
        </div>
        <span className="col-span-2">2</span>
        <span className="col-span-2">$11</span>
        <span className="col-span-2">$22</span>
      </div>
      <hr />
    </>
  );
};
