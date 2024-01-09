import Icon from "../../Icon";
import Button from "../Button";

interface IProps {
  hasLabel?: boolean;
  label?: string;
  id: string;
  name: string;
  inputValue: string;
  hasIcon?: boolean;
  icon?: string;
  text?: string;
  styles: string;
  onChangeFile: (name: string, value: any) => void;
}

const File: React.FC<IProps> = ({
  inputValue,
  onChangeFile,
  id,
  name,
  hasLabel,
  label,
  text,
  hasIcon,
  icon,
  styles,
}): JSX.Element => {
  const handleChange = (e) => {
    if (inputValue) {
      onChangeFile(name, "");
    } else {
      onChangeFile(e.target.name, e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-row-reverse items-center">
      {hasLabel && (
        <label
          className="dark:text-[#bac4c8] text-black text-sm font-normal leading-normal ml-S"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      {!inputValue ? (
        <label className={`dark:text-[#bac4c8] ${styles}`}>
          {text}
          {hasIcon && <Icon icon={icon} />}
          <input
            value={inputValue}
            type="file"
            id={id}
            name={name}
            hidden
            onChange={handleChange}
          />
        </label>
      ) : (
        <Button
          text=".فایل با موفقیت دریافت شد"
          type="button"
          onClick={() => { }}
          className="flex flex-row items-center text-base font-medium border border-brand-primary h-[36px] rounded-lg py-[4px] px-[8px] gap-[4px] text-center"
        >
          <Icon icon="trash" color="red" onClick={handleChange} />
        </Button>
      )}
    </div>
  );
};

export default File;
