import { useState } from "react";
import { PostsOrder } from "../../hooks/services/posts/types";
import { useGetPostsInfinite } from "../../hooks/services/posts/useGetPosts";
import { mapPostsPageResult } from "../../utils";
import { Header } from "./Header";

export const Posts = () => {
  const [order, setOrder] = useState<PostsOrder>(PostsOrder.RANKING);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPostsInfinite({
      first: 10,
      order,
    });
  const allPosts = mapPostsPageResult(data);
  const isFetching = isLoading || isFetchingNextPage;

  return (
    <div>
      <Header order={order} setOrder={setOrder} />
    </div>
  );
};
