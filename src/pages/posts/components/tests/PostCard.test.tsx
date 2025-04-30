import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils";
import { PostCard } from "../PostCard";
import { mockPostsData } from "@/test/mocks/data";

describe("PostCard", () => {
  const mockPost = mockPostsData.edges[0].node;

  it("renders post information correctly", () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText(mockPost.name)).toBeInTheDocument();
    expect(screen.getByText(mockPost.tagline)).toBeInTheDocument();

    mockPost.topics.edges.forEach((topic) => {
      expect(screen.getByText(topic.node.name)).toBeInTheDocument();
    });

    expect(
      screen.getByText(mockPost.commentsCount.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockPost.votesCount.toString())
    ).toBeInTheDocument();

    const image = screen.getByAltText(mockPost.name) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(mockPost.thumbnail.url);
  });

  it("has correct link to website", () => {
    render(<PostCard post={mockPost} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", mockPost.website);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "external noreferrer");
  });
});
