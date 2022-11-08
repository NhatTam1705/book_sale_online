import { Checkbox } from '@mui/material';
import { useState } from 'react';
import Button from '../../../../buttons/Button';

const AddressProfile = () => {
  return (
    <div>
      <h3 className="text-4xl font-semibold mb-6">Shipping Address</h3>
      <div>
        <AddressItem></AddressItem>
        <AddressItem></AddressItem>
        <AddressItem></AddressItem>
      </div>
    </div>
  );
};

export default AddressProfile;

const AddressItem = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="p-4 border border-gray-300 text-lg">
      <div className="items-center grid xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-10 sm:grid-cols-12 grid-cols-8">
        <span className="xl:col-span-2 lg:col-span-2 md:col-span-10 sm:col-span-2 col-span-8 font-semibold">Default address: </span>
        <span className="col-span-8">Tan Lan - Can Duoc - Long An</span>
        <Button onClick={() => setShow(true)} className="text-white w-24 col-span-2">
          Edit
        </Button>
      </div>
      {show && (
        <div className="border border-gray-300 mt-4 p-4 flex flex-col gap-3">
          <div className="flex flex-row items-center gap-3">
            <label htmlFor="street">Street: </label>
            <input
              type="text"
              id="street"
              placeholder='...'
              className="p-1 border border-gray-300 w-full indent-2"
            />
          </div>
          <div className="flex flex-row items-center gap-3">
            <label htmlFor="street">Street: </label>
            <input
              type="text"
              id="street"
              placeholder='...'
              className="p-1 border border-gray-300 w-full indent-2"
            />
          </div>
          <div className="flex flex-row items-center gap-3">
            <label htmlFor="street">Street: </label>
            <input
              type="text"
              id="street"
              placeholder='...'
              className="p-1 border border-gray-300 w-full indent-2"
            />
          </div>
          <div className="flex flex-row items-center gap-8">
            <div>
              <Checkbox
                id="default"
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
              <label htmlFor="default">Default address </label>
            </div>
            <Button onClick={() => setShow(false)} className="w-28 text-white">
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
