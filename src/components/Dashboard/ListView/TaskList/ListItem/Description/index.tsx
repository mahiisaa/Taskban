import Icon from "../../../../../Common/Icon";
import {  useState } from "react";
import TaskInfoModal from "../../../../TaskInfoModal";
interface IDescriptionProps {
  taskId: number;
  boardId: number;
  boardTitle: string;
}
const Description: React.FC<IDescriptionProps> = ({
  taskId,
  boardId,
  boardTitle,
}): JSX.Element => {
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => {
          setShowTaskModal(!showTaskModal);
        }}
        className="dark:text-[#bac4c8] flex cursor-pointer w-[70px] px-2.5 justify-center items-center gap-2.5 text-xs font-normal text-[#0E0E0E]"
      >
        <Icon icon="paragraph" size={16} color="#BDC0C6" />
      </div>
      {showTaskModal && (
        <TaskInfoModal
          modal={showTaskModal}
          setModal={setShowTaskModal}
          boardTitle={boardTitle}
          boardId={boardId}
          taskId={taskId}
        />
      )}
    </>
  );
};

export default Description;
