import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  getCategories,
} from '../../../../../actions/categoryActions';

const SideBarCategory = () => {
  const [show, setShow] = useState(false);
  const { loading, categories, error, categoriesCount } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    dispatch(getCategories());
  }, [error, dispatch, enqueueSnackbar]);
  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-6 text-xl border border-gray-300">
        <div className="flex flex-row items-center justify-between font-semibold ">
          <span>Categories</span>
          <div className="flex gap-2">
            {show ? (
              <HiMinus
                className="cursor-pointer"
                onClick={() => setShow((prev) => !prev)}
              ></HiMinus>
            ) : (
              <HiPlus
                className="cursor-pointer"
                onClick={() => setShow((prev) => !prev)}
              ></HiPlus>
            )}
          </div>
        </div>
        {show &&
          categories &&
          categories
            .sort((prev, next) => {
              return prev.createdDate < next.createdDate ? 1 : -1;
            })
            .map((category, index) => (
              <span
                key={category._id}
                className="cursor-pointer hover:text-orange-600"
              >
                {category.name}
              </span>
            ))}
      </div>
    </>
  );
};

export default SideBarCategory;
