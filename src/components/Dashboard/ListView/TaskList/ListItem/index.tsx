import { ITask } from "../../../../../interfaces/task";
import { dateConvert } from "../../../../../utils/dateConvert";
import { flagColor } from "../../../../../utils/flagColor";
import Icon from "../../../../Common/Icon";
import MembersThumb from "../../../../Common/MembersThumb";
import Description from "./Description";
import ListItemTitle from "./ListItemTitle";

interface IListItemProps extends ITask {
  boardId: number;
  boardTitle: string;
  color: string;
}

const ListItem: React.FC<IListItemProps> = ({
  name,
  priority,
  deadline,
  members,
  id,
  boardId,
  boardTitle,
  color,
}): JSX.Element => {
  const { month, day } = dateConvert(deadline);

  return (
    <div className="flex w-full py-[7px] justify-between items-center">
      <section className="flex items-start gap-[7px] mr-6">
        <div
          className={`w-S h-S rounded-[3px] bg-[#00000] `}
          style={{ backgroundColor: color }}
        ></div>

        <span className="dark:text-[#bac4c8] text-[#0E0E0E] text-xs font-normal">
          {name}
        </span>
      </section>
      <section className="flex items-center gap-[70px]">
        <div className="flex w-[70px] px-2.5 justify-center items-center gap-2.5 text-xs font-normal dark:text-[#bac4c8] text-[#0E0E0E]">
          <MembersThumb members={members} />
        </div>
        <ListItemTitle
          title={
            <>
              {day} {month}
            </>
          }
        />
        <ListItemTitle
          title={<Icon icon="flag" size={16} color={flagColor(priority)} />}
        />
        <Description taskId={id} boardId={boardId} boardTitle={boardTitle} />
      </section>
    </div>
  );
};

export default ListItem;
