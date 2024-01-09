import list from "./list";
import styles from "./style.module.css";
import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

interface IProps {
  color?: string;
  icon: string | undefined;
  size?: number;
  style?: {};
  className?: string;
  onClick?: (e: any) => void;
}

const Icon = React.forwardRef(
  (props: IProps, ref: React.LegacyRef<HTMLSpanElement> | undefined) => {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
      <span
        ref={ref}
        className={`${styles.inlineBlock} ${props.className}`}
        style={props.style}
        onClick={props.onClick}
      >
        {list[`${props.icon}`](
          props.color
            ? props.color
            : isDarkTheme === true
            ? "#bac4c8"
            : "#323232",
          props.size ? props.size : 24
        )}
      </span>
    );
  }
);

export default Icon;
