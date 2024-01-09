import React from "react";
import Icon from "../../Icon/";
import { ReactNode, useEffect } from "react";

interface IIcon {
  icon: string;
  color?: string;
  size?: number;
  className?: string;
  style?: {};
  onClick?: (e: any) => void;
}

interface IProps {
  name?: string;
  text?: string;
  type: "submit" | "button" | "reset";
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hasIcon?: boolean;
  className?: string;
  icon?: IIcon;
  autoFocus?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  style?: {};
}

const Button = (props: IProps, ref: any): JSX.Element => {
  useEffect(() => {}, [props.disabled]);

  return (
    <button
      ref={ref}
      disabled={props.loading || props.disabled}
      autoFocus={props.autoFocus}
      name={props.name}
      onClick={(e) => props.onClick(e)}
      type={props.type}
      className={`flex items-center justify-center ${props.className} ${
        props.loading ? "cursor-wait" : ""
      } ${props.disabled ? "cursor-not-allowed" : ""}`}
    >
      {props.loading ? (
        <span dir="rtl">لطفا منتظر بمانید ...</span>
      ) : (
        props.text
      )}
      {props.hasIcon && (
        <Icon
          icon={props.icon?.icon}
          color={props.icon?.color}
          size={props.icon?.size}
          style={props.icon?.style}
          className={props.icon?.className}
        />
      )}
      {props.children}
    </button>
  );
};

export default React.forwardRef(Button);
