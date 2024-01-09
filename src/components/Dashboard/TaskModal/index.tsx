import { createPortal } from "react-dom";
import Modal from "../../Common/Modal";
import Button from "../../Common/Form/Button";
import Icon from "../../Common/Icon";
import { useState } from "react";
import DatePickerModal from "../DatePickerModal";
import Textarea from "../../Common/Form/Textarea";
import ShareModal from "../ShareModal";
import { tag } from "../../../constants/list";
import Dropdown from "../../Common/Dropdown";
import DropdownItem from "../../Common/Dropdown/DropdownItem";
import File from "../../Common/Form/File";
import Select from "../../Common/Form/Select";
import { useParams } from "react-router-dom";
import { tasks } from "../../../constants/url";
import { AXIOS } from "../../../config/axios.config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Input from "../../Common/Form/Input";
import { validate, required } from "../../../utils/validator";
import { addNewTask, selectBoard } from "../../../features/board/boardSlice";
import { useSelector } from "react-redux";

const rules = {
  board_id: [required],
  name: [required],
};

const portals = document.getElementById("portals") as Element;
interface IProps {
  boardId?: number;
  modal: boolean;
  wid?: number;
  pid?: number;
  setModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const TaskModal: React.FC<IProps> = ({
  modal,
  setModal,
  boardId,
  wid,
  pid,
}): JSX.Element => {
  const [bId, setBid] = useState(boardId);
  const params = useParams();
  const dispatch = useDispatch();
  const [tags] = useState(tag);
  const boards = useSelector(selectBoard).boards;
  const [datePickerModal, setDatePickerModal] = useState<boolean>(false);
  const [shareModal, setShareModal] = useState<boolean>(false);
  const [values, setVlaues] = useState({
    description: "",
    priority: 1,
    attachment: "",
    thumbnail: "",
    name: "",
    order: 1,
    deadline: "",
    board_id: boardId || "",
  });

  const handleDatePickerModal = () => {
    setDatePickerModal(!datePickerModal);
  };

  const handleShowModal = () => {
    setModal(!modal);
  };

  const handleShareModal = () => {
    setShareModal(!shareModal);
  };

  const handleSelect = (e) => {
    const value = e.currentTarget.dataset.value;
    setBid(value);
    setVlaues({
      ...values,
      board_id: value,
    });
  };

  const handleChange = (name, value) => {
    setVlaues({
      ...values,
      [name]: value,
    });
  };

  const handleDropDown = (id, title) => {
    setVlaues({
      ...values,
      priority: id,
    });
  };

  const handleSubmit = async () => {
    const resultErrors = validate(values, rules);

    if (resultErrors.length) {
      resultErrors.forEach((error) => {
        toast.error(error);
      });
    } else {
      const url = tasks.post({
        wid: wid || params.wid,
        pid: pid || params.pid,
        bid: bId,
      });
      try {
        const res = await AXIOS.post(url, values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res?.status === 201) {
          toast.success("تسک جدید با موفقیت ثبت شد.");
          setModal(!modal);
          dispatch(addNewTask({ id: bId, response: res.data }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {createPortal(
        <Modal
          style={{ padding: "32px" }}
          modal={modal}
          setModal={handleShowModal}
          hasHeader={true}
          header={{ text: values.name || "عنوان تسک", order: 3 }}
          hasBackIcon={false}
          backIcon={{ order: 2 }}
          hasCloseIcon={true}
          hasColor={true}
          coloredSquare={`${values.priority === 4
            ? "#FB0606"
            : values.priority === 3
              ? "#FFE605"
              : values.priority === 2
                ? "#09DBCE"
                : "#c1c1c1"
            }`}
          closeIcon={{ order: 1 }}
        >
          <div className="flex flex-col w-[1153px] gap-M">
            <div className="flex flex-row-reverse items-center gap-[8px]">
              <span>در</span>
              <Select
                selected={bId}
                name="board_id"
                onChange={(e) => {
                  handleSelect(e);
                }}
                items={boards}
                className="w-[200px]"
                searchPlaceholder="جستجو"
              />
              <span>برای</span>
              <div
                className="border-dashed border-2 rounded-full border-[#c1c1c1] w-[34px] h-[34px] flex justify-center items-center cursor-pointer"
                onClick={() => {
                  setShareModal(!shareModal);
                }}
              >
                <Icon icon="user_add" color="#c1c1c1" />
              </div>
            </div>
            <Input
              placeholder="عنوان تسک را وار کنید"
              type="text"
              name="name"
              id="name"
              className="py-2"
              inputValue={values?.name}
              onChange={(name, value) => handleChange(name, value)}
            />
            <Textarea
              className="dark:text-[#323232] w-full py-[19px] px-L rounded-xl text-right resize-none border border-[#E2E2E2] outline-none"
              id="description"
              rows={3}
              name="description"
              onChange={(name, value) => handleChange(name, value)}
              placeholder="توضیحاتی برای این تسک بنویسید"
            />
            <File
              inputValue={values.attachment}
              onChangeFile={(name, value) => {
                handleChange(name, value);
              }}
              id="attachment"
              name="attachment"
              hasLabel={true}
              hasIcon={true}
              icon="attach"
              text="افزودن فایل"
              label="افزودن پیوست"
              styles="flex flex-row items-center text-base font-medium border border-brand-primary h-[36px] rounded-lg py-[4px] px-[8px] gap-[4px] cursor-pointer text-center"
            />
            <File
              inputValue={values.thumbnail}
              onChangeFile={(name, value) => {
                handleChange(name, value);
              }}
              id="thumbnail"
              name="thumbnail"
              hasLabel={true}
              hasIcon={true}
              icon="attach"
              text="افزودن فایل"
              label="افزودن کاور"
              styles="flex flex-row items-center text-base font-medium border border-brand-primary h-[36px] rounded-lg py-[4px] px-[8px] gap-[4px] cursor-pointer text-center"
            />
            <div className="flex flex-row-reverse justify-between items-center">
              <div className="flex flex-row gap-M">
                <div className="cursor-pointer border-dashed border-2 rounded-full border-[#c1c1c1] w-[50px] h-[50px] flex justify-center items-center">
                  <Dropdown
                    type="icon"
                    icon={{ icon: "tag", color: "#c1c1c1" }}
                  >
                    {tags?.map((item) => {
                      return (
                        <DropdownItem
                          key={item.id}
                          title={item.name}
                          id={item.id}
                          bgcolor={item.color}
                          color="black"
                        />
                      );
                    })}
                  </Dropdown>
                </div>
                <div
                  onClick={handleDatePickerModal}
                  className="cursor-pointer border-dashed border-2 rounded-full border-[#c1c1c1] w-[50px] h-[50px] flex justify-center items-center"
                >
                  <Icon icon="calender_full" color="#c1c1c1" />
                </div>
                <div className="cursor-pointer border-dashed border-2 rounded-full border-[#c1c1c1] w-[50px] h-[50px] flex justify-center items-center">
                  <Dropdown
                    type="icon"
                    icon={{
                      icon: "flag",
                      color:
                        values.priority === 4
                          ? "#FB0606"
                          : values.priority === 3
                            ? "#FFE605"
                            : values.priority === 2
                              ? "#09DBCE"
                              : "#c1c1c1",
                    }}
                  >
                    <DropdownItem
                      id={4}
                      title="فوری"
                      onClick={(id, title) => handleDropDown(id, title)}
                      hasIcon={true}
                      icon={{ icon: "flag", color: "#FB0606" }}
                    />
                    <DropdownItem
                      id={3}
                      title="بالا"
                      onClick={(id, title) => handleDropDown(id, title)}
                      hasIcon={true}
                      icon={{ icon: "flag", color: "#FFE605" }}
                    />
                    <DropdownItem
                      id={2}
                      title="متوسط"
                      onClick={(id, title) => handleDropDown(id, title)}
                      hasIcon={true}
                      icon={{ icon: "flag", color: "#09DBCE" }}
                    />
                    <DropdownItem
                      id={1}
                      title="پایین"
                      onClick={(id, title) => handleDropDown(id, title)}
                      hasIcon={true}
                      icon={{ icon: "flag", color: "#B2ACAC" }}
                    />
                  </Dropdown>
                </div>
              </div>
              <Button
                text="ساختن تسک"
                onClick={handleSubmit}
                type="button"
                className="bg-brand-primary text-white h-L text-sm rounded-md px-M"
              />
            </div>
          </div>
        </Modal>,
        portals
      )}
      {datePickerModal && (
        <DatePickerModal
          onChangeDate={(date) => {
            setVlaues({
              ...values,
              deadline: date?.end.date
            })
          }}
          modal={datePickerModal}
          setModal={handleDatePickerModal}
        />
      )}
      {shareModal && (
        <ShareModal
          modal={shareModal}
          setModal={handleShareModal}
          title="اشتراک گذاری تسک"
          dataID={{ wid: params.wid, pid: params.pid, bid: bId }}
        />
      )}
    </>
  );
};

export default TaskModal;
