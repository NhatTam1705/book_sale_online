import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlinePencilAlt,
  HiOutlineX,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { clearErrors, resetPassword } from '../../actions/userActions';
import Button from '../../components/buttons/Button';
import { FaRegKeyboard } from 'react-icons/fa';

const recoverPasswordSchema = Yup.object({
  password: Yup.string()
    .required('Please enter your password.')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: Yup.string()
    .required('Please enter your confirm password.')
    .min(8, 'Confirm password must be more than 8 characters')
    .max(32, 'Confirm password must be less than 32 characters'),
});

const RecoverPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { error, success } = useSelector((state) => state.forgotPassword);
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(recoverPasswordSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (success) {
      navigate('/login');
      reset();
      enqueueSnackbar('Recover password successfully!', {
        variant: 'success',
      });
    }

    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
  }, [error, dispatch, enqueueSnackbar, reset, navigate, success]);

  useEffect(() => {
    setFocus('password');
  }, [setFocus]);

  const handleResetPassword = (data) => {
    dispatch(resetPassword(token, data));
  };

  return (
    <div className=" max-w-[600px] m-auto my-24 border border-gray-300 rounded-lg">
      <div className="flex flex-row justify-between p-8">
        <div className="flex items-center gap-3">
          <FaRegKeyboard className="w-6 h-6"></FaRegKeyboard>
          <span className="text-lg font-medium">Recover Password</span>
        </div>
        <div
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-orange-600"
        >
          <span className="text-base">Close</span>
          <HiOutlineX className="w-5 h-5"></HiOutlineX>
        </div>
      </div>
      <hr />
      <form
        onSubmit={handleSubmit(handleResetPassword)}
        autoComplete="off"
        className="flex flex-col gap-5 p-8 text-lg"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="password">
            Password <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-row border border-gray-300">
            <input
              name="password"
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="********"
              className="w-full p-2 indent-2"
            />
            {getValues('password') &&
              (!showPassword ? (
                <HiOutlineEye
                  className="w-12 m-auto text-2xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                ></HiOutlineEye>
              ) : (
                <HiOutlineEyeOff
                  className="w-12 m-auto text-2xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                ></HiOutlineEyeOff>
              ))}
          </div>
          {errors?.password && (
            <div className="text-sm text-red-500">
              {errors.password?.message}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">
            Confirm Password <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-row border border-gray-300">
            <input
              name="confirmPassword"
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="********"
              className="w-full p-2 indent-2"
            />
            {getValues('confirmPassword') &&
              (!showConfirmPassword ? (
                <HiOutlineEye
                  className="w-12 m-auto text-2xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                ></HiOutlineEye>
              ) : (
                <HiOutlineEyeOff
                  className="w-12 m-auto text-2xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                ></HiOutlineEyeOff>
              ))}
          </div>
          {errors?.confirmPassword && (
            <div className="text-sm text-red-500">
              {errors.confirmPassword?.message}
            </div>
          )}
        </div>
        <Button type="submit" className="w-full py-4 text-white bg-black">
          Save Password
        </Button>
      </form>
    </div>
  );
};

const FallbackComponent = () => {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  );
};

export default withErrorBoundary(RecoverPasswordPage, FallbackComponent);
