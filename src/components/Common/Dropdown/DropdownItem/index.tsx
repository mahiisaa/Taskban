import Icon from "../../Icon";

interface IProps {
  title: string;
  color?: string;
  description?: string;
  hasIcon?: boolean;
  icon?: IIcon;
  isButton?: boolean;
  hasDescription?: boolean;
  bgcolor?: string;
  id?: number;
  onClick?: (id: number, title: string) => void;
}

interface IIcon {
  size?: number;
  color?: string;
  icon?: string;
}

const DropdownItem: React.FC<IProps> = ({
  id = 0,
  title,
  color,
  description,
  hasIcon = false,
  icon,
  isButton,
  hasDescription,
  bgcolor,
  onClick = () => {},
}): JSX.Element => {
  const handleClick = () => {
    onClick(id, title);
  };

  return (
    <div
      className={`flex flex-col rounded-md font-bold hover:dark:text-[#323232] ${
        isButton
          ? "bg-brand-primary text-white rounded-md px-2 font-normal hover:dark:text-white"
          : "hover:bg-lightgray_100"
      }`}
    >
      <div
        className="flex items-center flex-row-reverse cursor-pointer p-2"
        onClick={handleClick}
      >
        {hasIcon && (
          <Icon
            icon={icon?.icon}
            color={isButton ? "#fff" : icon?.color}
            size={icon?.size}
          />
        )}
        {bgcolor ? (
          <span className={`bg-${bgcolor} text-${color} rounded-2xl px-3`}>
            {title}
          </span>
        ) : (
          <p className="text-sm" style={{ color }}>
            {title}
          </p>
        )}
      </div>
      {hasDescription && (
        <p className="text-xs font-yekan font-normal p-1">{description}</p>
      )}
    </div>
  );
};

export default DropdownItem;
