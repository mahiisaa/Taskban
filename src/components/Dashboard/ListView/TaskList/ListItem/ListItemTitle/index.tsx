interface IListItemTitleProps {
  title: any;
}
const ListItemTitle: React.FC<IListItemTitleProps> = ({
  title,
}): JSX.Element => {
  return (
    <div className="dark:text-[#bac4c8] flex w-[70px] px-2.5 justify-center items-center gap-2.5 text-xs font-normal text-[#0E0E0E]">
      {title}
    </div>
  );
};

export default ListItemTitle;
