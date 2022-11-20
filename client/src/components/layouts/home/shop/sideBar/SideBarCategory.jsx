import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { HiMinus, HiPlus, HiSearch, HiX } from 'react-icons/hi';
import { MdOutlineArrowBack } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  getCategories,
} from '../../../../../actions/categoryActions';
import { getSubCategories } from '../../../../../actions/subCategoryActions';

const SideBarCategory = ({ fallbackCategory }) => {
  const [show, setShow] = useState(false);

  const [keyword, setKeyword] = useState('');
  const [keywordSub, setKeywordSub] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, categories, error, categoriesCount } = useSelector(
    (state) => state.categories
  );
  const {
    loading: loadingSub,
    subCategories,
    error: errorSub,
    subCategoriesCount,
  } = useSelector((state) => state.subCategories);

  const [isSub, setIsSub] = useState(false);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    dispatch(getCategories(keyword));
    dispatch(getSubCategories(keywordSub, category));
  }, [error, dispatch, enqueueSnackbar, keyword, keywordSub, category]);

  useEffect(() => {
    fallbackCategory(subCategory);
  }, [fallbackCategory, subCategory]);

  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-6 text-xl border border-gray-300">
        <div className="flex flex-row items-center justify-between font-semibold ">
          <span>{isSub ? 'Sub Category' : 'Category'}</span>
          <div className="flex gap-2">
            {isSub && (
              <MdOutlineArrowBack
                className="cursor-pointer"
                onClick={() => setIsSub(false)}
              ></MdOutlineArrowBack>
            )}
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
          (isSub ? (
            <>
              <div className="flex flex-row bg-[#f6f5f3] p-3 justify-between">
                <HiSearch className="w-8"></HiSearch>
                <input
                  className="text-[#7c6e65] bg-[#f6f5f3] text-base w-full"
                  type="text"
                  placeholder="Search sub category ..."
                  value={keywordSub}
                  onChange={(event) => setKeywordSub(event.target.value)}
                />
                <HiX
                  className={`text-blue-700 text-base my-auto cursor-pointer ${
                    keywordSub === '' ? 'hidden' : 'block'
                  }`}
                  onClick={() => {
                    setKeywordSub('');
                    setSubCategory('');
                  }}
                ></HiX>
              </div>
              <div className="flex flex-col gap-3 text-lg">
                {subCategories &&
                  subCategories
                    .sort((prev, next) => {
                      return prev.createdDate < next.createdDate ? 1 : -1;
                    })
                    .map((subCategory, index) => (
                      <span
                        onClick={() => {
                          setSubCategory(subCategory._id);
                          setKeywordSub(subCategory.name);
                        }}
                        key={subCategory._id}
                        className="cursor-pointer hover:text-orange-600"
                      >
                        {subCategory.name}
                      </span>
                    ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row bg-[#f6f5f3] p-3 justify-between">
                <HiSearch className="w-8"></HiSearch>
                <input
                  className="text-[#7c6e65] bg-[#f6f5f3] text-base w-full"
                  type="text"
                  placeholder="Search category ..."
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                />
                <HiX
                  className={`text-blue-700 text-base my-auto cursor-pointer ${
                    keyword === '' ? 'hidden' : 'block'
                  }`}
                  onClick={() => setKeyword('')}
                ></HiX>
              </div>
              <div className="flex flex-col gap-3 text-lg">
                {categories &&
                  categories
                    .sort((prev, next) => {
                      return prev.createdDate < next.createdDate ? 1 : -1;
                    })
                    .map((category, index) => (
                      <span
                        key={category._id}
                        onClick={() => {
                          setIsSub(true);
                          setCategory(category._id);
                        }}
                        className="cursor-pointer hover:text-orange-600"
                      >
                        {category.name}
                      </span>
                    ))}
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default SideBarCategory;
