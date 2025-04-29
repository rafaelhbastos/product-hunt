import { useState, useMemo, useCallback } from "react";
import { PostsOrder } from "@/hooks/services/posts/types";
import { useGetPostsInfinite } from "@/hooks/services/posts/useGetPosts";
import { fuzzySearch, mapPostsPageResult } from "@/utils";
import { Header } from "./Header";
import { Loading } from "@/components/Loading";
import { PostCard } from "./components/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./posts.module.css";

export const Posts = () => {
  const [order, setOrder] = useState<PostsOrder>(PostsOrder.NEWEST);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, fetchNextPage, hasNextPage } = useGetPostsInfinite({
    first: 10,
    order,
  });
  const allPosts = mapPostsPageResult(data);

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return allPosts;
    return allPosts.filter((post) => {
      const topics = post.topics.edges
        .map((topic) => topic.node.name)
        .join(" ");
      return fuzzySearch(searchTerm, [
        post.name,
        post.tagline,
        post.description,
        topics,
      ]);
    });
  }, [allPosts, searchTerm]);
  return (
    <div>
      <Header
        order={order}
        setOrder={setOrder}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <InfiniteScroll
          dataLength={filteredPosts.length}
          next={fetchNextPage}
          hasMore={!searchTerm && hasNextPage}
          loader={<Loading />}
          endMessage={!searchTerm && <EndMessage />}
          className={styles.postsContainer}
        >
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {filteredPosts.length === 0 && searchTerm && <NoPostsFound />}
        </InfiniteScroll>
      )}
    </div>
  );
};

const EndMessage = () => {
  return (
    <p className="text-center text-secondary w-full py-2">
      No more posts to show.
    </p>
  );
};

const NoPostsFound = () => {
  return (
    <p className="text-center text-secondary w-full py-2">
      No posts found matching your search.
    </p>
  );
};
