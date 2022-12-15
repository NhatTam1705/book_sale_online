import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineUser,
  HiOutlineX,
} from 'react-icons/hi';
import { IoLogoGoogle } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { clearErrors, login } from '../../actions/userActions';
import Button from '../../components/buttons/Button';
import MetaData from '../../components/dialogs/MetaData';

const loginSchema = Yup.object({
  email: Yup.string()
    .required('Please enter your email.')
    .email('Please enter valid email.'),
  password: Yup.string()
    .required('Please enter your password.')
    .min(8, 'Password must be 8 characters'),
});

const SignInPage = () => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  const { isAuthenticated, loading, error, user } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const handleLogin = (data) => {
    const { email, password } = data;
    dispatch(login(email, password));
  };
  const redirect = location.search ? location.search.split('=')[1] : '/home';

  useEffect(() => {
    if (isAuthenticated) {
      if (user.role === 'user') {
        navigate(redirect);
      } else {
        navigate('/admin/dashboard');
      }
      reset();
      // enqueueSnackbar('Login successfully!', { variant: 'success' });
    }

    if (error) {
      setFocus('email');
      enqueueSnackbar(error, { variant: 'warning' });
      reset();
      dispatch(clearErrors());
    }
  }, [
    error,
    isAuthenticated,
    dispatch,
    enqueueSnackbar,
    navigate,
    reset,
    setFocus,
  ]);

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <>
      <MetaData title="Sign In"></MetaData>
      <div className=" max-w-[600px] m-auto my-24 border border-gray-300 rounded-lg">
        <div className="flex flex-row justify-between p-8">
          <div className="flex items-center gap-3">
            <HiOutlineUser className="w-6 h-6"></HiOutlineUser>
            <span className="text-lg font-medium">Account</span>
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
          onSubmit={handleSubmit(handleLogin)}
          autoComplete="off"
          className="flex flex-col gap-5 p-8 text-lg"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email">
              Email <span className="text-red-600">*</span>
            </label>
            <div>
              <input
                name="email"
                {...register('email')}
                id="email"
                type="text"
                placeholder="nntam17052001@gmail.com"
                className="w-full p-2 border border-gray-300 indent-2"
              />
            </div>
            {errors?.email && (
              <div className="text-sm text-red-500">
                {errors.email?.message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">
              Password <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-row border border-gray-300">
              <input
                name="password"
                {...register('password')}
                type={show ? 'text' : 'password'}
                id="password"
                placeholder="********"
                className="w-full p-2 indent-2"
              />
              {getValues('password') &&
                (!show ? (
                  <HiOutlineEye
                    className="w-12 m-auto text-2xl"
                    onClick={() => setShow((prev) => !prev)}
                  ></HiOutlineEye>
                ) : (
                  <HiOutlineEyeOff
                    className="w-12 m-auto text-2xl"
                    onClick={() => setShow((prev) => !prev)}
                  ></HiOutlineEyeOff>
                ))}
            </div>
            {errors?.password && (
              <div className="text-sm text-red-500">
                {errors.password?.message}
              </div>
            )}
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center cursor-pointer">
              <Checkbox
                id="default"
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
              <label htmlFor="default">Remember me</label>
            </div>
            <span
              onClick={() => navigate('/password/forgot')}
              className="underline cursor-pointer"
            >
              Forgot Password?
            </span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            <Button
              type="submit"
              disabled={loading ? true : false}
              className="w-full col-span-6 py-4 text-white"
            >
              Sign In
            </Button>
            <Button className="w-full bg-white border border-black !p-3">
              <IoLogoGoogle className="w-full h-full"></IoLogoGoogle>
            </Button>
          </div>
          <Button
            onClick={() => navigate('/register')}
            className="w-full py-4 text-black bg-white border border-black"
          >
            Create Account
          </Button>
        </form>
      </div>
    </>
  );
};

const FallbackComponent = () => {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this Component
    </p>
  );
};

export default withErrorBoundary(SignInPage, FallbackComponent);
