import React from 'react';
import ProductDetails from '../components/layouts/product/ProductDetails';
import ProductTab from '../components/layouts/product/ProductTab';
import RelatedProductsList from '../components/layouts/product/relatedProducts/RelatedProductsList';

const ProductPage = () => {
  return (
    <>
      <div className="px-12 pt-24 pb-12 bg-[#fff6f6]">
        <ProductDetails></ProductDetails>
      </div>
      <div className='pb-24 flex flex-col gap-24'>
        <ProductTab></ProductTab>
        <RelatedProductsList></RelatedProductsList>
      </div>
    </>
  );
};

export default ProductPage;
