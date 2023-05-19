import { Pagination } from '@mui/material';
import Blog_1 from '../../assets/images/blog_1.jpg';
import Blog_2 from '../../assets/images/blog_2.jpg';
import Blog_3 from '../../assets/images/blog_3.jpg';
import Blog_4 from '../../assets/images/blog_4.jpg';
import MetaData from '../../components/dialogs/MetaData';
import PostCard from '../../components/layouts/home/blog/card/PostCard';
import SideBarCategory from '../../components/layouts/home/blog/sideBar/SideBarCategory';
import SideBarRecentPosts from '../../components/layouts/home/blog/sideBar/SideBarRecentPosts';
import SideBarSearch from '../../components/layouts/home/blog/sideBar/SideBarSearch';
import SideBarTag from '../../components/layouts/home/blog/sideBar/SideBarTag';

const posts = [
  {
    id: 1,
    image: Blog_1,
    category: 'Romance',
    title: 'Signficant reading has a more info number',
    content:
      'It’s nice to win awards. Last night, the Ueno team in Reykjavík came home from the Icelandic Web Awards.',
    day: '10 November, 2022',
    comment: 1,
  },
  {
    id: 2,
    image: Blog_2,
    category: 'Romance',
    title: 'Activities of the Frankfurt Book International',
    content:
      'It’s nice to win awards. Last night, the Ueno team in Reykjavík came home from the Icelandic Web Awards.',
    day: '10 November, 2022',
    comment: 2,
  },
  {
    id: 3,
    image: Blog_3,
    category: 'Romance',
    title: 'The London Book Fair is to be packed with exciting',
    content:
      'It’s nice to win awards. Last night, the Ueno team in Reykjavík came home from the Icelandic Web Awards.',
    day: '10 November, 2022',
    comment: 3,
  },
  {
    id: 4,
    image: Blog_4,
    category: 'Romance',
    title: 'Should You Feel Embarrassed for Reading Kids Books?',
    content:
      'It’s nice to win awards. Last night, the Ueno team in Reykjavík came home from the Icelandic Web Awards.',
    day: '10 November, 2022',
    comment: 4,
  },
];

const BlogPage = () => {
  return (
    <>
      <MetaData title="Blog"></MetaData>
      <div className="grid grid-cols-2 gap-8 px-12 py-24 xl:grid-cols-9 lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-2">
        <div className="col-span-2">
          <SideBarSearch></SideBarSearch>
          <SideBarCategory></SideBarCategory>
          <SideBarRecentPosts></SideBarRecentPosts>
          <SideBarTag></SideBarTag>
        </div>
        <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-5 xl:col-span-7 grid grid-cols-2 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="col-span-1">
              <PostCard item={post}></PostCard>
            </div>
          ))}
          <div className="flex justify-center col-span-2">
            <Pagination
              className=""
              page={1}
              color="primary"
              count={5}
              variant="outlined"
              shape="rounded"
              size="large"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
