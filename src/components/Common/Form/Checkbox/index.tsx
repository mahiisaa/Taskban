interface IProps {
  name: string;
  id: string;
  type: "checkbox";
  label?: string;
  hasLabel: boolean;
  onChange: (name: string, value: boolean) => void;
  onClick:()=>void,
  className
}

const Checkbox: React.FC<IProps> = ({
  name,
  id,
  type,
  label,
  hasLabel,
  onChange,
  onClick,
  className
}): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.checked);
  };

  return (
    <div className="flex justify-end items-center gap-XS">
      {hasLabel && (
        <label onClick={onClick} className={`text-base font-medium ${className}`}>
          {label}
        </label>
      )}
      <input
        name={name}
        id={id}
        type={type}
        onChange={handleChange}
        className={`w-5 h-5 rounded border border-[#999]`}
      />
    </div>
  );
};

export default Checkbox;
