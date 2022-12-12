import { Autocomplete, IconButton, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import {
  MdOutlineDelete,
  MdOutlineModeEdit,
  MdOutlineRemoveRedEye,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, updateOrder } from '../../../../actions/orderActions';
import { UPDATE_ORDER_RESET } from '../../../../constants/orderConstants';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';

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

const OrderItemAdmin = ({ order, onClickDelete }) => {
  const { _id, user, totalPrice, orderStatus, createdDate } = order;
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { error, isUpdated } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, enqueueSnackbar, error, isUpdated]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="grid items-center grid-cols-12 py-3 bg-white hover:bg-gray-50">
        <span className="col-span-1">
          {String(_id).substring(String(_id).length - 3, String(_id).length)}
        </span>
        <span className="col-span-4 font-medium">{user.name}</span>
        <span className="col-span-1">${totalPrice}</span>
        <div className="col-span-2">
          <Autocomplete
            options={status}
            disabled={disabled}
            className="bg-white w-full pr-2"
            defaultValue={orderStatus}
            onChange={(event, value) => {
              dispatch(
                updateOrder(_id, {
                  status: (value && value.value) || orderStatus,
                })
              );
            }}
            renderInput={(params) => (
              <TextField {...params} size="small" label={orderStatus} />
            )}
          />
        </div>
        <span className="col-span-2">
          {String(createdDate).substring(0, 10).split('-').reverse().join('-')}
        </span>
        <div className="grid grid-cols-3 col-span-2 gap-2">
          <IconButton
            className="col-span-1"
            onClick={() => navigate(`/admin/order/${_id}`)}
          >
            <MdOutlineRemoveRedEye></MdOutlineRemoveRedEye>
          </IconButton>
          <IconButton
            onClick={() => setDisabled((pre) => !pre)}
            className="col-span-1"
          >
            <MdOutlineModeEdit></MdOutlineModeEdit>
          </IconButton>
          <IconButton onClick={() => setOpen(true)} className="col-span-1">
            <MdOutlineDelete></MdOutlineDelete>
          </IconButton>
        </div>
      </div>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        handleComfirm={onClickDelete}
        message="Do you want to delete order?"
      ></ConfirmDialog>
      <hr />
    </>
  );
};

export const OrderItemAdminSkeleton = () => {
  return (
    <>
      <div className="grid items-center grid-cols-12 py-3 bg-white hover:bg-gray-50">
        <div className="col-span-1 skeleton w-5 h-7"></div>
        <div className="col-span-4 w-48 h-7 skeleton"></div>
        <div className="col-span-1 w-10 h-7 skeleton"></div>
        <div className="col-span-2 h-7 w-28 skeleton"></div>
        <div className="col-span-2 w-24 h-7 skeleton"></div>
        <div className="grid grid-cols-3 col-span-2 gap-2">
          <div className="col-span-1 rounded-full h-10 w-10 skeleton"></div>
          <div className="col-span-1 rounded-full h-10 w-10 skeleton"></div>
          <div className="col-span-1 rounded-full h-10 w-10 skeleton"></div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default OrderItemAdmin;
