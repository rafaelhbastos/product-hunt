import { PostsOrder } from "../../hooks/services/posts/types";
import { useGetPostsInfinite } from "../../hooks/services/posts/useGetPosts";

export const Posts = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPostsInfinite({
      first: 10,
      order: PostsOrder.RANKING,
    });
  console.log(data);
  return <div>index</div>;
};
