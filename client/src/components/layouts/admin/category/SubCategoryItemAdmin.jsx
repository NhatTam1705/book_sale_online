import { IconButton } from '@mui/material';
import { useState } from 'react';
import { MdOutlineDelete, MdOutlineModeEdit } from 'react-icons/md';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';

const SubCategoryItemAdmin = ({
  subCategory,
  index,
  onClickDelete,
  onClickUpdate,
}) => {
  const { _id, name } = subCategory;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="grid items-center grid-cols-12 py-3 bg-white hover:bg-gray-50 ">
        <span className="col-start-2 col-span-2">{index + 1}</span>
        <span className="col-span-6 font-medium cursor-pointer">{name}</span>
        <div className="grid grid-cols-2 col-span-2 gap-2">
          <IconButton onClick={onClickUpdate} className="col-span-1">
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
        message="Do you want to delete sub category?"
      ></ConfirmDialog>
      <hr />
    </>
  );
};

export const SubCategoryItemAdminSkeleton = () => {
  return (
    <>
      <div className="grid items-center grid-cols-12 py-3 bg-white hover:bg-gray-50 cursor-pointer">
        <div className="col-start-2 col-span-2 skeleton w-3 h-7"></div>
        <div className="col-span-6 skeleton w-40 h-7"></div>
        <div className="grid grid-cols-2 col-span-2 gap-2">
          <div className="col-span-1 rounded-full w-10 h-10 skeleton"></div>
          <div className="col-span-1 rounded-full w-10 h-10 skeleton"></div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default SubCategoryItemAdmin;
