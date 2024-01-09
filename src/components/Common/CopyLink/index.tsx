import { toast } from "react-toastify";
import Button from "../Form/Button";
import Icon from "../Icon";
import { useEffect } from "react";

interface IProps {
  privateLink: string;
}

const CopyLink: React.FC<IProps> = ({ privateLink }): JSX.Element => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(privateLink);
    toast.success("لینک با موفقیت در کلیپ بورد کپی شد.");
  };

  return (
    <>
      <Button
        text="کپی لینک"
        type="button"
        onClick={handleCopyLink}
        className="dark:text-[#bac4c8] hover:dark:text-[#323232] h-[26px] rounded-md border-[1px] px-3 pt-[3px] pb-0.5 border-[#E9EBF0] hover:bg-copyLink text-xs text-black"
      />
      <div className="flex items-center gap-[8px]">
        <p className="text-sm text-black dark:text-[#bac4c8]">لینک خصوصی </p>
        <Icon icon="link" color="#323232" size={20} />
      </div>
    </>
  );
};

export default CopyLink;
