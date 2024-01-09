interface ITagProps {
  color: string;
  text: string;
}
const Tag: React.FC<ITagProps> = ({ color, text }): JSX.Element => {
  const colorVariants = {
    blue: "bg-blue-secondary text-blue-primary",
    grape: "bg-grape-secondary text-grape-primary",
  };

  return (
    <div
      className={`inline-flex h-M px-XS justify-center items-center rounded-[14px] text-xs leading-normal font-extrabold  ${
        colorVariants[color as keyof typeof colorVariants]
      } `}
    >
      {text}
    </div>
  );
};

export default Tag;
