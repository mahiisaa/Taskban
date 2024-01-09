interface IHeaderTitleProps {
  title: string;
}
const HeaderTitle: React.FC<IHeaderTitleProps> = ({ title }): JSX.Element => {
  return (
    <div className="dark:text-[#bac4c8] flex w-[70px] px-2.5 justify-center items-center gap-2.5 shrink-0 text-black text-base font-medium">
      {title}
    </div>
  );
};

export default HeaderTitle;
