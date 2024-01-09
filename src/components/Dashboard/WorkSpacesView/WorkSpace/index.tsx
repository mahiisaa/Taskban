import { useRef, useState } from "react";
import WorkSpacesItem from "./WorkSpaceItem";
import { useDraggable } from "react-use-draggable-scroll";
import style from "./style.module.css";
import Icon from "../../../Common/Icon";
import API_URL from "../../../../constants/api.url";
import ProjectModal from "../../ProjectModal";
import { useLocation, useNavigate } from "react-router-dom";
import { projects } from "../../../../constants/url";
import { IProjects } from "../../../../interfaces/projects";
import Button from "../../../Common/Form/Button";

interface IWorkSpaceProps {
  name: string;
  color: string;
  id: number;
  projectsData: IProjects[];
}
const WorkSpace: React.FC<IWorkSpaceProps> = ({
  name,
  color,
  id,
  projectsData,
}): JSX.Element => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [projectModal, setProjectModal] = useState<boolean>(false);

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const colorVariants = {
    grad: `linear-gradient(250deg, ${color} 0%, ${color}90 100%)`,
    btn: color,
  };

  const handleModal = () => {
    if (pathname === "/workspaces") {
      navigate(`${id}/${API_URL.Projects}`);
    } else {
      navigate(`/${projects.gets({ wid: id })}`);
    }
    setProjectModal(!projectModal);
  };

  return (
    <div className={` w-full`} style={{ direction: "rtl" }}>
      <div className="shrink-0 ">
        <div className="flex items-center gap-2">
          <h4 className="text-right text-2xl leading-8 font-extrabold">
            {name}
          </h4>
          <Button
            type="button"
            hasIcon={true}
            icon={{
              icon: "plus_square",
              color: `${colorVariants.btn}`,
              size: 24,
            }}
            className="mt-1.5"
            onClick={handleModal}
          />
        </div>

        <div
          ref={ref}
          {...events}
          className={`flex overflow-auto ${style.scroll} items-start gap-L py-L`}
        >
          {projectsData?.map((item) => {
            return (
              <WorkSpacesItem
                key={item.id}
                {...item}
                workspace_id={id}
                color={colorVariants.grad}
              />
            );
          })}
        </div>
        <div className=" w-full h-0.5 bg-gray-secondary"></div>
      </div>
      {projectModal && (
        <ProjectModal modal={projectModal} setModal={handleModal} wid={id} />
      )}
    </div>
  );
};

export default WorkSpace;
