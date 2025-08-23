import type { IPost } from '@customTypes/post.ts';
import type { FC } from 'react';

interface PostItemProps {
  post: IPost;
}

const PostItem: FC<PostItemProps> = ({ post }) => (
  <div>
    {post.id}. {post.title}
    <button type="button">delete</button>
  </div>
);

export default PostItem;
