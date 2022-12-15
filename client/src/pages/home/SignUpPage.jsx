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
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { clearErrors, register } from '../../actions/userActions';
import Button from '../../components/buttons/Button';
import MetaData from '../../components/dialogs/MetaData';

const registerSchema = Yup.object({
  name: Yup.string().required('Please enter your name'),
  email: Yup.string()
    .required('Please enter your email.')
    .email('Please enter valid email.'),
  password: Yup.string()
    .required('Please enter your password.')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: Yup.string()
    .required('Please enter your confirm password.')
    .min(8, 'Confirm password must be more than 8 characters')
    .max(32, 'Confirm password must be less than 32 characters'),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const {
    register: registerForm,
    handleSubmit,
    reset,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
      reset();
      enqueueSnackbar('Register and login successfully!', {
        variant: 'success',
      });
    }

    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
  }, [error, dispatch, enqueueSnackbar, reset, navigate, isAuthenticated]);

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const handleRegister = (data) => {
    const { name, email, password, confirmPassword } = data;
    dispatch(register(name, email, password, confirmPassword));
  };

  return (
    <>
      <MetaData title="Sign Up"></MetaData>
      <div className=" max-w-[600px] m-auto my-24 border border-gray-300 rounded-lg">
        <div className="flex flex-row justify-between p-8">
          <div className="flex items-center gap-3">
            <HiOutlinePencilAlt className="w-6 h-6"></HiOutlinePencilAlt>
            <span className="text-lg font-medium">Create Account</span>
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
          onSubmit={handleSubmit(handleRegister)}
          autoComplete="off"
          className="flex flex-col gap-5 p-8 text-lg"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name">
              Name <span className="text-red-600">*</span>
            </label>
            <div>
              <input
                id="name"
                name="name"
                {...registerForm('name')}
                type="text"
                placeholder="Old man dev"
                className="w-full p-2 border border-gray-300 indent-2"
              />
            </div>
            {errors?.name && (
              <div className="text-sm text-red-500">{errors.name?.message}</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">
              Email <span className="text-red-600">*</span>
            </label>
            <div>
              <input
                id="email"
                type="email"
                name="email"
                {...registerForm('email')}
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
                {...registerForm('password')}
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
                {...registerForm('confirmPassword')}
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
          <Button
            type="submit"
            disabled={loading ? true : false}
            className="w-full py-4 text-white bg-black"
          >
            Create Account
          </Button>
          <div className="flex flex-row justify-center gap-1">
            <span>Already have an account?</span>
            <span
              onClick={() => navigate('/login')}
              className="text-red-600 cursor-pointer"
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

const FallbackComponent = () => {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  );
};

export default withErrorBoundary(SignUpPage, FallbackComponent);
