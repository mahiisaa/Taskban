import Modal from "../../Common/Modal";
import Button from "../../Common/Form/Button";
import Icon from "../../Common/Icon";
import { useEffect, useState } from "react";
import File from "../../Common/Form/File";
import Textarea from "../../Common/Form/Textarea";
import MembersThumb from "../../Common/MembersThumb";
import { ITask } from "../../../interfaces/task";
import { Link, useParams } from "react-router-dom";
import { AXIOS, baseAppURL } from "../../../config/axios.config";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import { IComment } from "../../../interfaces/comments";
import Comments from "./Comments";
import { dateConvert } from "../../../utils/dateConvert";
import { flagColor } from "../../../utils/flagColor";
import Dropdown from "../../Common/Dropdown";
import DropdownItem from "../../Common/Dropdown/DropdownItem";
import { task_comments, tasks } from "../../../constants/url";
import { toast } from "react-toastify";
import {
  removeTask,
  selectBoard,
  updateTask,
} from "../../../features/board/boardSlice";
import AlertModal from "../../Common/List/Item/modals/AlertModal";

interface IProps {
  boardTitle: string;
  boardId: number;
  taskId: number;
  modal: boolean;
  setModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const TaskInfoModal: React.FC<IProps> = ({
  modal,
  setModal,
  boardTitle,
  boardId,
  taskId,
}): JSX.Element => {
  const [values, setValues] = useState<ITask>({
    id: 0,
    name: "",
    description: "",
    created_at: "",
    deadline: "",
    priority: 0,
    attachment: "",
    thumbnail: "",
  });
  const [commentText, setCommentText] = useState<string>("");
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const { weekday, year, day, month } = dateConvert(values.deadline);
  const [hasUpdated, setHasUpdateed] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const boards = useSelector(selectBoard).boards;

  const getTask = async () => {
    try {
      const res = await AXIOS.get(
        tasks.get({
          wid: params.wid,
          pid: params.pid,
          bid: boardId,
          tid: taskId,
        })
      );
      setValues(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTaskComments = async () => {
    try {
      const res = await AXIOS.get(
        task_comments.gets({
          wid: params.wid,
          pid: params.pid,
          bid: boardId,
          tid: taskId,
        })
      );
      setCommentList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTask = async () => {
    try {
      await AXIOS.delete(
        tasks.delete({
          wid: params.wid,
          pid: params.pid,
          bid: boardId,
          tid: taskId,
        })
      );

      dispatch(removeTask({ bid: boardId, tid: taskId }));
      toast.success(" تسک با موفقیت حذف شد.");
      setModal(!modal);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = async () => {
    setModal(!modal);
    let data = {};
    if (hasUpdated) {
      data = {
        name: values.name,
        description: values.description,
        priority: values.priority,
      };

      if (values.attachment && typeof values.attachment !== "string") {
        data["attachment"] = values.attachment;
      } else if (values.attachment === "") {
        data["attachment"] = "";
      }
    }

    if (Object.keys(data).length) {
      try {
        const response = await AXIOS.patch(
          tasks.patch({
            wid: params.wid,
            pid: params.pid,
            bid: boardId,
            tid: taskId,
          }),
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 200) {
          toast.success("تسک با موفقیت ویرایش شد.");
          dispatch(updateTask(response.data));
        }
      } catch (error) {}
    } else {
    }
  };

  const handleChange = (name: string, value: string) => {
    setHasUpdateed(true);
    setValues({ ...values, [name]: value });
  };

  const handleRemoveAttachment = () => {
    setHasUpdateed(true);
    setValues({
      ...values,
      attachment: "",
    });
  };

  const handleSubmit = async () => {
    if (!commentText || !isShow) return;
    try {
      await AXIOS.post(
        task_comments.post({
          wid: params.wid,
          pid: params.pid,
          bid: boardId,
          tid: taskId,
        }),
        {
          attachment: null,
          author: user.user_id,
          text: commentText,
        }
      );
      getTaskComments();
      setCommentText("")
    } catch (error) {
      console.log(error);
    }
    setIsShow(false);
  };
  const handleRemoveComment = async (id: number) => {
    try {
      await AXIOS.delete(
        task_comments.delete({
          wid: params.wid,
          pid: params.pid,
          bid: boardId,
          tid: taskId,
          cid: id,
        })
      );
      toast.success("حذف کامنت با موفقیت انجام شد.");
      getTaskComments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropDown = (id, title) => {
    setValues({
      ...values,
      priority: id,
    });
    setHasUpdateed(true);
  };
  useEffect(() => {
    getTask();
    getTaskComments();
  }, []);
  return (
    <>
      {
        <Modal
          contentTopGap="gap-0"
          modal={modal}
          setModal={handleShowModal}
          hasHeader={false}
          header={{ text: "", order: 3 }}
          hasBackIcon={false}
          backIcon={{ order: 2 }}
          hasCloseIcon={true}
          closeIcon={{ order: 1 }}
        >
          <div
            className="flex flex-col gap-M divide-y cursor-default divide-lightgray_300 w-[1000px] "
            style={{ direction: "ltr" }}
          >
            <div className="flex flex-row justify-between divide-x divide-lightgray_300">
              <div className="flex w-[50%] justify-end px-S grow gap-L">
                <div className="flex flex-col">
                  <span className="text-sm text-right">ددلاین</span>
                  <span dir="rtl" className="font-bold">
                    {weekday}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-right">ساخته شده در</span>
                  <span dir="rtl" className="font-bold">
                    {day}
                    &nbsp;
                    {month}
                    &nbsp;
                    {year}
                  </span>
                </div>
              </div>
              <div className="flex w-[50%] px-S">
                <Button
                  type="button"
                  text="اشتراک گذاری"
                  onClick={() => {}}
                  className="mr-auto font-bold items-center"
                  hasIcon={true}
                  icon={{ icon: "share" }}
                />
                <div className="flex items-center justify-between">
                  <div
                    className="mr-2XL cursor-pointer border-dashed  border-2   rounded-full  w-[40px] h-[40px] flex justify-center items-center"
                    style={{ borderColor: flagColor(values.priority) }}
                  >
                    <Dropdown
                      type="icon"
                      icon={{
                        icon: "flag",
                        color: flagColor(values.priority),
                      }}
                    >
                      <DropdownItem
                        id={4}
                        title="فوری"
                        onClick={(id, title) => handleDropDown(id, title)}
                        hasIcon={true}
                        icon={{ icon: "flag", color: flagColor(4) }}
                      />
                      <DropdownItem
                        id={3}
                        title="بالا"
                        onClick={(id, title) => handleDropDown(id, title)}
                        hasIcon={true}
                        icon={{ icon: "flag", color: flagColor(3) }}
                      />
                      <DropdownItem
                        id={2}
                        title="متوسط"
                        onClick={(id, title) => handleDropDown(id, title)}
                        hasIcon={true}
                        icon={{ icon: "flag", color: flagColor(2) }}
                      />
                      <DropdownItem
                        id={1}
                        title="پایین"
                        onClick={(id, title) => handleDropDown(id, title)}
                        hasIcon={true}
                        icon={{ icon: "flag", color: flagColor(1) }}
                      />
                    </Dropdown>
                  </div>

                  <MembersThumb members={values.members} hasAddIcon={true} />
                  <Button
                    type="button"
                    name="status"
                    onClick={() => {}}
                    text={boardTitle}
                    className={` p-1 bg-brand-primary cursor-default rounded-md text-white w-[120px] h-[30px]`}
                  />
                  <div
                    className="flex items-center ml-2 cursor-pointer"
                    onClick={() => {
                      setAlertModal(true);
                    }}
                  >
                    <Icon icon="trash" size={28} color="#FA5252" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-row justify-between divide-x divide-lightgray_300">
                <div className="flex flex-col w-[50%] relative">
                  {!isShow && (
                    <div className="h-3/4 overflow-auto flex flex-col items-end lg:h-[65vh] xl:h-[40vh]">
                      {commentList?.map((item) => {
                        return (
                          <Comments
                            {...item}
                            img={user.thumbnail}
                            remove={handleRemoveComment}
                            key={item.id}
                            first_name={user.first_name}
                            last_name={user.last_name}
                          />
                        );
                      })}
                    </div>
                  )}
                  <div className="relative w-full shadow-comment rounded mt-auto flex justify-end ">
                    <div className="  absolute left-4 top-2 z-10">
                      <Icon icon="comment" color="#AEAEAE" />
                    </div>
                    <div
                      className="w-full"
                      onFocus={() => {
                        setIsShow(true);
                      }}
                      onBlur={() => {
                        setIsShow(false);
                      }}
                    >
                      <Textarea
                        name="comment"
                        id="comment"
                        placeholder="کامنت"
                        inputValue={commentText}
                        onChange={(name, value) => {
                          setCommentText(value);
                        }}
                        className={`dark:mr-4 dark:text-black w-full block pt-2 b-10 pl-9 ${
                          isShow ? "h-40" : "h-10"
                        } rounded-lg transition-all outline-none border-none`}
                      />
                      <Button
                        text="ثبت کامنت"
                        onClick={handleSubmit}
                        type="button"
                        className={`${
                          !isShow
                            ? "opacity-0 cursor-text"
                            : "opacity-100 cursor-pointer bottom-4 left-5 "
                        } bg-brand-primary text-white text-xs rounded-md absolute py-1.5 px-3 font-extrabold`}
                      />
                      <div
                        className={`flex gap-2 absolute  ${
                          !isShow
                            ? "opacity-0 cursor-text "
                            : "opacity-100 cursor-pointer right-8 bottom-5"
                        }`}
                      >
                        <Icon icon="emoji" color="#C9CBDA" />
                        <Icon icon="paper" color="#C9CBDA" />
                        <Icon icon="attach" color="#C9CBDA" />
                        <Icon icon="email" color="#C9CBDA" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-[50%] px-S">
                  <div className="felx flex-col pt-M w-full">
                    <div className="flex justify-end text-brand-primary">
                      <div className="cursor-pointer border-dashed border-2 rounded-full border-[#c1c1c1] w-[40px] h-[40px] flex justify-center items-center">
                        <Icon icon="tag" color="#c1c1c1" />
                      </div>
                    </div>
                    <h4 className="dark:text-[#bac4c8] text-right mt-2 text-black text-2xl font-extrabold">
                      {values.name}
                    </h4>
                    {values.id && (
                      <Textarea
                        className="my-S dark:text-black"
                        rows={6}
                        inputValue={values.description}
                        name="description"
                        id="description"
                        onChange={(name, value) => {
                          handleChange(name, value);
                        }}
                      />
                    )}
                    {!values.attachment ? (
                      <File
                        inputValue={values.attachment || ""}
                        onChangeFile={(name, value) => {
                          handleChange(name, value);
                        }}
                        id="attachment"
                        name="attachment"
                        hasIcon={true}
                        icon="attach"
                        text="افزودن پیوست"
                        styles="flex flex-row items-center text-base font-medium border border-brand-primary h-[36px] rounded-lg py-[4px] px-[8px] gap-[4px] cursor-pointer text-center"
                      />
                    ) : (
                      <div className="flex justify-end items-center gap-2">
                        <Link
                          target="_blank"
                          to={`${baseAppURL}${values?.attachment}`}
                          className="flex flex-row items-center text-base font-medium border border-brand-primary h-[36px] rounded-lg py-[4px] px-[8px] gap-[4px] cursor-pointer text-center"
                        >
                          دریافت فایل پیوست
                        </Link>
                        <Button
                          type="button"
                          hasIcon={true}
                          icon={{ icon: "trash", color: "#FA5252" }}
                          onClick={handleRemoveAttachment}
                          className="flex flex-row items-center text-base font-medium border border-brand-primary h-[36px] rounded-lg py-[4px] px-[8px] gap-[4px] cursor-pointer text-center"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      }
      <AlertModal
        isAlertOpen={alertModal}
        setIsAlertOpen={setAlertModal}
        alertText="آیا از حذف این تسک مطمئن هستید؟"
        handleYes={handleRemoveTask}
      />
    </>
  );
};

export default TaskInfoModal;
