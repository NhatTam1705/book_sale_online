import { HiOutlinePencilAlt, HiOutlineX } from 'react-icons/hi';
import Button from '../../buttons/Button';

const SignUpForm = ({ onClick, setForm }) => {
  return (
    <>
      <div className="flex flex-row justify-between p-8">
        <div className="flex gap-3 items-center">
          <HiOutlinePencilAlt className="w-6 h-6"></HiOutlinePencilAlt>
          <span className="text-lg font-medium">Create Account</span>
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
        <div className="flex flex-col gap-2">
          <label htmlFor="ConfirmPassword">
            Confirm Password <span className="text-red-600">*</span>
          </label>
          <div>
            <input
              type="password"
              id="ConfirmPassword"
              placeholder="********"
              className="p-2 border border-gray-300 w-full indent-2"
            />
          </div>
        </div>
        <Button className="w-full text-white bg-black py-4">
          Create Account
        </Button>
        <div className="flex flex-row justify-center gap-1">
          <span>Already have an account?</span>
          <span
            onClick={() => setForm('signIn')}
            className="text-red-600 cursor-pointer"
          >
            Login
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
