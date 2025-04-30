import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from "@/components/Tabs";
import { PostsOrder } from "@/hooks/services/posts/types";
import { Input } from "@/components/Input";

interface HeaderProps {
  order: PostsOrder;
  setOrder: React.Dispatch<React.SetStateAction<PostsOrder>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const Header = ({
  order,
  setOrder,
  searchTerm,
  setSearchTerm,
}: HeaderProps) => {
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
    <div className="flex justify-between items-center separator p-4 bg-white gap-4 max-size-620:flex-wrap max-size-415:flex-col">
      <Tabs
        tabs={tabs}
        selected={order}
        onChange={(value) => setOrder(value)}
        className="max-size-620:order-3 max-size-620:w-full"
        btnClassName="max-size-620:w-full"
      />
      <div className="flex items-center justify-center gap-4 max-size-620:justify-between">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          icon
        />
        <div className="flex items-center justify-center p-2 bg-gray-light rounded-md">
          <p className="text-sm">{`Today, ${formattedDate}`}</p>
        </div>
      </div>
      <div className="bg-gray-light rounded-full w-12 h-12 flex items-center justify-center">
        <FontAwesomeIcon icon={faUser} color="var(--color-text)" />
      </div>
    </div>
  );
};
