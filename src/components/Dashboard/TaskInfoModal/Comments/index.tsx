import { IComment } from "../../../../interfaces/comments";
import Icon from "../../../Common/Icon";
import ProfileImage from "../../../Common/ProfileImage";
interface ICommentProps extends IComment {
  first_name: string;
  last_name: string;
  img: string;
  remove: (id: number) => {};
}
const Comments: React.FC<ICommentProps> = ({
  author,
  text,
  last_name,
  first_name,
  img,
  remove,
  id,
}): JSX.Element => {
  return (
    <section className="flex w-full flex-row-reverse  shrink-0  gap-2 p-3">
      <div>
        <ProfileImage firstName={first_name} lastName={last_name} img={img} />
      </div>
      <div className="p-3  w-full flex flex-col items-end gap-XS rounded-xl border border-[#5250503f]">
        <div className="flex w-full justify-between items-center ">
          <div
            className=" cursor-pointer mt-1"
            onClick={() => {
              remove(id);
            }}
          >
            <Icon icon="trash" size={18} color="#FA5252" />
          </div>
          <div className="text-[#aaa] text-xs font-normal">
            <span className="text-brand-primary font-extrabold  text-base">
              شما
            </span>
            &nbsp;&nbsp;کامنت گذاشتید
          </div>
        </div>
        <div className="dark:text-[#bac4c8] text-black font-normal text-xs">
          {text}
        </div>
      </div>
    </section>
  );
};

export default Comments;
