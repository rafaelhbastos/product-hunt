import { PostsResponse } from "@/hooks/services/posts/types";

export const mockPostsData: PostsResponse["posts"] = {
  edges: [
    {
      cursor: "cursor1",
      node: {
        id: "1",
        name: "Test Product 1",
        tagline: "This is a test product 1",
        description: "Detailed description for test product 1",
        commentsCount: 10,
        media: [
          {
            type: "image",
            url: "https://example.com/image1.jpg",
          },
        ],
        slug: "test-product-1",
        topics: {
          edges: [
            {
              node: {
                id: "topic1",
                name: "Tech",
              },
            },
            {
              node: {
                id: "topic2",
                name: "Productivity",
              },
            },
          ],
        },
        thumbnail: {
          url: "https://example.com/thumbnail1.jpg",
        },
        votesCount: 42,
        website: "https://example.com/product1",
      },
    },
    {
      cursor: "cursor2",
      node: {
        id: "2",
        name: "Test Product 2",
        tagline: "This is a test product 2",
        description: "Detailed description for test product 2",
        commentsCount: 5,
        media: [
          {
            type: "image",
            url: "https://example.com/image2.jpg",
          },
        ],
        slug: "test-product-2",
        topics: {
          edges: [
            {
              node: {
                id: "topic3",
                name: "Design",
              },
            },
          ],
        },
        thumbnail: {
          url: "https://example.com/thumbnail2.jpg",
        },
        votesCount: 21,
        website: "https://example.com/product2",
      },
    },
  ],
  pageInfo: {
    endCursor: "cursor2",
    hasNextPage: true,
  },
};
