import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@/test/utils";

import { mockPostsData } from "@/test/mocks/data";
import * as useGetPostsModule from "@/hooks/services/posts/useGetPosts";
import { PostsOrder } from "@/hooks/services/posts/types";
import { Posts } from "../..";

vi.mock("@/hooks/services/posts/useGetPosts", async () => {
  const actual = await vi.importActual("@/hooks/services/posts/useGetPosts");
  return {
    ...actual,
    useGetPostsInfinite: vi.fn(),
  };
});

describe("Posts", () => {
  const mockUseGetPostsInfinite = vi.spyOn(
    useGetPostsModule,
    "useGetPostsInfinite"
  );
  const mockFetchNextPage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseGetPostsInfinite.mockReturnValue({
      data: {
        pages: [mockPostsData],
        pageParams: [null],
      },
      isLoading: false,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isError: false,
      error: null,
      isPending: false,
      isRefetching: false,
      isFetchingNextPage: false,
      isFetchingPreviousPage: false,
      fetchPreviousPage: vi.fn(),
      refetch: vi.fn(),
    } as any);
  });

  it("renders posts correctly", async () => {
    render(<Posts />);

    await waitFor(() => {
      mockPostsData.edges.forEach((edge) => {
        expect(screen.getByText(edge.node.name)).toBeInTheDocument();
        expect(screen.getByText(edge.node.tagline)).toBeInTheDocument();
      });
    });
  });

  it("shows loading state when isLoading is true", async () => {
    mockUseGetPostsInfinite.mockReturnValue({
      data: undefined,
      isLoading: true,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isError: false,
      error: null,
      isPending: true,
      isRefetching: false,
      isFetchingNextPage: false,
      isFetchingPreviousPage: false,
      fetchPreviousPage: vi.fn(),
      refetch: vi.fn(),
    } as any);

    render(<Posts />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("filters posts by search term", async () => {
    render(<Posts />);

    const searchInput = screen.getByPlaceholderText(/Search/i);

    fireEvent.change(searchInput, { target: { value: "Test Product 1" } });

    await waitFor(() => {
      expect(screen.getByText("Test Product 1")).toBeInTheDocument();
      expect(screen.queryByText("Test Product 2")).not.toBeInTheDocument();
    });
  });

  it("shows message when no posts match search term", async () => {
    render(<Posts />);

    const searchInput = screen.getByPlaceholderText(/Search/i);

    fireEvent.change(searchInput, {
      target: { value: "no match search term" },
    });

    await waitFor(() => {
      expect(
        screen.getByText(/No posts found matching your search/i)
      ).toBeInTheDocument();
    });
  });

  it("changes order when tab is clicked", async () => {
    render(<Posts />);

    const popularTab = screen.getByText(/Popular/i);
    fireEvent.click(popularTab);

    expect(mockUseGetPostsInfinite).toHaveBeenCalledWith({
      first: 10,
      order: PostsOrder.RANKING,
    });
  });

  it("fetches more posts on scroll when hasNextPage is true", async () => {
    render(<Posts />);

    expect(mockFetchNextPage).toBeDefined();
    expect(mockUseGetPostsInfinite).toHaveReturnedWith(
      expect.objectContaining({
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
      })
    );
  });
});
