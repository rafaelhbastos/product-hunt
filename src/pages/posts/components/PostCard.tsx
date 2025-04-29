import { FC, Fragment } from "react";
import { Post } from "@/hooks/services/posts/types";
import {
  faTags,
  faComment,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/Button";

interface PostCardProps {
  post: Post;
}

export const PostCard: FC<PostCardProps> = ({ post }) => {
  const lastTopic = post.topics.edges[post.topics.edges.length - 1].node.id;
  return (
    <div className="group hover:shadow-lg transition-all p-4 bg-white rounded-lg flex justify-between align-center gap-4 m-4 cursor-pointer">
      <div className="w-full h-full flex items-start gap-4 ">
        <img
          src={post.thumbnail.url}
          alt={post.name}
          width={48}
          height={48}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-2 justify-between items-start">
          <h2 className="text-xl font-bold transition-colors group-hover:!text-primary">
            {post.name}
          </h2>
          <p className="text-sm text-secondary">{post.tagline}</p>
          <div className="flex items-center gap-2 text-xs text-secondary">
            <FontAwesomeIcon icon={faTags} />
            {post.topics.edges.map((topic) => (
              <Fragment key={topic.node.id}>
                <p>{topic.node.name}</p>
                <span>{topic.node.id !== lastTopic && " • "}</span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Button className="flex-col w-16">
          <FontAwesomeIcon icon={faComment} />
          <p>{post.commentsCount}</p>
        </Button>
        <Button className="flex-col w-16">
          <FontAwesomeIcon icon={faMountain} />
          <p>{post.votesCount}</p>
        </Button>
      </div>
    </div>
  );
};
