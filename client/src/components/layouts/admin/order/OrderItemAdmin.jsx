import { IconButton } from '@mui/material';
import {
  MdOutlineDelete,
  MdOutlineModeEdit,
  MdOutlineRemoveRedEye,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const OrderItemAdmin = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid items-center grid-cols-12 py-3 bg-white hover:bg-gray-50">
        <span className="col-span-1">123</span>
        <span className="col-span-4 font-medium">Old man dev</span>
        <span className="col-span-1">$17</span>
        <div className="col-span-2">
          <span className="px-4 py-1 text-base font-medium text-orange-400 bg-orange-100 rounded-3xl">
            Pending
          </span>
        </div>
        <span className="col-span-2">17/05/2001</span>
        <div className="grid grid-cols-3 col-span-2 gap-2">
          <IconButton
            className="col-span-1"
            onClick={() => navigate('/admin/order/123')}
          >
            <MdOutlineRemoveRedEye></MdOutlineRemoveRedEye>
          </IconButton>
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

export default OrderItemAdmin;
