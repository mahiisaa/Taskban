import Icon from "../Icon";
import colors from "./colors";

interface IColor {
  [key: string]: string | undefined;
}
interface IProps {
  onClick: (color: IColor) => void;
  hasDisableIcon: boolean;
  handleDisableClick?: () => void;
  selected?: string | undefined;
  setSelected?: (
    value:
      | string
      | undefined
      | ((prevVar: string | undefined) => string | undefined)
  ) => void;
}

const ColorPicker: React.FC<IProps> = ({
  onClick,
  hasDisableIcon,
  handleDisableClick,
  selected,
  setSelected,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick({
      name: e.currentTarget.dataset.name,
      code: e.currentTarget.dataset.code,
    });

    if (setSelected) setSelected(e.currentTarget.dataset.code);
  };

  return (
    <>
      {hasDisableIcon && (
        <div className="flex items-center" onClick={handleDisableClick}>
          <Icon
            icon="disable"
            size={20}
            style={{ margin: 4, cursor: "pointer" }}
            data-code=""
            data-name=""
          />
        </div>
      )}
      {colors.map((color) => {
        return (
          <div
            onClick={handleClick}
            key={color.code}
            data-code={color.code}
            data-name={color.name}
            style={{
              backgroundColor: color.code === selected ? "white" : color.code,
              display: "inline-block",
              borderRadius: color.code === selected ? 13 : 9,
              margin: 2,
              cursor: "pointer",
              width: color.code === selected ? 30 : 22,
              height: color.code === selected ? 30 : 22,
              border:
                color.code === selected ? `solid 10px ${color.code}` : "none",
            }}
          ></div>
        );
      })}
    </>
  );
};

export default ColorPicker;
