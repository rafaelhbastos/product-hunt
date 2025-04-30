import { HttpResponse, graphql } from "msw";
import { mockPostsData } from "./data";

export const handlers = [
  graphql.query("GetPosts", () => {
    return HttpResponse.json({
      data: {
        posts: mockPostsData,
      },
    });
  }),
];
