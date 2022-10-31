import { Checkbox } from '@mui/material';
import { HiOutlineUser, HiOutlineX } from 'react-icons/hi';
import { IoLogoGoogle } from 'react-icons/io5';
import Button from '../../buttons/Button';

const SignInForm = ({ onClick, setForm }) => {
  return (
    <>
      <div className="flex flex-row justify-between p-8">
        <div className="flex gap-3 items-center">
          <HiOutlineUser className="w-6 h-6"></HiOutlineUser>
          <span className="text-lg font-medium">Account</span>
        </div>
        <div
          className="flex gap-2 items-center text-gray-500 cursor-pointer hover:text-orange-600"
          onClick={onClick}
        >
          <span className="text-base">Close</span>
          <HiOutlineX className="w-5 h-5"></HiOutlineX>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-5 p-8 text-lg">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">
            Email <span className="text-red-600">*</span>
          </label>
          <div>
            <input
              id="email"
              type="text"
              placeholder="nntam17052001@gmail.com"
              className="p-2 border border-gray-300 w-full indent-2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">
            Password <span className="text-red-600">*</span>
          </label>
          <div>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="p-2 border border-gray-300 w-full indent-2"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center cursor-pointer">
            <Checkbox
              id="default"
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            />
            <label htmlFor="default">Remember me</label>
          </div>
          <span
            onClick={() => setForm('forgotForm')}
            className="underline cursor-pointer"
          >
            Forgot Password?
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          <Button className="w-full text-white py-4 col-span-6">Sign In</Button>
          <Button className="w-full bg-white border border-black !p-3">
            <IoLogoGoogle className="w-full h-full"></IoLogoGoogle>
          </Button>
        </div>
        <Button
          className="w-full text-black bg-white border border-black py-4"
          onClick={() => setForm('signUp')}
        >
          Create Account
        </Button>
      </div>
    </>
  );
};

export default SignInForm;
