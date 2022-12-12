import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { clearErrors, newAuthor } from '../../../actions/authorActions';
import Avatar from '../../../assets/images/Slider_1.png';
import Button from '../../../components/buttons/Button';
import { NEW_AUTHOR_RESET } from '../../../constants/authorConstants';

const authorSchema = Yup.object({
  name: Yup.string().required('Please enter author name'),
  introduce: Yup.string().required('Please enter author introduce'),
});

const AddAuthorPage = () => {
  const [avatarReview, setAvatarReview] = useState(Avatar);
  const [avatar, setAvatar] = useState('');
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      introduce: '',
    },
    resolver: yupResolver(authorSchema),
    mode: 'onChange',
  });

  const { success, error } = useSelector((state) => state.newAuthor);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    if (success) {
      navigate('/admin/authors');
      dispatch({ type: NEW_AUTHOR_RESET });
      reset();
    }
  }, [dispatch, enqueueSnackbar, error, navigate, reset, success]);

  const handleChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarReview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleCreateAuthor = (data) => {
    data.avatar = avatar;
    dispatch(newAuthor(data));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-row items-center justify-between mb-6">
        <h5 className="text-3xl font-medium">Add Author</h5>
      </div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleCreateAuthor)}
        encType="multipart/form-data"
        className="bg-gray-50 p-6 rounded-lg grid grid-cols-12 gap-6"
      >
        <div className="col-span-8 flex flex-col gap-4 text-lg">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 flex flex-col gap-1">
              <label htmlFor="name">Full name</label>
              <TextField
                id="name"
                className="bg-white"
                name="name"
                {...register('name')}
                placeholder="Full name"
              />
              {errors?.name && (
                <div className="text-sm text-red-500">
                  {errors.name?.message}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="introduce">Full Introduce</label>
            <div className="p-4 bg-white border border-gray-300 rounded-md">
              <textarea
                name="introduce"
                id="introduce"
                rows="5"
                {...register('introduce')}
                className="w-full resize-none"
                placeholder="Full Introduce"
              ></textarea>
            </div>
            {errors?.introduce && (
              <div className="text-sm text-red-500">
                {errors.introduce?.message}
              </div>
            )}
          </div>
        </div>
        <div className="col-span-4">
          <img
            src={avatarReview}
            alt="Avatar Author"
            className="w-56 h-56 rounded-full mx-auto object-cover"
          />
          <div className="w-full flex justify-center pt-4">
            <Button
              onClick={() => inputRef.current.click()}
              className="w-32 py-2 mx-auto bg-white border border-gray"
            >
              Upload
            </Button>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            className="hidden"
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="col-span-12 text-white text-lg">
          Create Author
        </Button>
      </form>
    </div>
  );
};

export default AddAuthorPage;
