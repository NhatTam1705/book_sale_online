import { IconButton } from '@mui/material';
import { useState } from 'react';
import { MdOutlineDelete, MdOutlineModeEdit } from 'react-icons/md';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';

const DiscountItemAdmin = ({ discount, onClickUpdate, onClickDelete }) => {
  const { _id, name, percent } = discount;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="grid items-center grid-cols-12 py-3 bg-white hover:bg-gray-50">
        <span className=" col-span-2">
          {String(_id).substring(String(_id).length - 8, String(_id).length)}
        </span>
        <span className="col-span-5 font-medium ">{name}</span>
        <span className="col-span-3">{percent} %</span>
        <div className="grid grid-cols-2 col-span-2 gap-4 px-3">
          <IconButton onClick={onClickUpdate} className="col-span-1">
            <MdOutlineModeEdit></MdOutlineModeEdit>
          </IconButton>
          <IconButton onClick={() => setOpen(true)} className="col-span-1">
            <MdOutlineDelete></MdOutlineDelete>
          </IconButton>
        </div>
      </div>
      <ConfirmDialog
        handleClose={handleClose}
        open={open}
        handleComfirm={onClickDelete}
        message="Do you wan to delete discount?"
      ></ConfirmDialog>
      <hr />
    </>
  );
};

export const DiscountItemAdminSkeleton = () => {
  return (
    <>
      <div className="grid items-center grid-cols-12 py-3 bg-white hover:bg-gray-50 cursor-pointer">
        <div className="col-span-2 skeleton w-10 h-7"></div>
        <div className="col-span-5 skeleton w-40 h-7"></div>
        <div className="col-span-3 skeleton w-20 h-7"></div>
        <div className="grid grid-cols-2 col-span-2 gap-2">
          <div className="col-span-1 rounded-full w-10 h-10 skeleton"></div>
          <div className="col-span-1 rounded-full w-10 h-10 skeleton"></div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default DiscountItemAdmin;
