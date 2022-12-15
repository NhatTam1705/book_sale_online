import { useSnackbar } from 'notistack';
import { HiOutlineQuestionMarkCircle, HiOutlineX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '../../components/buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { display } from '@mui/system';
import { clearErrors, forgotPassword } from '../../actions/userActions';
import MetaData from '../../components/dialogs/MetaData';

const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .required('Please enter your email.')
    .email('Please enter valid email.'),
});

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  const handleForgotPassword = (data) => {
    dispatch(forgotPassword(data));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (message) {
      enqueueSnackbar(message, { variant: 'success' });
    }
  }, [dispatch, enqueueSnackbar, error, message]);

  return (
    <>
      <MetaData title="Forgot Password"></MetaData>
      <div className=" max-w-[600px] m-auto my-24 border border-gray-300 rounded-lg">
        <div className="flex flex-row justify-between p-8">
          <div className="flex gap-3 items-center">
            <HiOutlineQuestionMarkCircle className="w-6 h-6"></HiOutlineQuestionMarkCircle>
            <span className="text-lg font-medium">Forgot Password</span>
          </div>
          <div
            onClick={() => navigate('/home')}
            className="flex gap-2 items-center text-gray-500 cursor-pointer hover:text-orange-600"
          >
            <span className="text-base">Close</span>
            <HiOutlineX className="w-5 h-5"></HiOutlineX>
          </div>
        </div>
        <hr />
        <form
          autoComplete="off"
          onSubmit={handleSubmit(handleForgotPassword)}
          className="flex flex-col gap-5 p-8 text-lg"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email">
              Email <span className="text-red-600">*</span>
            </label>
            <div>
              <input
                id="email"
                type="text"
                name="email"
                {...register('email')}
                placeholder="nntam17052001@gmail.com"
                className="p-2 border border-gray-300 w-full indent-2"
              />
            </div>
            {errors?.email && (
              <div className="text-sm text-red-500">
                {errors.email?.message}
              </div>
            )}
          </div>
          <Button type="submit" className="w-full text-white bg-black py-4">
            Recover Password
          </Button>
          <div className="flex flex-row justify-center gap-1">
            <span>Remember your password?</span>
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

export default ForgotPasswordPage;
