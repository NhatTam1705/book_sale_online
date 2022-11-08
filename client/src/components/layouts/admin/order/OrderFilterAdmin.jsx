import { Autocomplete, TextField } from '@mui/material';
import Button from '../../../buttons/Button';

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

const OrderFilterAdmin = () => {
  return (
    <>
      <div className="flex flex-col col-span-3 gap-5 p-6 text-lg rounded-lg bg-gray-50">
        <h5 className="text-xl font-medium">Filter</h5>
        <div className="flex flex-col gap-1">
          <label htmlFor="price">Price</label>
          <TextField id="price" className="bg-white" placeholder="$" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="customer">Customer</label>
          <TextField
            id="customer"
            className="bg-white"
            placeholder="Old man dev"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="status">Order Status</label>
          <Autocomplete
            id="status"
            options={status}
            className="w-full bg-white"
            renderInput={(params) => (
              <TextField {...params} placeholder="Active" />
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="total">Total</label>
          <TextField id="total" className="bg-white" placeholder="$" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="date">Date</label>
          <TextField
            id="date"
            type="date"
            className="bg-white"
          />
        </div>
        <Button className='text-white bg-black '>Filter</Button>
      </div>
    </>
  );
};

export default OrderFilterAdmin;
