import BestsellingBooksList from '../../components/layouts/home/home/bestsellingBooks/BestsellingBooksList';
import BiographiesBooksList from '../../components/layouts/home/home/biographiesBooks/BiographiesBooksList';
import DealsOfTheWeekList from '../../components/layouts/home/home/dealsOfTheWeek/DealsOfTheWeekList';
import FavoriteAuthorsList from '../../components/layouts/home/home/favoriteAuthors/FavoriteAuthorsList';
import FeautedBooksList from '../../components/layouts/home/home/featuredBooks/FeautedBooksList';
import FeaturedCategoriesList from '../../components/layouts/home/home/featuredCategories/FeaturedCategoriesList';
import NewReleasesList from '../../components/layouts/home/home/newReleases/NewReleasesList';
import Slider from '../../components/layouts/home/home/silders/Slider';

const HomePage = () => {
  return (
    <>
      <Slider></Slider>
      <div className="flex flex-col gap-24 mx-12 my-24">
        <FeaturedCategoriesList></FeaturedCategoriesList>
        <BestsellingBooksList></BestsellingBooksList>
        <FeautedBooksList></FeautedBooksList>
      </div>
      <div className="px-12 bg-[#fff6f6] py-24 relative">
        <DealsOfTheWeekList></DealsOfTheWeekList>
      </div>
      <div className="flex flex-col gap-24 mx-12 my-24">
        <NewReleasesList></NewReleasesList>
        <BiographiesBooksList></BiographiesBooksList>
        <FavoriteAuthorsList></FavoriteAuthorsList>
      </div>
    </>
  );
};

export default HomePage;
