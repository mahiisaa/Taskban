import Icon from "../../../../../Common/Icon";
interface ICheckmarkProps {
  date: string;
}
const Checkmark: React.FC<ICheckmarkProps> = ({ date }): JSX.Element => {
  return (
    <div className="flex justify-end items-center gap-1">
      <span className="text-[#BDC0C6] text-xs leading-5 font-normal">
        {date}
      </span>
      <div className="flex w-4 h-4 justify-center items-center">
        <Icon size={18} icon="check_round_square" color="#BDC0C6" />
      </div>
    </div>
  );
};
export default Checkmark;
