import { useState } from "react";
import CreateWorkSpace from "./CreateWorkSpace";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

interface IInitialValue {
  name?: string;
  colorName?: string;
  colorCode?: string;
}

const NestedModals: React.FC<IProps> = ({
  isModalOpen,
  setIsModalOpen,
}): JSX.Element => {
  const initialValue: IInitialValue = {
    name: "",
    colorName: "",
    colorCode: "",
  };
  const [workSpaceInfo, setWorkSpaceInfo] = useState<{
    name?: string;
    colorName?: string;
    colorCode?: string;
  }>(initialValue);

  return (
      <CreateWorkSpace
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        workSpaceInfo={workSpaceInfo}
        setWorkSpaceInfo={setWorkSpaceInfo}
      />
  );
};

export default NestedModals;
