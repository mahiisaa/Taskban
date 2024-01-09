import TaskCard from "./TaskCard";
import TaskColumn from "./TaskColumn";
import style from "../style.module.css";
import { ITask } from "../../../../interfaces/task";

interface IColumnContainerProps {
  name: string;
  is_archive: boolean;
  id: number;
  color: string;
  tasks: ITask[];
}

const ColumnContainer: React.FC<IColumnContainerProps> = ({
  id,
  color,
  name,
  tasks,
  is_archive,
}): JSX.Element => {
  

  return (
    <div
      className="flex shrink-0 flex-col items-center gap-S"
      style={{ direction: "ltr" }}
    >
      <TaskColumn
        title={name}
        count={tasks?.length}
        boardId={id}
        color={color}
      />

      <div
        
        className={`flex w-[290px] pt-0.5 pb-10 flex-col items-center gap-3 overflow-y-auto overflow-x-hidden h-80 lg:h-[500px] xl:h-[750px]  ${style.customScrool} `}
        
      >
        {tasks?.map((item, index) => {
          return (
            <TaskCard
              boardId={id}
              boardTitle={name}
              {...item}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColumnContainer;
