import Checkmark from "./Checkmark";
import Tag from "../../../../Dashboard/Tag";
import { useState } from "react";
import More from "./More";
import Icon from "../../../../Common/Icon";
import { ITask } from "../../../../../interfaces/task";
import MembersThumb from "../../../../Common/MembersThumb";
import { baseAppURL } from "../../../../../config/axios.config";
import { useSearchParams } from "react-router-dom";
import { dateConvert } from "../../../../../utils/dateConvert";
import { flagColor } from "../../../../../utils/flagColor";

interface ITaskCardProps extends ITask {
  boardId: number;
  boardTitle: string;
}

const TaskCard: React.FC<ITaskCardProps> = ({
  thumbnail,
  name,
  id,
  boardId,
  priority,
  boardTitle,
  deadline,
  members,
}): JSX.Element => {
  const { fullDate, month, day, weekday } = dateConvert(deadline);
  const [searchParams] = useSearchParams();
  const [isShown, setIsShown] = useState<boolean>(false);

  return (
    <article
      className="dark:bg-[#323232] flex w-[249px] mx-4 p-S flex-col items-end gap-S rounded-2xl bg-white shadow-taskCard"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {thumbnail && (
        <img
          src={`${baseAppURL}${thumbnail}`}
          alt="task-img"
          className={`h-[134px] self-stretch rounded-[4px] bg-lightgray object-cover bg-no-repeat`}
        />
      )}
      <section className="flex justify-between items-start gap-2.5 self-stretch">
        <div className="m-3.5">
          <MembersThumb members={members} size={24} />
        </div>
        <div className="flex flex-col items-end gap-2.5 ">
          <span className="dark:text-[#bac4c8] text-[#534D60] text-xs font-normal">
            {searchParams.get("project_name")}
          </span>
          <span className="dark:text-white text-[#0E0E0E] text-xs  font-normal">
            {name}
          </span>
        </div>
      </section>

      <section className="flex items-start gap-XS">
        <Checkmark date={fullDate} />
        <div className="flex justify-end items-center gap-0.5">
          <span
            className="dark:text-[#bac4c8] text-[#343434] text-xs tracking-wide  font-normal"
            style={{ direction: "rtl" }}
          >
            {day}
            &nbsp;
            {month}
            &nbsp; &#45; &nbsp;
            {weekday}
          </span>
          <Icon icon="flag" size={14} color={flagColor(priority)} />
        </div>
      </section>
      <section className="flex items-start gap-XS">
        <Tag color="grape" text="پروژه" />
        <Tag color="blue" text="درس" />
      </section>
      <More
        isShown={isShown}
        taskId={id}
        boardId={boardId}
        boardTitle={boardTitle}
      />
    </article>
  );
};
export default TaskCard;
