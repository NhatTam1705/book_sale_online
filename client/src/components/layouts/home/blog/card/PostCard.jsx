import React from 'react';

const PostCard = ({
  item: { image, title, content, category, day, comment },
}) => {
  return (
    <>
      <div className="flex flex-col gap-2 text-xl">
        <img src={image} alt={title} className="w-full " />
        <span className="cursor-pointer hover:text-orange-600">{category}</span>
        <span className="text-3xl font-semibold cursor-pointer hover:text-orange-600">
          {title}
        </span>
        <span className="text-lg text-gray-500">{title}</span>
        <span className="text-lg text-gray-500">
          {day} <span className="pl-10">{comment} comments</span>
        </span>
      </div>
    </>
  );
};

export default PostCard;
