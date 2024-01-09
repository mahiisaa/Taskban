import Modal from "../../../Modal";
import Button from "../../../Form/Button";
import { useEffect, useState, useRef } from "react";
import useAxios from "../../../../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { IEdit } from "../../../../../interfaces/modals";
import ColorPicker from "../../../ColorPicker";
import { workspaces } from "../../../../../constants/url";
import { update_color } from "../../../../../features/workspace/workspaceSlice";

const NameEdit: React.FC<IEdit> = ({
  currentID,
  value,
  setValue,
  previousValue,
}): JSX.Element => {
  const [values, setVlaues] = useState({
    color: previousValue,
  });

  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    previousValue
  );

  const [response, error, loading, fetcher] = useAxios();
  const params = useParams();
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const edit = async () => {
    await fetcher("patch", workspaces.patch({ wid: currentID || params.wid }), {
      color: values.color,
    });
  };

  const handleDisableClick = () => {
    if (ref.current) ref.current.style.backgroundColor = "#7D828C";
    setVlaues({ color: "" });
  };

  const close = () => {
    setVlaues({ color: previousValue });
    setSelectedColor(previousValue);
  };

  useEffect(() => {
    if (response) {
      dispatch(update_color(response));
      setValue(false);
      document.body.style.overflow = "unset";
      toast.success("تغییر رنگ با موفقیت انجام شد.");
    }
  }, [response]);

  return (
    <>
      <Modal
        modal={value}
        setModal={setValue}
        hasHeader={true}
        header={{ text: "رنگ جدید را انتخاب کنید", order: 2 }}
        hasBackIcon={false}
        backIcon={{ order: 1 }}
        hasCloseIcon={true}
        closeIcon={{ order: 3, resetInputValue: close }}
      >
        <div className="flex flex-col gap-XL w-[500px] pt-0 items-end">
          <div className="flex gap-S">
            <div className="flex flex-col items-end gap-S">
              <span className="text-sm text-black dark:text-[#bac4c8]">
                رنگ ورک‌اسپیس
              </span>
              <div className="flex w-[293px] flex-row-reverse gap-[8px] flex-wrap items-center">
                <ColorPicker
                  onClick={(data) => setVlaues({ color: data.code! })}
                  hasDisableIcon={true}
                  handleDisableClick={handleDisableClick}
                  selected={selectedColor}
                  setSelected={setSelectedColor}
                />
              </div>
            </div>
            <div
              ref={ref}
              className="flex text-center w-[80px] h-[80px] p-[10px] mb-[20px] justify-center items-center rounded-[8px] bg-[#7D828C] text-white text-2xl font-extrabold"
              style={{ backgroundColor: values.color }}
            ></div>
          </div>

          <Button
            text="ثبت"
            type="button"
            onClick={edit}
            className="flex h-XL rounded-md bg-brand-primary text-white w-full"
            loading={loading}
            disabled={!values.color}
          />
        </div>
      </Modal>
    </>
  );
};

export default NameEdit;
