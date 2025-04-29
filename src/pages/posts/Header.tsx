import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from "../../components/Tabs";
import { PostsOrder } from "../../hooks/services/posts/types";

interface HeaderProps {
  order: PostsOrder;
  setOrder: React.Dispatch<React.SetStateAction<PostsOrder>>;
}

export const Header = ({ order, setOrder }: HeaderProps) => {
  const tabs = [
    { label: "Newest", value: PostsOrder.NEWEST },
    { label: "Popular", value: PostsOrder.RANKING },
  ];

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex justify-between items-center separator p-4 ">
      <Tabs
        tabs={tabs}
        selected={order}
        onChange={(value) => setOrder(value as PostsOrder)}
      />
      <div className="flex items-center justify-center p-2 background-gray rounded-md">
        <p className="text-sm">{`Today, ${formattedDate}`}</p>
      </div>
      <div className="background-gray rounded-full w-12 h-12 flex items-center justify-center">
        <FontAwesomeIcon icon={faUser} />
      </div>
    </div>
  );
};
