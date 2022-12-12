import { useState } from 'react';
import { MdOutlineDelete, MdOutlineModeEdit } from 'react-icons/md';
import Author from '../../../../assets/images/Slider_1.png';
import Button from '../../../buttons/Button';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';

const AuthorCardAdmin = ({ author, onClickDelete }) => {
  const { _id, name, introduce, avatar } = author;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="grid grid-rows-6 p-6">
      <img
        src={(avatar && avatar.url) || Author}
        alt="Author Avatar"
        className="w-40 h-40 row-span-3 rounded-full mx-auto object-cover"
      />
      <div className="text-lg row-span-2 grid grid-rows-3">
        <h6 className="row-span-2 font-bold">{name}</h6>
        <h5 className="row-span-1 truncate">{introduce}</h5>
      </div>
      <div className="flex flex-row items-center justify-between row-span-1">
        <Button className="flex items-center gap-2 px-4 py-2 text-black bg-white border-2 border-green-300">
          <MdOutlineModeEdit></MdOutlineModeEdit>
          <span>Edit</span>
        </Button>
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-black bg-white border-2 border-red-300"
        >
          <MdOutlineDelete></MdOutlineDelete>
          <span>Delete</span>
        </Button>
      </div>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        handleComfirm={onClickDelete}
        message="Do you want to delete author?"
      ></ConfirmDialog>
    </div>
  );
};

export const AuthorCardAdminSkeleton = () => {
  return (
    <div className="grid grid-rows-6 p-6">
      <div className="w-40 h-40 row-span-3 rounded-full mx-auto skeleton" />
      <div className="text-lg row-span-2 grid grid-rows-3">
        <div className="row-span-2 skeleton h-14"></div>
        <div className="row-span-1 skeleton h-7"></div>
      </div>
      <div className="flex flex-row items-center justify-between row-span-1">
        <div className="skeleton w-[40%] h-full"></div>
        <div className="skeleton w-[50%] h-full"></div>
      </div>
    </div>
  );
};

export default AuthorCardAdmin;
