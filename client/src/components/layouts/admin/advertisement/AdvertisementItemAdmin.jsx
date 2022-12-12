import { IconButton } from '@mui/material';
import { useState } from 'react';
import { MdOutlineDelete, MdOutlineModeEdit } from 'react-icons/md';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';

const AdvertisementItemAdmin = ({
  advertisement,
  onClickUpdate,
  onClickDelete,
}) => {
  const { _id, name, description, image } = advertisement;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="grid items-center grid-cols-9 gap-2 py-3 bg-white hover:bg-gray-50">
        <img className=" col-span-2 h-20" src={image.url} alt={name}></img>
        <span className="col-span-3 font-medium ">{name}</span>
        <span className="col-span-3">{description}</span>
        <div className="grid grid-cols-2 col-span-1">
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

export const AdvertisementItemAdminSkeleton = () => {
  return (
    <>
      <div className="grid items-center grid-cols-9 py-3 bg-white hover:bg-gray-50 cursor-pointer">
        <div className="col-span-2 skeleton w-32 h-20"></div>
        <div className="col-span-3 skeleton w-32 h-7"></div>
        <div className="col-span-3 skeleton w-36 h-7"></div>
        <div className="grid grid-cols-2 col-span-1 gap-2">
          <div className="col-span-1 rounded-full w-10 h-10 skeleton"></div>
          <div className="col-span-1 rounded-full w-10 h-10 skeleton"></div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default AdvertisementItemAdmin;
