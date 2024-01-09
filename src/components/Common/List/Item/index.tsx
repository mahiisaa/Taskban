import React, { useEffect, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import Dropdown from "../../Dropdown";
import DropdownItem from "../../Dropdown/DropdownItem";
import { useNavigate, useParams } from "react-router-dom";
import ProjectModal from "../../../Dashboard/ProjectModal";
import { createPortal } from "react-dom";
import NameEdit from "./modals/NameEdit";
import { useDispatch } from "react-redux";
import Button from "../../Form/Button";
import ColorEdit from "./modals/ColorEdit";
import { toast } from "react-toastify";
import AlertModal from "./modals/AlertModal";
import ShareModal from "../../../Dashboard/ShareModal";
import TaskModal from "../../../Dashboard/TaskModal";
import { useReducer } from "react";
import { detailsReducer } from "../../../../utils/reducer/reducer";
import { workspaces, projects, boards } from "../../../../constants/url";
import { IProjects } from "../../../../interfaces/projects";
import {
  removeProject,
  removeWorkspace,
} from "../../../../features/workspace/workspaceSlice";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";

interface IProps {
  id: number;
  name: string;
  color: string;
  projectsData: IProjects[];
}

const portals = document.getElementById("portals") as Element;

const ListItem: React.FC<IProps> = ({
  projectsData,
  id,
  name,
  color,
}): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [workspace, setWorkspace] = useState({ id: 0 });
  const [project, setProject] = useState({ id: 0, name: "" });
  const [listToggle, setListToggle] = useState(false);
  const [responseDelete, errorDel, loadingDel, fetcherDel] = useAxios();
  const params = useParams();
  const [deleteEvent, setDeleteEvent] = useState("")
  const [state, stateDispatch] = useReducer(detailsReducer, {
    projectModal: false,
    workspaceNameEdit: false,
    projectNameEdit: false,
    colorEdit: false,
    workspaceAlert: false,
    projectAlert: false,
    shareProject: false,
    shareWorkspace: false,
    newTask: false,
  });
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const toggleAccordion = () => {
    // navigate(projects.gets({ wid: id }));
    setListToggle(!listToggle);
  };

  const handleActions = (type) => {
    stateDispatch({ type });
    if (type === "projectModal") {
      navigate(`${projects.gets({ wid: id })}`);
    }
  };

  const handleCopyProjectLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("لینک با موفقیت در کلیپ بورد کپی شد.");
  };

  const handleNewTaskBtn = () => {
    handleActions("projectModal");

    // force component rerender : )
    setWorkspace({ id });
  };

  const handleWorkspaceRemove = () => {
    setDeleteEvent("workspace")
    fetcherDel("delete", workspaces.delete({ wid: id ? id : workspace.id }));
  };

  const handleProjectRemove = () => {
    setDeleteEvent("project")
    fetcherDel(
      "delete",
      projects.delete({ wid: id, pid: params.pid ? params.pid : project.id })
    );
  };

  useEffect(() => {
    if (deleteEvent && responseDelete) {
      if (deleteEvent === "workspace") {
        dispatch(removeWorkspace(id));
        state.workspaceAlert = false;
      } else {
        dispatch(removeProject({ wid: id, pid: project.id }));
        state.projectAlert = false;
      }      
      toast.success("آیتم مورد نظر با موفقیت حذف شد.");
      navigate("workspaces");
      setDeleteEvent("")
    }
  }, [responseDelete, project.id, workspace.id, projectsData]);

  return (
    <li>
      <div
        className="flex justify-between items-center flex-row-reverse p-1 h-[36px] mt-S rounded-md hover:bg-[#f4f4f4] hover:dark:text-[#323232] mb-4"
        style={{
          backgroundColor: id === Number(params.wid) ? "#f4f4f4" : "",
          color:
            isDarkTheme === true && id === Number(params.wid) ? "#323232" : "",
        }}
      >
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={toggleAccordion}
        >
          {name.length > 20 ? " ..." : ""} {name.substring(0, 20)}
          <span
            className={`w-[20px] h-[20px] rounded-md ml-XS inline-block`}
            style={{ backgroundColor: color }}
          ></span>
        </div>

        <span
          onClick={() => {
            setWorkspace({ id });
          }}
        >
          <Dropdown
            type="icon"
            icon={{
              icon: "dots",
              color:
                isDarkTheme === true && id === Number(params.wid)
                  ? "#323232"
                  : "",
            }}
          >
            <DropdownItem
              title="ساختن پروژه جدید"
              hasIcon={true}
              icon={{ icon: "plus" }}
              onClick={() => handleActions("projectModal")}
            />
            <DropdownItem
              title="ویرایش نام ورک اسپیس"
              hasIcon={true}
              icon={{ icon: "edit" }}
              onClick={() => handleActions("workspaceNameEdit")}
            />
            <DropdownItem
              title="ویرایش رنگ"
              hasIcon={true}
              icon={{ icon: "color" }}
              onClick={() => handleActions("colorEdit")}
            />
            <DropdownItem
              title="کپی لینک"
              hasIcon={true}
              icon={{ icon: "link" }}
              onClick={() => handleActions("copyLink")}
            />
            <DropdownItem
              title="حذف"
              hasIcon={true}
              icon={{ icon: "trash", color: "red" }}
              color="red"
              onClick={() => handleActions("workspaceAlert")}
            />
            <DropdownItem
              title="اشتراک گذاری"
              hasIcon={true}
              icon={{ icon: "share" }}
              isButton={true}
              onClick={() => handleActions("shareWorkspace")}
            />
          </Dropdown>
        </span>
      </div>
      {listToggle && (
        <ul>
          {projectsData?.map((project: any) => (
            <li
              style={{
                backgroundColor:
                  project.id === Number(params.pid) ? "#D0EBFF" : "",
                color:
                  isDarkTheme === true && project.id === Number(params.pid)
                    ? "#323232"
                    : "",
              }}
              key={project.id}
              className="flex rounded-md justify-between items-center flex-row-reverse p-[4px] h-[36px] pr-[30px] my-S"
            >
              <p
                className="flex items-center cursor-pointer"
                onClick={() => {
                  navigate(
                    `${boards.gets({
                      wid: id,
                      pid: project.id,
                    })}?project_name=${project.name}`
                  );
                }}
              >
                {project.name.length > 20 ? " ..." : ""}{" "}
                {project.name.substring(0, 20)}
              </p>
              <span
                onClick={() => {
                  setProject(project);
                }}
              >
                <Dropdown
                  type="icon"
                  icon={{
                    icon: "dots",
                    color:
                      isDarkTheme === true && id === Number(params.wid)
                        ? "#323232"
                        : "",
                  }}
                >
                  <DropdownItem
                    onClick={() => handleActions("newTask")}
                    title="ساختن تسک جدید"
                    hasIcon={true}
                    icon={{ icon: "plus" }}
                  />
                  <DropdownItem
                    onClick={() => handleActions("projectNameEdit")}
                    title="ویرایش نام پروژه"
                    hasIcon={true}
                    icon={{ icon: "edit" }}
                  />
                  <DropdownItem
                    onClick={handleCopyProjectLink}
                    title="کپی لینک"
                    hasIcon={true}
                    icon={{ icon: "link" }}
                  />
                  <DropdownItem
                    onClick={() => handleActions("projectAlert")}
                    title="حذف"
                    hasIcon={true}
                    icon={{ icon: "trash", color: "red" }}
                    color="red"
                  />
                  <DropdownItem
                    onClick={() => handleActions("shareProject")}
                    title="اشتراک گذاری"
                    hasIcon={true}
                    icon={{ icon: "share" }}
                    isButton={true}
                  />
                </Dropdown>
              </span>
            </li>
          ))}
          {!projectsData?.length && projectsData && (
            <Button
              text="ساختن پروژه جدید"
              onClick={handleNewTaskBtn}
              type="button"
              className="text-brand-primary mt-2 h-L text-sm font-bold leading-normal self-stretch rounded-md border border-brand-primary mb-L w-full"
            />
          )}
        </ul>
      )}
      {createPortal(
        <>
          {state.projectNameEdit && (
            <NameEdit
              currentID={project.id}
              value={state.projectNameEdit}
              setValue={() => handleActions("projectNameEdit")}
              previousValue={project.name}
              type="project"
            />
          )}
          {state.projectAlert && (
            <AlertModal
              isAlertOpen={state.projectAlert}
              setIsAlertOpen={() => handleActions("projectAlert")}
              alertText="آیا از حذف کردن این پروژه مطمئن هستید؟"
              className=""
              handleYes={handleProjectRemove}
            />
          )}
          {state.newTask && (
            <TaskModal
              wid={id}
              pid={project.id}
              modal={state.newTask}
              setModal={() => handleActions("newTask")}
            />
          )}
          {state.projectModal && (
            <ProjectModal
              modal={state.projectModal}
              setModal={() => handleActions("projectModal")}
              wid={workspace.id}
            />
          )}

          {state.workspaceNameEdit && (
            <NameEdit
              currentID={workspace.id}
              value={state.workspaceNameEdit}
              setValue={() => handleActions("workspaceNameEdit")}
              previousValue={name}
              type="workSpace"
            />
          )}

          {state.colorEdit && (
            <ColorEdit
              currentID={id}
              value={state.colorEdit}
              setValue={() => handleActions("colorEdit")}
              previousValue={color}
            />
          )}
          {state.workspaceAlert && (
            <AlertModal
              isAlertOpen={state.workspaceAlert}
              setIsAlertOpen={() => handleActions("workspaceAlert")}
              alertText="آیا از حذف کردن این ورک اسپیس مطمئن هستید؟"
              handleYes={handleWorkspaceRemove}
            />
          )}

          {state.shareWorkspace && (
            <ShareModal
              modal={state.shareWorkspace}
              setModal={() => handleActions("shareWorkspace")}
              title="اشتراک گذاری ورک اسپیس"
              dataID={{ wid: id }}
            />
          )}
          {state.shareProject && (
            <ShareModal
              modal={state.shareProject}
              setModal={() => handleActions("shareProject")}
              title="اشتراک گذاری پروژه"
              dataID={{ wid: id, pid: project.id }}
            />
          )}
        </>,
        portals
      )}
    </li>
  );
};
export default ListItem;
