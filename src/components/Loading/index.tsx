import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center" data-testid="loading">
      <FontAwesomeIcon
        icon={faSpinner}
        className="loading-spinner w-12 h-12"
        color="var(--color-primary)"
        size="8x"
      />
    </div>
  );
};
