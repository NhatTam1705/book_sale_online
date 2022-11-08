import React from 'react';

const BillingDetailsCheckout = () => {
  return (
    <div className="flex flex-col gap-6 p-5 bg-white">
      <h5 className="text-xl font-semibold">Billing Details</h5>
      <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="col-span-1">
          <h6 className="text-lg">
            First name <span className="text-xl font-bold text-red-600">*</span>
          </h6>
          <input
            type="text"
            name=""
            id=""
            className="w-full p-3 mt-2 border border-gray-300"
          />
        </div>
        <div className="col-span-1">
          <h6 className="text-lg">
            Last name <span className="text-xl font-bold text-red-600">*</span>
          </h6>
          <input
            type="text"
            name=""
            id=""
            className="w-full p-3 mt-2 border border-gray-300"
          />
        </div>
      </div>
      <div className="">
        <h6 className="text-lg">Company name</h6>
        <input
          type="text"
          name=""
          id=""
          className="w-full p-3 mt-2 border border-gray-300"
        />
      </div>
      <div className="">
        <h6 className="text-lg">
          Phone number <span className="text-xl font-bold text-red-600">*</span>
        </h6>
        <input
          type="text"
          name=""
          id=""
          className="w-full p-3 mt-2 border border-gray-300"
        />
      </div>
      <div className="">
        <h6 className="text-lg">
          Email address{' '}
          <span className="text-xl font-bold text-red-600">*</span>
        </h6>
        <input
          type="text"
          name=""
          id=""
          className="w-full p-3 mt-2 border border-gray-300"
        />
      </div>
      <div className="">
        <h6 className="text-lg">
          Delivery address{' '}
          <span className="text-xl font-bold text-red-600">*</span>
        </h6>
        <input
          type="text"
          name=""
          id=""
          className="w-full p-3 mt-2 border border-gray-300"
        />
      </div>
      <h5 className="mt-8 text-xl font-semibold">Additional informations</h5>
      <h6 className="text-lg">Order notes (optional)</h6>
      <div className="mt-2 border border-gray-300">
        <textarea
          name="content"
          id=""
          cols="30"
          rows="7"
          placeholder="Notes about your order, e.g. special notes for delivery."
          className="w-full p-4 resize-none"
        ></textarea>
      </div>
    </div>
  );
};

export default BillingDetailsCheckout;
