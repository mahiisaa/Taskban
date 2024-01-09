import Modal from "../../../Modal";
import Input from "../../../Form/Input";
import Button from "../../../Form/Button";
import { useEffect, useState } from "react";
import useAxios from "../../../../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addBoard } from "../../../../../features/update/updateSlice";
import { IEdit } from "../../../../../interfaces/modals";
import { boards, projects, workspaces } from "../../../../../constants/url";
import {
  project_update_name,
  update_name,
} from "../../../../../features/workspace/workspaceSlice";
import { board_update_name } from "../../../../../features/board/boardSlice";

const NameEdit: React.FC<IEdit> = ({
  value,
  setValue,
  previousValue,
  type,
  currentID,
  boardId,
}): JSX.Element => {
  const [values, setVlaues] = useState({
    name: previousValue,
  });

  const [response, error, loading, fetcher] = useAxios();
  const params = useParams();
  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    setVlaues({
      ...values,
      [name]: value,
    });
  };

  const workSpaceEdit = async () => {
    await fetcher("patch", workspaces.patch({ wid: currentID || params.wid }), {
      name: values.name,
    });
  };

  const projectEdit = async () => {
    await fetcher(
      "patch",
      projects.patch({
        wid: params.wid,
        pid: currentID || params.pid,
      }),
      {
        name: values.name,
      }
    );
  };

  const boardEdit = async () => {
    await fetcher(
      "patch",
      boards.patch({
        wid: params.wid,
        pid: params.pid,
        bid: currentID || boardId,
      }),
      {
        name: values.name,
      }
    );
  };

  useEffect(() => {
    if (response) {
      type === "workSpace"
        ? dispatch(update_name(response))
        : type === "project"
        ? dispatch(project_update_name({ wid: params.wid, response }))
        : dispatch(board_update_name(response));
      setValue(false);
      document.body.style.overflow = "unset";
      toast.success("تغییر نام با موفقیت انجام شد.");
    }
    setVlaues({ name: previousValue });
  }, [response]);

  const close = () => {
    setVlaues({ name: previousValue });
  };

  return (
    <>
      <Modal
        modal={value}
        setModal={setValue}
        hasHeader={true}
        header={{ text: "نام جدید را وارد کنید", order: 2 }}
        hasBackIcon={false}
        backIcon={{ order: 1 }}
        hasCloseIcon={true}
        closeIcon={{ order: 3, resetInputValue: close }}
      >
        <div className="flex flex-col gap-XL w-[500px]">
          <div className="flex flex-col gap-[8px]" dir="rtl">
            <Input
              name="name"
              id="name"
              type="text"
              className="h-XL rounded-md border border-[#aaaaaa] text-sm outline-none pr-1 bg-white"
              onChange={(name, value) => handleChange(name, value)}
              inputValue={values.name}
              autoFocus={true}
            />
          </div>
          <Button
            text="ثبت"
            type="button"
            onClick={
              type === "workSpace"
                ? workSpaceEdit
                : type === "project"
                ? projectEdit
                : boardEdit
            }
            className="flex h-XL rounded-md bg-brand-primary text-white"
            loading={loading}
            disabled={!values?.name?.trim()}
          />
        </div>
      </Modal>
    </>
  );
};

export default NameEdit;
