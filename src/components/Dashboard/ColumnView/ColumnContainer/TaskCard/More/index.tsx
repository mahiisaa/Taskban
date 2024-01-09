import { useState } from "react";
import Icon from "../../../../../Common/Icon";
import TaskInfoModal from "../../../../TaskInfoModal";
interface IMoreProps {
  isShown: boolean;
  taskId: number;
  boardId: number;
  boardTitle: string;
}
const More: React.FC<IMoreProps> = ({
  isShown,
  taskId,
  boardId,
  boardTitle,
}): JSX.Element => {
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

  return (
    <div
      className={`${!isShown ? "h-0" : "h-10"} overflow-hidden transition-all `}
    >
      <div className="w-[217px] h-[1px] bg-[#EFF0F0] mb-S" />
      <section className="flex justify-between items-center self-stretch ">
        <span
          onClick={() => {
            setShowTaskModal(!showTaskModal);
          }}
          className="cursor-pointer"
        >
          <Icon size={20} icon="dots" />
        </span>
        <div className="flex w-4 h-4 justify-center items-center cursor-pointer">
          <Icon size={20} icon="check_circle" />
        </div>
      </section>
      {showTaskModal && (
        <TaskInfoModal
          modal={showTaskModal}
          setModal={setShowTaskModal}
          boardTitle={boardTitle}
          boardId={boardId}
          taskId={taskId}
        />
      )}
    </div>
  );
};
export default More;
