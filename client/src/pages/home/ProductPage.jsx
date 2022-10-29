import ProductDetails from '../../components/layouts/home/product/ProductDetails';
import ProductTab from '../../components/layouts/home/product/ProductTab';
import RelatedProductsList from '../../components/layouts/home/product/relatedProducts/RelatedProductsList';

const ProductPage = () => {
  return (
    <>
      <div className="px-12 pt-24 pb-12 bg-[#fff6f6]">
        <ProductDetails></ProductDetails>
      </div>
      <div className="flex flex-col gap-24 pb-24">
        <ProductTab></ProductTab>
        <RelatedProductsList></RelatedProductsList>
      </div>
    </>
  );
};

export default ProductPage;
