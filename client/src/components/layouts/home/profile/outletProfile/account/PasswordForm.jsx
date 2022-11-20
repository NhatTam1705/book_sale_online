import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UPDATE_PASSWORD_RESET } from '../../../../../../constants/userConstants';
import {
  clearErrors,
  updatePassword,
} from './../../../../../../actions/userActions';
import Button from './../../../../../buttons/Button';

const passwordSchema = Yup.object({
  oldPassword: Yup.string()
    .required('Please enter your old password.')
    .min(8, 'Old password must be more than 8 characters')
    .max(32, 'Old password must be less than 32 characters'),
  password: Yup.string()
    .required('Please enter your password.')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: Yup.string()
    .required('Please enter your confirm password.')
    .min(8, 'Confirm password must be more than 8 characters')
    .max(32, 'Confirm password must be less than 32 characters'),
});

const PasswordForm = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { errorPassword, isUpdatedPassword, loading } = useSelector(
    (state) => state.user
  );
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit: handleSubmitPassword,
    register: registerPassword,
    formState: { errors: errorsPassword },
    getValues: getValuesPassword,
    reset,
  } = useForm({
    defaultValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(passwordSchema),
    mode: 'onChange',
  });

  const handleUpdatePassword = (data) => {
    dispatch(updatePassword(data));
  };

  useEffect(() => {
    if (errorPassword) {
      enqueueSnackbar(errorPassword, { variant: 'error' });
      dispatch(clearErrors());
    }
    if (isUpdatedPassword) {
      enqueueSnackbar('User updated successfully', { variant: 'success' });
      reset();
      // dispatch(loadUser());

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [
    dispatch,
    enqueueSnackbar,
    errorPassword,
    isUpdatedPassword,
    navigate,
    reset,
  ]);

  return (
    <form
      onSubmit={handleSubmitPassword(handleUpdatePassword)}
      autoComplete="off"
    >
      <h4 className="text-3xl">Password Change</h4>
      <div className="grid grid-cols-6 gap-8 mt-3 text-lg xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-12">
        <div className="flex flex-col col-span-6 gap-2">
          <label htmlFor="oldPassword">
            Old Password <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-row border border-gray-300">
            <input
              name="oldPassword"
              {...registerPassword('oldPassword')}
              type={showOldPassword ? 'text' : 'password'}
              id="oldPassword"
              placeholder="********"
              className="w-full p-2 indent-2"
            />
            {getValuesPassword('oldPassword') &&
              (!showOldPassword ? (
                <HiOutlineEye
                  className="w-12 m-auto text-2xl"
                  onClick={() => setShowOldPassword((prev) => !prev)}
                ></HiOutlineEye>
              ) : (
                <HiOutlineEyeOff
                  className="w-12 m-auto text-2xl"
                  onClick={() => setShowOldPassword((prev) => !prev)}
                ></HiOutlineEyeOff>
              ))}
          </div>
          {errorsPassword?.oldPassword && (
            <div className="text-sm text-red-500">
              {errorsPassword.oldPassword?.message}
            </div>
          )}
        </div>
        <div className="flex flex-col col-span-6 gap-2">
          <label htmlFor="password">
            New Password <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-row border border-gray-300">
            <input
              name="password"
              {...registerPassword('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="********"
              className="w-full p-2 indent-2"
            />
            {getValuesPassword('password') &&
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
          {errorsPassword?.password && (
            <div className="text-sm text-red-500">
              {errorsPassword.password?.message}
            </div>
          )}
        </div>
        <div className="flex flex-col col-span-6 gap-2">
          <label htmlFor="confirmPassword">
            Comfirm Password <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-row border border-gray-300">
            <input
              name="confirmPassword"
              {...registerPassword('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="********"
              className="w-full p-2 indent-2"
            />
            {getValuesPassword('confirmPassword') &&
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
          {errorsPassword?.confirmPassword && (
            <div className="text-sm text-red-500">
              {errorsPassword.confirmPassword?.message}
            </div>
          )}
        </div>
        <div className="col-span-6"></div>
        <Button type="submit" className="text-white col-span-3">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default PasswordForm;
