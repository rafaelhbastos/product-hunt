export enum PostsOrder {
  RANKING = "RANKING",
  NEWEST = "NEWEST",
}

export interface UseGetPostsProps {
  first: number;
  order: PostsOrder;
}

export interface PostMedia {
  type: string;
  url: string;
  videoUrl?: string;
}

export interface Topic {
  node: {
    id: string;
    name: string;
  };
}

export interface Post {
  id: string;
  name: string;
  tagline: string;
  description: string;
  commentsCount: number;
  media: PostMedia[];
  slug: string;
  topics: {
    edges: Topic[];
  };
  thumbnail: {
    url: string;
  };
  votesCount: number;
  website: string;
}

export interface PostsResponse {
  posts: {
    edges: {
      cursor: string;
      node: Post;
    }[];
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
}
