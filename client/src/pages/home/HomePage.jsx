import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAuthors } from '../../actions/authorActions';
import {
  clearErrors as clearErrorsProduct,
  getProducts,
} from '../../actions/productActions';
import {
  clearErrors as clearErrorsSubCategory,
  getSubCategories,
} from '../../actions/subCategoryActions';
import MetaData from '../../components/dialogs/MetaData';
import BestsellingBooksList from '../../components/layouts/home/home/bestsellingBooks/BestsellingBooksList';
// import BiographiesBooksList from '../../components/layouts/home/home/biographiesBooks/BiographiesBooksList';
import DealsOfTheWeekList from '../../components/layouts/home/home/dealsOfTheWeek/DealsOfTheWeekList';
import FavoriteAuthorsList from '../../components/layouts/home/home/favoriteAuthors/FavoriteAuthorsList';
import FeautedBooksList from '../../components/layouts/home/home/featuredBooks/FeautedBooksList';
import FeaturedCategoriesList from '../../components/layouts/home/home/featuredCategories/FeaturedCategoriesList';
import NewReleasesList from '../../components/layouts/home/home/newReleases/NewReleasesList';
import Slider from '../../components/layouts/home/home/silders/Slider';

const HomePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const disptach = useDispatch();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  const {
    loading: loadingSubcategory,
    subCategories,
    error: errorSubcategory,
    subCategoriesCount,
  } = useSelector((state) => state.subCategories);

  const {
    authors,
    loading: loadingAuthor,
    error: errorAuthor,
    authorsCount,
  } = useSelector((state) => state.authors);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: 'error',
      });
      disptach(clearErrorsProduct());
    }

    if (errorSubcategory) {
      enqueueSnackbar(errorSubcategory, {
        variant: 'error',
      });
      disptach(clearErrorsSubCategory());
    }

    if (errorAuthor) {
      enqueueSnackbar(errorAuthor, {
        variant: 'error',
      });
      disptach(clearErrors());
    }

    disptach(getSubCategories());
    disptach(getProducts());
    disptach(getAuthors());
  }, [disptach, enqueueSnackbar, error, errorAuthor, errorSubcategory]);

  return (
    <>
      <MetaData title="Home"></MetaData>
      <Slider></Slider>
      <div className="flex flex-col gap-24 mx-12 my-24">
        <FeaturedCategoriesList
          subCategories={subCategories}
          loading={loadingSubcategory}
        ></FeaturedCategoriesList>
        <BestsellingBooksList
          products={products}
          loading={loading}
        ></BestsellingBooksList>
        <FeautedBooksList
          products={products}
          loading={loading}
        ></FeautedBooksList>
      </div>
      <div className="px-12 bg-[#fff6f6] py-24 relative">
        <DealsOfTheWeekList
          products={products}
          loading={loading}
        ></DealsOfTheWeekList>
      </div>
      <div className="flex flex-col gap-24 mx-12 my-24">
        <NewReleasesList
          subCategories={subCategories}
          loadingSubcategory={loadingSubcategory}
          products={products}
          loading={loading}
        ></NewReleasesList>
        {/* <BiographiesBooksList></BiographiesBooksList> */}
        <FavoriteAuthorsList
          authors={authors}
          loading={loadingAuthor}
        ></FavoriteAuthorsList>
      </div>
    </>
  );
};

export default HomePage;
