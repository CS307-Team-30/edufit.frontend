import React from 'react';


type PostComponentProps = {
  title: string
  author: string
  community: number
  content: string
}

const PostComponent = ({ title, author, community, content }: PostComponentProps) => {
  return (
    <div className="bg-white rounded-lg mt-8 mx-16 px-10 py-8">
      <div className="flex flex-row justify-between">
        <h1>{title}</h1>
        <div className="flex flex-row space-x-4">
          <h4>Author: {author}</h4>
          <h4>Community: {community}</h4>
        </div>
      </div>
      <p className="mt-4">{content}</p>
    </div>
  );
};

export default PostComponent;
