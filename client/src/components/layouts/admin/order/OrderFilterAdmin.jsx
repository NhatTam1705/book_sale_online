import { Autocomplete, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getUsers } from '../../../../actions/userActions';

const orderStatus = [
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

const OrderFilterAdmin = ({ fallbackFilter }) => {
  const [user, setUser] = useState('');
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { users, error } = useSelector((state) => state.users);
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    dispatch(getUsers('createdDate', 'desc'));
  }, [dispatch, enqueueSnackbar, error]);

  useEffect(() => {
    fallbackFilter(user, status);
  }, [fallbackFilter, status, user]);
  return (
    <>
      <div className="flex flex-col col-span-3 gap-5 p-6 text-lg rounded-lg bg-gray-50">
        <h5 className="text-xl font-medium">Filter</h5>
        {/* <div className="flex flex-col gap-1">
          <label htmlFor="price">Price</label>
          <TextField id="price" className="bg-white" placeholder="$" />
        </div> */}
        <div className="flex flex-col gap-1">
          <label htmlFor="customer">Customer</label>
          <Autocomplete
            options={users || []}
            getOptionLabel={(option) => option.name || ''}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            onChange={(event, value) => {
              setUser(String(value ? value._id : ''));
            }}
            className="bg-white"
            renderInput={(params) => <TextField {...params} label="Customer" />}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="status">Order Status</label>
          <Autocomplete
            id="status"
            options={orderStatus}
            className="w-full bg-white"
            onChange={(event, value) => setStatus('' || value.value)}
            renderInput={(params) => (
              <TextField {...params} label="Order Status" />
            )}
          />
        </div>
        {/* <div className="flex flex-col gap-1">
          <label htmlFor="total">Total</label>
          <TextField id="total" className="bg-white" placeholder="$" />
        </div> */}
        {/* <div className="flex flex-col gap-1">
          <label htmlFor="date">Date</label>
          <TextField
            id="date"
            type="date"
            className="bg-white"
          />
        </div> */}
        {/* <Button className="text-white bg-black ">Filter</Button> */}
      </div>
    </>
  );
};

export default OrderFilterAdmin;
