import { postApi } from '@store/services/PostService';
import PostItem from '@components/PostItem.tsx';
import type { IPost } from '@customTypes/post.ts';

const PostContainer = () => {
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postApi.useFetchAllPostsQuery(5, {
    pollingInterval: 1000, // отправлять запрос по интервалу
  });

  const [
    createPost,
    // { error: createError, isLoading: isCreateLoading }
  ] = postApi.useCreatePostMutation({
    // selectFromResult - селектор
  });

  const handleCreate = async () => {
    const title = prompt('title');
    await createPost({ title, body: title } as IPost);
  };

  return (
    <div>
      <button type="button" onClick={handleCreate}>
        create
      </button>
      <button type="button" onClick={() => refetch()}>
        refetch
      </button>{' '}
      {/* принудитиельно обновить запрос */}
      {isLoading && <h1>isLoding</h1>}
      {error && <h1>error</h1>}
      {posts && posts.map((post) => <PostItem post={post} key={post.id} />)}
    </div>
  );
};

export default PostContainer;
