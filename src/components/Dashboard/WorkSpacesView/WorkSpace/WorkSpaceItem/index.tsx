import { useLocation, useNavigate } from "react-router-dom";
import API_URL from "../../../../../constants/api.url";
import { boards } from "../../../../../constants/url";

interface IWorkSpacesItemProps {
  color: string;
  name: string;
  id: number;
  workspace_id: number;
}
const WorkSpacesItem: React.FC<IWorkSpacesItemProps> = ({
  color,
  name,
  id,
  workspace_id,
}): JSX.Element => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (pathname === "/workspaces") {
      navigate(
        `/${boards.gets({ wid: workspace_id, pid: id })}?project_name=${name}`
      );
    } else {
      navigate(`${id}/${API_URL.Boards}?project_name=${name}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex justify-center w-[200px] cursor-pointer shrink-0 h-20 text-center items-center rounded-2xl shadow-taskColumn text-white text-base font-extrabold"
      style={{ background: `${color}` }}
    >
      {name.substring(0, 20)} {name.length > 20 ? " ..." : ""}
    </div>
  );
};

export default WorkSpacesItem;
