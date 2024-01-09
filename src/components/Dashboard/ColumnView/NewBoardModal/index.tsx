import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../../../Common/Modal";
import Button from "../../../Common/Form/Button";
import Input from "../../../Common/Form/Input";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAxios from "../../../../hooks/useAxios";
import { boards } from "../../../../constants/url";
import ColorPicker from "../../../Common/ColorPicker";
import { add } from "../../../../features/board/boardSlice";

const portals = document.getElementById("portals") as Element;

interface IProps {
  modal: boolean;
  setModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const NewBoardModal: React.FC<IProps> = ({ modal, setModal }): JSX.Element => {
  const params = useParams();
  const dispatch = useDispatch();
  const [response, error, loading, fetcher] = useAxios();
  const [values, setVlaues] = useState({
    color: "",
    name: "",
    order: 0,
    is_archive: true,
  });

  const handleChange = (name, value) => {
    setVlaues({
      ...values,
      [name]: value,
    });
  };

  const handleShowModal = () => {
    setModal(!modal);
  };

  const postBoard = async () => {
    await fetcher(
      "post",
      boards.post({
        wid: params.wid,
        pid: params.pid,
      }),
      values
    );
  };

  useEffect(() => {
    if (response) {
      dispatch(add(response));
      setModal(false);
      document.body.style.overflow = "unset";
    }
  }, [response]);

  return (
    <>
      {createPortal(
        <Modal
          modal={modal}
          setModal={handleShowModal}
          hasHeader={true}
          header={{ text: "ساخت برد جدید", order: 2 }}
          hasBackIcon={false}
          backIcon={{ order: 1 }}
          hasCloseIcon={true}
          closeIcon={{ order: 3 }}
        >
          <div className="flex flex-col gap-M w-[500px] pt-0">
            <div className="flex flex-row-reverse items-center">
              <ColorPicker
                onClick={(data) =>
                  setVlaues({ ...values, color: data.code || "" })
                }
                hasDisableIcon={true}
                selected={values.color}
              />
            </div>
            <div className="flex flex-col gap-[8px]" dir="rtl">
              <Input
                name="name"
                id="name"
                type="text"
                label="نام برد جدید"
                hasLabel={true}
                className="h-XL rounded-md border border-[#aaaaaa] text-sm outline-none pr-1 bg-white"
                onChange={(name, value) => handleChange(name, value)}
                inputValue={values.name}
                autoFocus={true}
              />
            </div>
            <Button
              disabled={!values.name}
              text="ادامه"
              type="button"
              onClick={postBoard}
              className="flex h-XL rounded-md bg-brand-primary text-white"
            />
          </div>
        </Modal>,
        portals
      )}
    </>
  );
};

export default NewBoardModal;
