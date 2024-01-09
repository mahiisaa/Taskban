interface IProps extends React.PropsWithChildren {}

const SideBar :React.FC<IProps> = ({children}):JSX.Element => {
    return (
      <div className="flex flex-col text-center item-center bg-white w-[340px] min-h-screen pl-S border-l-2 border-lightgray_300">
        {children}
      </div>
    );
  }
  
export default SideBar;