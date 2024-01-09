import Dropdown from "../../../../../Common/Dropdown";
import DropdownItem from "../../../../../Common/Dropdown/DropdownItem";
import Icon from "../../../../../Common/Icon";
import TaskModal from "../../../../TaskModal";
import { useEffect, useState } from "react";
import { useReducer } from "react";
import { boardDetailsReducer } from "../../../../../../utils/reducer/boardDetails";
import { createPortal } from "react-dom";
import NameEdit from "../../../../../Common/List/Item/modals/NameEdit";
import { toast } from "react-toastify";
import useAxios from "../../../../../../hooks/useAxios";
import { boards } from "../../../../../../constants/url";
import { useParams } from "react-router-dom";
import AlertModal from "../../../../../Common/List/Item/modals/AlertModal";
import { board_remove } from "../../../../../../features/board/boardSlice";
import { useDispatch } from "react-redux";

interface IAddMoreProps {
  isShown: boolean;
  boardId: number;
  title: string;
}

const portals = document.getElementById("portals") as Element;

const AddMore: React.FC<IAddMoreProps> = ({
  title,
  isShown,
  boardId,
}): JSX.Element => {
  const [taskModal, setTaskModal] = useState<boolean>(false);
  const [state, stateDispatch] = useReducer(boardDetailsReducer, {
    boardNameEdit: false,
    boardDelete: false,
  });

  const [deleteResponse, error, loading, fetcher] = useAxios();
  const params = useParams();
  const dispatch = useDispatch();

  const handleTaskModal = () => {
    setTaskModal(!taskModal);
  };

  const handleEditName = () => {
    stateDispatch({ type: "boardNameEdit" });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("لینک با موفقیت در کلیپ بورد کپی شد.");
  };
  const handleRemove = () => {
    fetcher(
      "delete",
      boards.delete({
        wid: params.wid,
        pid: params.pid,
        bid: params.bid ? params.bid : boardId,
      })
    );
  };

  const deleteAlert = () => {
    stateDispatch({ type: "boardDelete" });
  };

  useEffect(() => {
    if (deleteResponse) {
      dispatch(board_remove({ id: params.bid ? params.bid : boardId }));
      toast.success("آیتم مورد نظر با موفقیت حذف شد.");
    }
  }, [deleteResponse]);

  return (
    <section
      className={`${
        !isShown ? "opacity-0" : "opacity-100"
      } flex items-center gap-1 transition-all`}
    >
      <Icon
        size={24}
        icon="plus"
        className="cursor-pointer"
        onClick={handleTaskModal}
      />
      <Dropdown type="icon" icon={{ icon: "dots" }}>
        <DropdownItem
          title="ویرایش نام ستون "
          hasIcon={true}
          icon={{ icon: "edit" }}
          onClick={handleEditName}
        />
        <DropdownItem
          title="افزودن تسک"
          hasIcon={true}
          icon={{ icon: "plus" }}
          onClick={handleTaskModal}
        />
        <DropdownItem
          title="کپی لینک"
          hasIcon={true}
          icon={{ icon: "archive" }}
          onClick={handleCopyLink}
        />
        <DropdownItem
          title="حذف"
          hasIcon={true}
          icon={{ icon: "trash", color: "red" }}
          onClick={deleteAlert}
          color="red"
        />
      </Dropdown>
      {taskModal && (
        <TaskModal
          modal={taskModal}
          setModal={handleTaskModal}
          boardId={boardId}
        />
      )}
      {createPortal(
        <>
          <NameEdit
            boardId={boardId}
            value={state.boardNameEdit}
            setValue={handleEditName}
            previousValue={title}
            type="board"
          />
          <AlertModal
            alertText="آیا از حذف کردن این برد مطمئن هستید؟"
            isAlertOpen={state.boardDelete}
            setIsAlertOpen={deleteAlert}
            handleYes={handleRemove}
          />
        </>,
        portals
      )}
    </section>
  );
};
export default AddMore;
