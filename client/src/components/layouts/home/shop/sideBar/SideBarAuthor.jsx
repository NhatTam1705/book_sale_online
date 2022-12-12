import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { HiMinus, HiPlus, HiSearch, HiX } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAuthors } from '../../../../../actions/authorActions';
import useDebounce from '../../../../../hooks/useDebounce';

const SideBarAuthor = ({ fallbackAuthor }) => {
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState('');
  const keywordDebounce = useDebounce(keyword, 500);
  const dispatch = useDispatch();
  const [author, setAuthor] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { loading, error, authors, authorsCount } = useSelector(
    (state) => state.authors
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    dispatch(getAuthors(keywordDebounce));
  }, [error, dispatch, enqueueSnackbar, keywordDebounce]);

  useEffect(() => {
    fallbackAuthor(author);
  }, [author, fallbackAuthor]);

  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-6 text-xl border border-gray-300">
        <div className="flex flex-row items-center justify-between font-semibold ">
          <span>Author</span>
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
        {show && (
          <>
            <div className="flex flex-row bg-[#f6f5f3] p-3 justify-between">
              <HiSearch className="w-8"></HiSearch>
              <input
                className="text-[#7c6e65] bg-[#f6f5f3] text-base w-full decoration-transparent"
                type="text"
                placeholder="Search author ..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <HiX
                className={`text-blue-700 text-base my-auto cursor-pointer ${
                  keyword === '' ? 'hidden' : 'block'
                }`}
                onClick={() => {
                  setKeyword('');
                  setAuthor('');
                }}
              ></HiX>
            </div>
            <div className="flex flex-col gap-3 text-lg">
              {authors &&
                authors
                  .sort((prev, next) => {
                    return prev.createdDate < next.createdDate ? 1 : -1;
                  })
                  .map((author, index) => (
                    <span
                      onClick={() => {
                        setAuthor(author._id);
                        setKeyword(author.name);
                      }}
                      key={author._id}
                      className="cursor-pointer hover:text-orange-600"
                    >
                      {author.name}
                    </span>
                  ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarAuthor;
