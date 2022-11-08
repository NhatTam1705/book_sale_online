import ProductList from "../../components/layouts/home/shop/product/ProductList";
import SideBarAuthor from "../../components/layouts/home/shop/sideBar/SideBarAuthor";
import SideBarByReview from "../../components/layouts/home/shop/sideBar/SideBarByReview";
import SideBarCategories from "../../components/layouts/home/shop/sideBar/SideBarCategories";
import SideBarFilterByPrice from "../../components/layouts/home/shop/sideBar/SideBarFilterByPrice";
import SideBarFormat from "../../components/layouts/home/shop/sideBar/SideBarFormat";
import SideBarLanguage from "../../components/layouts/home/shop/sideBar/SideBarLanguage";


const ShopPage = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-8 px-12 py-24 xl:grid-cols-9 lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-2">
        <div className="col-span-2">
          <SideBarCategories></SideBarCategories>
          <SideBarAuthor></SideBarAuthor>
          <SideBarLanguage></SideBarLanguage>
          <SideBarFormat></SideBarFormat>
          <SideBarFilterByPrice></SideBarFilterByPrice>
          <SideBarByReview></SideBarByReview>
        </div>
        <div className="col-span-2 xl:col-span-7 lg:col-span-5 md:col-span-3 sm:col-span-2">
          <ProductList></ProductList>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
