import { TextField } from '@mui/material';
import Avatar from '../../../assets/images/Slider_1.png';

const AddAuthorPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-row items-center justify-between mb-6">
        <h5 className="text-3xl font-medium">Add Author</h5>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg grid grid-cols-12 gap-6">
        <div className="col-span-8 flex flex-col gap-4 text-lg">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6 flex flex-col gap-1">
              <label>First name</label>
              <TextField disabled className="bg-white" value="Nhat Tam" />
            </div>
            <div className="col-span-6 flex flex-col gap-1">
              <label>Last name</label>
              <TextField disabled className="bg-white" value="Nguyen" />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6 flex flex-col gap-1">
              <label>Phone</label>
              <TextField disabled className="bg-white" value="0334193816" />
            </div>
            <div className="col-span-6 flex flex-col gap-1">
              <label>Gender</label>
              <TextField disabled className="bg-white" value="Male" />
            </div>
          </div>
          <div className="col-span-6 flex flex-col gap-1">
            <label>Email</label>
            <TextField
              disabled
              className="bg-white"
              value="oldmandev@gmail.com"
            />
          </div>
        </div>
        <div className="col-span-4">
          <img src={Avatar} alt="" className="w-44 h-44 rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default AddAuthorPage;
