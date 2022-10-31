import React from 'react';
import AuthorBookList from '../../components/layouts/home/author/authorBook/AuthorBookList';
import AuthorDetails from '../../components/layouts/home/author/authorDetails/AuthorDetails';

const AuthorSinglePage = () => {
  return (
    <>
      <div className="bg-[#fff6f6] px-12 py-24">
        <AuthorDetails></AuthorDetails>
      </div>
      <div className='px-12 py-24'>
        <AuthorBookList></AuthorBookList>
      </div>
    </>
  );
};

export default AuthorSinglePage;
