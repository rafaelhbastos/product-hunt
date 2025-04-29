import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: boolean;
}
export const Input: FC<InputProps> = ({ icon, ...props }) => {
  return (
    <div className="relative">
      <input className="input pl-8" {...props} />
      {icon && (
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-secondary">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      )}
    </div>
  );
};
