import { useState } from "react";

interface IProps {
  inputValue?: string,
  rows?: number,
  name: string;
  id: string;
  label?: string;
  hasLabel?: boolean;
  placeholder?: string; 
  onChange: (name: string, value: string) => void;
  className?: string;
  autoFocus?: boolean
  style?:{}
}

const Textarea: React.FC<IProps> = ({
  inputValue,
  rows,
  autoFocus = false,
  name,
  id,
  label,
  hasLabel = false,
  placeholder,
  onChange,
  className,
  style,
}): JSX.Element => {
  const [value, setValue] = useState(inputValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange(e.target.name, e.target.value);
  };

  return (
    <>
      <div className="text-right flex flex-col gap-XS">
        {hasLabel && (
          <label
            className="text-black text-sm font-normal leading-normal"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center justify-end">
          <textarea
            autoFocus = {autoFocus}
            value={value}
            placeholder={placeholder}
            name={name}
            id={id}
            rows={rows}
            dir="rtl"
            onChange={handleChange}
            className={`rounded-md border resize-none border-lightgray px-2 text-right w-full ${className}`}
            style={style}
          />        
        </div>       
      </div>
    </>
  );
};

export default Textarea;
