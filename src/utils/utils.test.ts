import { describe, it, expect } from "vitest";
import { fuzzySearch } from "./array";
import { mapPostsPageResult } from "./infinitePosts";
import { mockPostsData } from "@/test/mocks/data";
import { InfiniteData } from "@tanstack/react-query";
import { PostsResponse } from "@/hooks/services/posts/types";

describe("fuzzySearch", () => {
  it("returns true when search term is found in a string", () => {
    expect(fuzzySearch("test", "This is a test string")).toBe(true);
  });

  it("returns false when search term is not found in a string", () => {
    expect(fuzzySearch("missing", "This is a test string")).toBe(false);
  });

  it("is case insensitive", () => {
    expect(fuzzySearch("TEST", "This is a test string")).toBe(true);
    expect(fuzzySearch("test", "This is a TEST string")).toBe(true);
  });

  it("returns true when search term is found in at least one array item", () => {
    expect(
      fuzzySearch("test", ["This is a test string", "Another string"])
    ).toBe(true);
  });

  it("returns false when search term is not found in any array item", () => {
    expect(fuzzySearch("missing", ["This is a string", "Another string"])).toBe(
      false
    );
  });
});

describe("mapPostsPageResult", () => {
  it("returns empty array when data is undefined", () => {
    expect(mapPostsPageResult(undefined)).toEqual([]);
  });

  it("maps InfiniteData of posts to flat array of posts", () => {
    const mockData: InfiniteData<PostsResponse["posts"]> = {
      pages: [
        mockPostsData,
        {
          edges: [
            {
              cursor: "cursor3",
              node: {
                id: "3",
                name: "Test Product 3",
                tagline: "This is a test product 3",
                description: "Detailed description for test product 3",
                commentsCount: 15,
                media: [
                  {
                    type: "image",
                    url: "https://example.com/image3.jpg",
                  },
                ],
                slug: "test-product-3",
                topics: {
                  edges: [
                    {
                      node: {
                        id: "topic4",
                        name: "Software",
                      },
                    },
                  ],
                },
                thumbnail: {
                  url: "https://example.com/thumbnail3.jpg",
                },
                votesCount: 30,
                website: "https://example.com/product3",
              },
            },
          ],
          pageInfo: {
            endCursor: "cursor3",
            hasNextPage: false,
          },
        },
      ],
      pageParams: [null, "cursor2"],
    };

    const result = mapPostsPageResult(mockData);

    expect(result.length).toBe(3);
    expect(result[0].id).toBe("1");
    expect(result[1].id).toBe("2");
    expect(result[2].id).toBe("3");
  });
});
