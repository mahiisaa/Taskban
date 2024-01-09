import { useState } from "react";
import Modal from "../..";
import Button from "../../../Form/Button";
import PickColor from "../PickColor";
import { Dispatch, SetStateAction } from "react";
import Input from "../../../Form/Input";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean | ((prevState: boolean) => boolean)) => void;
  workSpaceInfo: { name?: string; color?: string };
  setWorkSpaceInfo: Dispatch<
    SetStateAction<{ name?: string; color?: string }>
  >;
}

const CreateWorkSpace: React.FC<IProps> = ({
  isModalOpen,
  setIsModalOpen,
  workSpaceInfo,
  setWorkSpaceInfo,
}): JSX.Element => {
  const [isPickColorOpen, setIsPickColorOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    workSpaceInfo?.color
  );

  const handleChange = (name: string, value: string) => {
    setWorkSpaceInfo({
      ...workSpaceInfo,
      name: value,
    });
  };

  const handleNewWorkspaceClick = () => {
    setIsPickColorOpen(true);
    setIsModalOpen(false);
  };

  const handleResetInput = () => {
    setWorkSpaceInfo({
      ...workSpaceInfo,
      name: "",
      color: "",
    });
    if (selectedColor) setSelectedColor("disable");
  };

  return (
    <>
      <Modal
        modal={isModalOpen}
        setModal={setIsModalOpen}
        hasHeader={true}
        header={{ text: "ساختن ورک‌اسپیس جدید‌", order: 2 }}
        hasBackIcon={false}
        backIcon={{ order: 1 }}
        hasCloseIcon={true}
        closeIcon={{ order: 3, resetInputValue: handleResetInput }}
      >
        <div className="flex flex-col gap-XL w-[500px] pt-0">
          <div className="flex flex-col gap-[8px]" dir="rtl">
            <Input
              name="workSpaceName"
              id="workSpaceName"
              type="text"
              label="نام ورک‌اسپیس"
              hasLabel={true}
              className="h-XL rounded-md border border-[#aaaaaa] text-sm outline-none pr-1 bg-white"
              onChange={(name, value) => handleChange(name, value)}
              inputValue={workSpaceInfo.name}
              autoFocus={true}
            />
          </div>
          <Button
            disabled={!workSpaceInfo.name}
            text="ادامه"
            type="button"
            onClick={handleNewWorkspaceClick}
            className="flex h-XL rounded-md bg-brand-primary text-white"
          />
        </div>
      </Modal>
      <PickColor
        isPickColorOpen={isPickColorOpen}
        setIsPickColorOpen={setIsPickColorOpen}
        setIsModalOpen={setIsModalOpen}
        workSpaceInfo={workSpaceInfo}
        setWorkSpaceInfo={setWorkSpaceInfo}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </>
  );
};

export default CreateWorkSpace;
