import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@/test/utils";
import { Header } from "../../Header";
import { PostsOrder } from "@/hooks/services/posts/types";

describe("Header", () => {
  const mockSetOrder = vi.fn();
  const mockSetSearchTerm = vi.fn();
  const defaultProps = {
    order: PostsOrder.NEWEST,
    setOrder: mockSetOrder,
    searchTerm: "",
    setSearchTerm: mockSetSearchTerm,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the search input and date", () => {
    render(<Header {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(/Search/i);
    expect(searchInput).toBeInTheDocument();

    expect(screen.getByText(/Today/i)).toBeInTheDocument();
  });

  it("calls setSearchTerm when search input changes", () => {
    render(<Header {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(searchInput, { target: { value: "test search" } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith("test search");
  });

  it("changes order when order button is clicked", () => {
    render(<Header {...defaultProps} />);

    const popularButton = screen.getByText(/Popular/i);
    fireEvent.click(popularButton);

    expect(mockSetOrder).toHaveBeenCalledWith(PostsOrder.RANKING);
  });

  it("highlights active order option", () => {
    render(<Header {...defaultProps} />);

    const newestButton = screen.getByText(/Newest/i);
    expect(newestButton.closest("button")).toHaveClass("active");

    const popularButton = screen.getByText(/Popular/i);
    expect(popularButton.closest("button")).not.toHaveClass("active");
  });
});
