import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import DefaultAvatar from '../../../../../../assets/images/default_avatar.png';
import {
  clearErrors,
  updateProfile,
} from './../../../../../../actions/userActions';
import { UPDATE_PROFILE_RESET } from './../../../../../../constants/userConstants';
import Button from './../../../../../buttons/Button';
const profileSchema = Yup.object({
  name: Yup.string().required('Please enter your name'),
  gender: Yup.string(),
  birthday: Yup.string(),
  phone: Yup.string(),
  avatar: Yup.string(),
});

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { errorProflie, isUpdatedProfile, loading } = useSelector(
    (state) => state.user
  );
  const [avatarReview, setAvatarReview] = useState(DefaultAvatar);
  const inputRef = useRef();
  const [change, setChange] = useState(true);

  const [formProfile, setFormProfile] = useState({
    name: user && user.name,
    gender: user && user.gender,
    birthday: user && user.birthday,
    phone: user && user.phone,
    avatar: '',
  });

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarReview(reader.result);
          setFormProfile({ ...formProfile, [e.target.name]: reader.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFormProfile({ ...formProfile, [e.target.name]: e.target.value });
    }
    setChange(false);
  };

  const { handleSubmit, register } = useForm({
    defaultValues: formProfile,
    resolver: yupResolver(profileSchema),
    mode: 'onChange',
  });

  const hanldeUpdateProfile = () => {
    dispatch(updateProfile(formProfile));
  };

  useEffect(() => {
    if (user && user.avatar.url !== null) {
      setAvatarReview(user.avatar.url);
    }
    if (errorProflie) {
      enqueueSnackbar(errorProflie, { variant: 'error' });
      dispatch(clearErrors());
    }
    if (isUpdatedProfile) {
      enqueueSnackbar('User updated successfully', { variant: 'success' });
      // dispatch(loadUser());

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [
    dispatch,
    enqueueSnackbar,
    errorProflie,
    isUpdatedProfile,
    navigate,
    user,
  ]);

  return (
    <form
      onSubmit={handleSubmit(hanldeUpdateProfile)}
      autoComplete="off"
      encType="multipart/form-data"
    >
      <h4 className="text-3xl">Edit Account</h4>
      <div className="grid grid-cols-6 gap-8 mt-3 text-lg xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-12">
        <div className="flex flex-col col-span-6 gap-8">
          <h5 className="text-lg">Email: {user && user.email}</h5>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">
              Name <span className="text-red-600">*</span>
            </label>
            <div>
              <input
                type="text"
                className="w-full p-2 border border-gray-300"
                id="name"
                name="name"
                {...register('name')}
                value={formProfile.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="gender">Gender</label>
            <div>
              <select
                className="w-full p-3 border border-gray-300"
                id="gender"
                name="gender"
                {...register('gender')}
                onChange={handleChange}
                defaultValue={formProfile.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Orther">Orther</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col col-span-6 gap-2">
          <div>
            <img
              src={avatarReview}
              alt={formProfile.name}
              className="rounded-full h-[200px] w-[200px] m-auto object-cover"
            />
          </div>
          <Button
            onClick={() => inputRef.current.click()}
            className="w-32 py-2 mx-auto bg-white border border-gray"
          >
            Upload
          </Button>
          <input
            type="file"
            accept="image/*"
            name="avatar"
            {...register('avatar')}
            ref={inputRef}
            className="hidden"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col col-span-6 gap-2">
          <label htmlFor="birthday">Birthday</label>
          <div>
            <input
              type="date"
              name="brithday"
              defaultValue={formProfile.birthday}
              {...register('birthday')}
              className="w-full p-2 border border-gray-300"
              id="birthday"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col col-span-6 gap-2">
          <label htmlFor="phone">Phone</label>
          <div>
            <input
              type="text"
              name="phone"
              defaultValue={formProfile.phone}
              {...register('phone')}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300"
              id="phone"
            />
          </div>
        </div>
        <Button
          disabledButton={change}
          type="submit"
          className={`text-white col-span-3 ${
            !change ? '' : 'bg-gray-500 cursor-not-allowed'
          }`}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
