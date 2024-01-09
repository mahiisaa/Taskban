import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import Button from "../../Common/Form/Button";
import TaskModal from "../TaskModal";
import { IBoard } from "../../../interfaces/board";
import { useSelector } from "react-redux";
import { selectBoard } from "../../../features/board/boardSlice";
import { useSearchParams } from "react-router-dom";

const ListShow: React.FC = (): JSX.Element => {
  const state = useSelector(selectBoard);
  const [boards, setBoards] = useState<IBoard[]>();
  const [isShown, setIsShown] = useState<boolean>(true);
  const [taskModal, setTaskModal] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const handleTaskModal = () => {
    setTaskModal(!taskModal);
  };

  useEffect(() => {
    setBoards(state.boards);
  }, [state]);

  return (
    <div style={{ direction: "rtl" }} className={`pr-S`}>
      <div className="flex items-center gap-XS my-L">
        <Button
          hasIcon={true}
          icon={{ icon: "chevron_down_circle", size: 24 }}
          type="button"
          className="h-6 inline"
          onClick={() => setIsShown(!isShown)}
        />
        <span className="dark:text-[#bac4c8] text-black text-xl font-extrabold">
          {searchParams.get("project_name")}
        </span>
      </div>
      <div
        className={`${
          !isShown ? "opacity-0 -z-10" : "opacity-100 z-10"
        } relative flex flex-col items-end gap-XL mr-6 ml-12 transition-all duration-300`}
      >
        {boards?.map((item) => {
          return <TaskList key={item.id} {...item} />;
        })}
      </div>
      <Button
        text="تسک جدید"
        onClick={handleTaskModal}
        type="button"
        className="z-20 bg-brand-primary text-white w-[118px] text-sm flex-row-reverse justify-center items-center rounded-md fixed bottom-[30px] py-XS px-3 gap-1 left-2XL font-extrabold"
        hasIcon={true}
        icon={{
          icon: "plus_square",
          color: "white",
          size: 24,
        }}
      />
      {taskModal && <TaskModal modal={taskModal} setModal={handleTaskModal} />}
    </div>
  );
};

export default ListShow;
