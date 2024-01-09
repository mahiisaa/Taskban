import { useRef, useState, useEffect } from "react";
import ColumnContainer from "./ColumnContainer";
import style from "./style.module.css";
import Button from "../../Common/Form/Button";
import TaskModal from "../TaskModal";
import React from "react";
import NewBoardModal from "./NewBoardModal";
import { IBoard } from "../../../interfaces/board";
import { useDraggable } from "react-use-draggable-scroll";
import { selectBoard } from "../../../features/board/boardSlice";
import { useSelector } from "react-redux";

const ColumnView: React.FC = (): JSX.Element => {
  const state = useSelector(selectBoard);
  const [boardTasks, setBoardTasks] = useState<IBoard[]>();
  const [newBoardModal, setNewBoardModal] = useState<boolean>(false);
  const [taskModal, setTaskModal] = useState<boolean>(false);

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const handleTaskModal = () => {
    setTaskModal(!taskModal);
  };

  const handleNewBoardModal = () => {
    setNewBoardModal(!newBoardModal);
  };

  useEffect(() => {
    console.log(2)
    setBoardTasks(state.boards);
  }, [state]);

  return (
    <>
      <div
        ref={ref}
        {...events}
        className={`flex w-full px-S h-full items-start gap-6 overflow-x-auto pb-4
         ${style.scroll}`}
        style={{ direction: "rtl" }}
      >
        {boardTasks?.map((item) => {
          return <ColumnContainer key={item.id} {...item} />;
        })}

        <Button
          type="button"
          text="ساختن برد جدید"
          hasIcon={true}
          icon={{ icon: "plus", size: 20 }}
          onClick={handleNewBoardModal}
          className="flex flex-row-reverse w-[250px] h-[44px] py-XS px-[12px] items-center rounded-2xl shrink-0 shadow-taskColumn text-base font-medium"
        />
      </div>
      <Button
        text="تسک جدید"
        onClick={handleTaskModal}
        type="button"
        className="z-20 bg-brand-primary text-white w-[118px] text-sm  justify-center items-center rounded-md fixed bottom-[30px] py-XS px-3 gap-1 left-2XL font-extrabold"
        hasIcon={true}
        icon={{
          icon: "plus_square",
          color: "white",
          size: 24,
        }}
      />
      {taskModal && <TaskModal modal={taskModal} setModal={handleTaskModal} />}
      {newBoardModal && (
        <NewBoardModal modal={newBoardModal} setModal={handleNewBoardModal} />
      )}
    </>
  );
};

export default ColumnView;
