import { InfiniteData } from "@tanstack/react-query";
import { PostsResponse } from "../hooks/services/posts/types";

export const mapPostsPageResult = (
  data: InfiniteData<PostsResponse["posts"]> | undefined
) => {
  return (
    data?.pages.flatMap((page) => page.edges.map(({ node }) => node)) ?? []
  );
};
