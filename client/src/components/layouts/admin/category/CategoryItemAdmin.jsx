import { IconButton } from '@mui/material';
import { MdOutlineDelete, MdOutlineModeEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const CategoryItemAdmin = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid items-center grid-cols-12 py-3 bg-white hover:bg-gray-50 cursor-pointer">
        <span className="col-span-2">123</span>
        <span className="col-span-7 font-medium">Old man dev</span>
        <span className="col-span-1">17</span>
        <div className="grid grid-cols-2 col-span-2 gap-4">
          <IconButton className="col-span-1">
            <MdOutlineModeEdit></MdOutlineModeEdit>
          </IconButton>
          <IconButton className="col-span-1">
            <MdOutlineDelete></MdOutlineDelete>
          </IconButton>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CategoryItemAdmin;
