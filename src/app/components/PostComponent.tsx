import React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

import { Community } from '@/types/Community';


type PostComponentProps = {
  title: string
  author: string
  community: Community
  content: string
}

const PostComponent = ({ title, author, community, content }: PostComponentProps) => {
  return (
    <div className="bg-white rounded-lg mt-8 mx-16 px-10 py-8">
      <div className="flex flex-row justify-between">
        <h1>{title}</h1>
        <div className="flex flex-col space-y-2">
          <h4>Author: {author}</h4>
          <UnstyledLink href={"/community/" + community.id}>Community: {community.name}</UnstyledLink>
        </div>
      </div>
      <p className="mt-4">{content}</p>
    </div>
  );
};

export default PostComponent;
