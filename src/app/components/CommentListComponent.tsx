import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Comment = {
  id: number;
  content: string;
  user_id: number;
  username: string;
  post_id: number;
};

type CommentsListComponentProps = {
  postId: number;
};

const CommentsListComponent: React.FC<CommentsListComponentProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    console.log(postId)
    const fetchComments = async () => {
      try {
        const response = await axios.post('http://localhost:8000/get-comments', { post_id: postId });
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (postId !== -1) {
      fetchComments();
    }
  }, [postId]);

  return (
    <div className='z-30 h-full w-full rounded-lg bg-pink-50 px-6 pb-8  py-4 text-pink-500'>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="comment pt-2">
            <div className='mt-4 space-x-4 flex flex-row items-center text-xl text-pink-600'>
              <h4>{comment.username}</h4>
          </div>
          <p className='text-pink-700 mt-2'>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsListComponent;
