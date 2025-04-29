import { PostsOrder } from "../../hooks/services/posts/types";
import { useGetPosts } from "../../hooks/services/posts/useGetPosts";

export const Posts = () => {
  const { data } = useGetPosts({
    first: 10,
    order: PostsOrder.RANKING,
    after: "MTA",
  });
  console.log(data);
  return <div>index</div>;
};
