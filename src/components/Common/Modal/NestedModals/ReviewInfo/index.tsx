import Modal from "../..";
import image from "../../../../../assets/images/member.png";
import Button from "../../../Form/Button";
import { Dispatch, SetStateAction } from "react";
import useAxios from "../../../../../hooks/useAxios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { workspaces } from "../../../../../constants/url";
import { add } from "../../../../../features/workspace/workspaceSlice";

interface IProps {
  isReviewInfoOpen: boolean;
  setIsReviewInfoOpen: (
    value: boolean | ((prevVar: boolean) => boolean)
  ) => void;
  workSpaceInfo: { name?: string; color?: string };
  setIsPickColorOpen: (
    value: boolean | ((prevVar: boolean) => boolean)
  ) => void;
  setWorkSpaceInfo: Dispatch<SetStateAction<{ name?: string; color?: string }>>;
  setSelected?: (
    value:
      | string
      | undefined
      | ((prevVar: string | undefined) => string | undefined)
  ) => void;
}

const ReviewInfo: React.FC<IProps> = ({
  isReviewInfoOpen,
  setIsReviewInfoOpen,
  workSpaceInfo,
  setIsPickColorOpen,
  setWorkSpaceInfo,
  setSelected,
}): JSX.Element => {
  const [response, error, loading, fetcher] = useAxios();

  const dispatch = useDispatch();

  const postWorkSpace = async () => {
    await fetcher("post", workspaces.post(), {
      name: workSpaceInfo.name,
      color: workSpaceInfo.color,
    });
  };

  const handleCreate = () => {
    postWorkSpace();
    handleReset();
    setIsReviewInfoOpen(false);
  };

  const handleBackClick = () => {
    setIsPickColorOpen(true);
    setIsReviewInfoOpen(false);
  };

  const handleReset = () => {
    setWorkSpaceInfo({
      ...workSpaceInfo,
      name: "",
      color: "",
    });
    if (setSelected) setSelected("disable");
  };

  useEffect(() => {
    if (response) {
      dispatch(add(response));
      document.body.style.overflow = "unset";
    }
  }, [response]);
  return (
    <>
      <Modal
        modal={isReviewInfoOpen}
        setModal={setIsReviewInfoOpen}
        hasHeader={true}
        header={{ text: "مرور اطلاعات", order: 2 }}
        hasBackIcon={true}
        backIcon={{ order: 1, handleBack: handleBackClick }}
        hasCloseIcon={true}
        closeIcon={{
          order: 3,
          resetInputValue: handleReset,
        }}
      >
        <div className="flex flex-col gap-XL">
          <div className="flex flex-col w-[453px] p-[12px] items-start gap-S border-[0.5px] border-[#AAAAAA] rounded-[8px]">
            <div className="flex justify-between items-center w-full">
              <span className="text-black dark:text-[#bac4c8] text-sm font-extrabold">
                {workSpaceInfo.name}
              </span>
              <span className="text-black dark:text-[#bac4c8] text-sm font-extrabold">
                نام ورک‌اسپیس
              </span>
            </div>
            <div className="flex justify-between items-center w-full">
              <div
                className="w-[15px] h-[15px] rounded-[2px]"
                style={{ backgroundColor: workSpaceInfo.color }}
              ></div>
              <span className="text-black dark:text-[#bac4c8] text-sm font-extrabold">
                رنگ ورک‌اسپیس
              </span>
            </div>
            <div className="flex justify-between items-center w-full">
              <img
                src={image}
                alt="اعضاء ورک اسپیس"
                className={`rounded-full flex justify-center items-center w-[35px] h-[35px]`}
              />
              <span className="text-black dark:text-[#bac4c8] text-sm font-extrabold">
                اعضا
              </span>
            </div>
          </div>
          <Button
            text={`${loading ? "Loading..." : "ساختن ورک‌اسپیس"}`}
            type="submit"
            onClick={handleCreate}
            className="flex h-XL rounded-md bg-brand-primary text-white w-full"
          />
        </div>
      </Modal>
    </>
  );
};

export default ReviewInfo;
