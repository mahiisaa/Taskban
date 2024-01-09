import Dropdown from "../../Dropdown";
import DropdownItem from "../../Dropdown/DropdownItem";
import Button from "../../Form/Button";
import ProfileImage from "../../ProfileImage";
import { useState } from "react";

interface IProps {
  email: string;
  thumbnail?: string;
  first_name: string;
  last_name: string;
}

const MemberRow: React.FC<IProps> = ({
  email,
  thumbnail,
  first_name,
  last_name,
}): JSX.Element => {
  const [data, setData] = useState({ id: 0, title: "" });
  const handleSelect = (id: number, title: string) => {
    setData({ id, title });
  };

  return (
    <>
      <div className="flex justify-between items-center mt-1 h-[37px]">
        {true ? (
          <Button
            onClick={() => {}}
            text="دسترسی کامل"
            type="button"
            className="hover:dark:text-[#323232] h-[30px] rounded-md border-[1px] px-2 pt-[5px] pb-1 gap-[10px] hover:bg-[#E9EBF0] border-[#E9EBF0] text-xs"
          />
        ) : (
          <Dropdown
            value={data}
            buttonText="دسترسی کامل"
            type="button"
            icon={{ icon: "dots" }}
            className="h-[30px] rounded-md border-[1px] px-2 pt-[5px] pb-1 gap-[10px] hover:bg-[#E9EBF0] border-[#E9EBF0] text-xs"
          >
            <DropdownItem
              onClick={(id, title) => {
                handleSelect(id, title);
              }}
              id={1}
              title="دسترسی کامل"
              hasDescription={true}
              description="توانایی ساختن تسک در این پروژه، ویرایش تنظبمات پروژه و حذف پروژه"
            />
            <DropdownItem
              onClick={(id, title) => {
                handleSelect(id, title);
              }}
              id={2}
              title="دسترسی ویرایش"
              hasDescription={true}
              description="توانایی ساختن تسک در این پروژه، ویرایش تنظبمات پروژه و حذف پروژه"
            />
            <DropdownItem
              onClick={(id, title) => {
                handleSelect(id, title);
              }}
              id={3}
              title="دسترسی کامنت"
              hasDescription={true}
              description="توانایی ساختن تسک در این پروژه، ویرایش تنظبمات پروژه و حذف پروژه"
            />
            <DropdownItem
              onClick={(id, title) => {
                handleSelect(id, title);
              }}
              id={4}
              title="فقط دسترسی مشاهده"
              hasDescription={true}
              description="توانایی ساختن تسک در این پروژه، ویرایش تنظبمات پروژه و حذف پروژه"
            />
          </Dropdown>
        )}

        <div className="flex gap-[12px]">
          {true ? (
            <span className="h-[29px] rounded-md px-2 py-1 gap-[10px] bg-blue-secondary text-xs text-blue-primary text-center mt-1">
              workspace owner
            </span>
          ) : (
            ""
          )}
          <span className="text-sm dark:text-[#bac4c8] text-black mt-[5px]">
            {true ? "من" : email}
          </span>
          <ProfileImage
            img={thumbnail}
            firstName={first_name}
            lastName={last_name}
            size={35}
          />
        </div>
      </div>
    </>
  );
};

export default MemberRow;
