import { TextField } from '@mui/material';
import React from 'react';
import Avatar from '../../../assets/images/Slider_1.png';
import OrderItemCustomerAdmin from '../../../components/layouts/admin/customer/OrderItemCustomerAdmin';

const CustomerProfileAdmin = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-row items-center justify-between mb-6">
          <h5 className="text-3xl font-medium">Customer Profile</h5>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg grid grid-cols-12 gap-6">
          <div className="col-span-8 flex flex-col gap-4 text-lg">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6 flex flex-col gap-1">
                <label>First name</label>
                <TextField disabled className="bg-white" value="Nhat Tam" />
              </div>
              <div className="col-span-6 flex flex-col gap-1">
                <label>Last name</label>
                <TextField disabled className="bg-white" value="Nguyen" />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6 flex flex-col gap-1">
                <label>Phone</label>
                <TextField disabled className="bg-white" value="0334193816" />
              </div>
              <div className="col-span-6 flex flex-col gap-1">
                <label>Gender</label>
                <TextField disabled className="bg-white" value="Male" />
              </div>
            </div>
            <div className="col-span-6 flex flex-col gap-1">
              <label>Email</label>
              <TextField
                disabled
                className="bg-white"
                value="oldmandev@gmail.com"
              />
            </div>
          </div>
          <div className="col-span-4">
            <img
              src={Avatar}
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
                <span className="text-2xl font-bold">11</span>
              </div>
              <div className="col-span-6 rounded-lg h-full border border-gray-300 shadow-md bg-white flex-col flex items-center justify-center">
                <h6 className="text-xl font-medium">Total Money</h6>
                <span className="text-2xl font-bold">$17</span>
              </div>
            </div>
            <hr className="my-6" />
          </div>
        </div>
        <div className="col-span-6">
          <h6 className="text-2xl font-medium mb-6">Order Customer</h6>
          <div className="bg-gray-50 rounded-lg p-6 text-lg">
            <div className="grid grid-cols-12 pb-2">
              <span className="col-span-2">ID</span>
              <span className="col-span-2">Price</span>
              <span className="col-span-2">Status</span>
              <span className="col-span-3">Date</span>
              <span className="col-span-3">Action</span>
            </div>
            <hr />
            <div>
              <OrderItemCustomerAdmin></OrderItemCustomerAdmin>
              <OrderItemCustomerAdmin></OrderItemCustomerAdmin>
              <OrderItemCustomerAdmin></OrderItemCustomerAdmin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerProfileAdmin;
