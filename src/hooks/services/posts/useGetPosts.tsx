import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { UseGetPostsProps, PostsResponse } from "./types";
import { graphqlClient } from "../../../services";

const GET_POSTS = `
  query GetPosts($first: Int!, $after: String, $order: PostsOrder) {
    posts(first: $first, after: $after, order: $order) {
      edges {
        cursor
        node {
          id
          name
          tagline
          description
          commentsCount
          media {
            type
            url
            videoUrl
          }
          slug
          topics {
            edges {
              node {
                id
                name
              }
            }
          }
          thumbnail {
            url
          }
          votesCount
          website
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

type PostsData = PostsResponse["posts"];

export const useGetPostsInfinite = ({ first, order }: UseGetPostsProps) => {
  return useInfiniteQuery<
    PostsData,
    Error,
    InfiniteData<PostsData>,
    (string | number)[],
    string | null
  >({
    queryKey: ["posts", order, first],
    queryFn: async ({ pageParam }) => {
      const response = await graphqlClient.request<PostsResponse>(GET_POSTS, {
        first,
        after: pageParam,
        order,
      });
      return response.posts;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : null,
  });
};
