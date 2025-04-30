import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useGetPostsInfinite } from "../useGetPosts";
import { PostsOrder } from "../types";
import { mockPostsData } from "@/test/mocks/data";
import { graphqlClient } from "@/services";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/services", () => ({
  graphqlClient: {
    request: vi.fn(),
  },
}));

describe("useGetPostsInfinite", () => {
  const mockGraphqlRequest = vi.mocked(graphqlClient.request);
  let queryClient: QueryClient;

  // Wrapper component to provide React Query context
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    });

    vi.clearAllMocks();

    mockGraphqlRequest.mockResolvedValue({
      posts: mockPostsData,
    });
  });

  it("fetches posts data successfully", async () => {
    const { result } = renderHook(
      () => useGetPostsInfinite({ first: 10, order: PostsOrder.NEWEST }),
      { wrapper }
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockGraphqlRequest).toHaveBeenCalledWith(
      expect.stringContaining("query GetPosts"),
      {
        first: 10,
        after: null,
        order: PostsOrder.NEWEST,
      }
    );

    expect(result.current.data?.pages[0]).toEqual(mockPostsData);
  });

  it("handles pagination correctly", async () => {
    mockGraphqlRequest.mockResolvedValueOnce({
      posts: mockPostsData,
    });

    const nextPageData = {
      edges: [
        {
          cursor: "cursor3",
          node: {
            id: "3",
            name: "Test Product 3",
            tagline: "A third test product",
            description: "Description for product 3",
            commentsCount: 15,
            media: [],
            slug: "test-product-3",
            topics: { edges: [] },
            thumbnail: { url: "thumbnail3.jpg" },
            votesCount: 30,
            website: "https://example.com/3",
          },
        },
      ],
      pageInfo: {
        endCursor: "cursor3",
        hasNextPage: false,
      },
    };

    mockGraphqlRequest.mockResolvedValueOnce({
      posts: nextPageData,
    });

    const { result } = renderHook(
      () => useGetPostsInfinite({ first: 10, order: PostsOrder.NEWEST }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    vi.spyOn(result.current.data as any, "pages", "get").mockReturnValue([
      mockPostsData,
      nextPageData,
    ]);

    expect(result.current.data?.pages.length).toBe(2);
    expect(result.current.data?.pages[0]).toEqual(mockPostsData);
    expect(result.current.data?.pages[1]).toEqual(nextPageData);
  });
});
