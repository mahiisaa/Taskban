import { Link } from "react-router-dom";
import Icon from "../Icon";

interface IProps {
  url?: string;
  text: string;
  icon: string;
  className?: string;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
const IconItem: React.FC<IProps> = ({
  url,
  text,
  icon,
  className,
  color,
  onClick,
}): JSX.Element => {
  return (
    <li>
      {url ? (
        <Link
          to={`/${url}`}
          className={`flex flex-row justify-end items-center py-[4px] px-[8px] rounded ${className}`}
        >
          <h3 className="mr-[11px] text-xl">{text}</h3>
          <Icon icon={icon} color={color}></Icon>
        </Link>
      ) : (
        <div
          className="flex flex-row justify-end items-center py-[4px] px-[8px] rounded"
          onClick={onClick}
        >
          <h3 className="mr-[11px] text-sm">{text}</h3>
          <Icon icon={icon} color={color} size={20}></Icon>
        </div>
      )}
    </li>
  );
};

export default IconItem;
