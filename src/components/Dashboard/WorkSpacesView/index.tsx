import WorkSpace from "./WorkSpace";
import { selectWorkspace } from "../../../features/workspace/workspaceSlice";
import { useSelector } from "react-redux";

const WorkSpaces: React.FC = (): JSX.Element => {
  const state = useSelector(selectWorkspace);

  return (
    <div className="w-full h-full pt-12 pr-8 ">
      <div className="flex flex-col items-end gap-L">
        {state.workspaces?.map((item) => {
          return (
            <WorkSpace
              key={item.id}
              {...item}
              projectsData={item.projects}
            />
          );
        })}
      </div>
    </div>
  );
};
export default WorkSpaces;
