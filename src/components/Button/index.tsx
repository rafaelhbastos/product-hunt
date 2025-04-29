import classNames from "classnames";
import { FC } from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={classNames("button", className)} {...props}>
      {children}
    </button>
  );
};
