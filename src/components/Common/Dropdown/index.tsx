import { useRef, useState, useEffect } from "react";
import Icon from "../Icon";

interface IIcon {
  icon: string;
  color?: string;
  size?: number;
}

interface IProps extends React.PropsWithChildren {
  className?: string;
  type: "button" | "icon";
  icon?: IIcon;
  buttonText?: string;
  hasIcon?: boolean;
  value?: { id: number; title: string };
}

const Dropdown: React.FC<IProps> = ({
  children,
  className,
  type,
  buttonText,
  hasIcon = true,
  icon,
  value,
}): JSX.Element => {
  const dropdown = useRef<any>();
  const dropdownList = useRef<any>();
  const [open, setOpen] = useState(false);
  const [listDirection, setListDirectiob] = useState({});

  const toggleList = () => {
    setOpen(!open);
    if (!open) {
      // use setTimeout to make a delay showing dropdonw list to get it's heigth
      setTimeout(() => {
        const elementHeight =
          dropdown.current.offsetTop +
          dropdown.current.offsetHeight +
          dropdownList.current.offsetHeight;

        if (elementHeight > window.innerHeight) {
          setListDirectiob({ bottom: dropdown.current.offsetHeight });
        } else {
          setListDirectiob({ top: dropdown.current.offsetHeight });
        }
      }, 0);
    }
  };

  const closeList = () => {
    setTimeout(() => {
      if (!value?.id) {
        setOpen(false);
      }
    }, 100);
  };

  return (
    <div
      ref={dropdown}
      tabIndex={0}
      className="relative flex items-center dark:text-[#bac4c8]"
      onClick={toggleList}
      onBlur={closeList}
    >
      {type === "button" ? (
        <button
          className={`border flex items-center justify-between border-solid border-lightgray_300 rounded-md relative text-right p-XS ${className}`}
          onClick={() => {}}
          name="dropdown"
          type="button"
        >
          {hasIcon && type === "button" && <Icon icon="chevron_down" />}
          {value?.title || buttonText}
        </button>
      ) : (
        <Icon
          icon={icon?.icon}
          color={icon?.color}
          size={icon?.size}
          className="cursor-pointer"
        />
      )}
      {open && (
        <div
          ref={dropdownList}
          className={`z-10 dark:bg-[#323232] ${
            type === "icon" ? "min-w-[200px]" : "min-w-[240px]"
          } absolute w-full right-0 text-right p-2 rounded-lg shadow-select flex-col bg-white`}
          style={listDirection}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
