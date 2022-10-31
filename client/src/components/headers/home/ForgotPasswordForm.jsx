import { HiOutlineQuestionMarkCircle, HiOutlineX } from 'react-icons/hi';
import Button from '../../buttons/Button';

const ForgotPasswordForm = ({ onClick, setForm }) => {
  return (
    <>
      <div className="flex flex-row justify-between p-8">
        <div className="flex gap-3 items-center">
          <HiOutlineQuestionMarkCircle className="w-6 h-6"></HiOutlineQuestionMarkCircle>
          <span className="text-lg font-medium">Forgot Password</span>
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
        <Button className="w-full text-white bg-black py-4">
          Recover Password
        </Button>
        <div className="flex flex-row justify-center gap-1">
          <span>Remember your password?</span>
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

export default ForgotPasswordForm;
