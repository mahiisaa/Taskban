import { createPortal } from "react-dom";
import { useState } from "react";
import Modal from "../../Common/Modal";
import Button from "../../Common/Form/Button";
import Input from "../../Common/Form/Input";
import CopyLink from "../../Common/CopyLink";
import MemberList from "../../Common/MemberList/MemberList";
import { email, validate } from "../../../utils/validator/";
import { toast } from "react-toastify";
import useAxios from "../../../hooks/useAxios";
import { useEffect } from "react";
import { IAccount } from "../../../interfaces/accounts";
import { accounts, subscription } from "../../../constants/url";
import { shareModal } from "../../../utils/shareModal";

const rules = {
  email: [email],
};
const portals = document.getElementById("portals") as Element;

interface IProps {
  title: string;
  modal: boolean;
  setModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  dataID?: {
    wid?: number | string;
    pid?: number | string;
    bid?: number | string;
    tid?: number | string;
  };
}

const ShareModal: React.FC<IProps> = ({
  modal,
  setModal,
  title,
  dataID,
}): JSX.Element => {
  const [tid, setTid] = useState<string>();
  const [response, error, loading, fetcher] = useAxios();
  const [subsResponse, subsError, subsLoading, subsFetcher] = useAxios();
  const [memberResponse, memberError, memberLoading, memberFetcher] =
    useAxios();
  const { url, shareType, getMembersUrl, setMemberUrl } = shareModal({
    ...dataID,
    tid,
  });
  const [listShow, setListShow] = useState(false);
  const [data, setData] = useState<IAccount[]>([]);
  const [values, setValues] = useState({
    email: "",
  });

  const getAccounts = async () => {
    await fetcher("get", accounts.gets());
  };

  const getMemebers = async () => {
    await memberFetcher("get", getMembersUrl);
  };

  const handleSubmit = async () => {
    const resultErrors = validate(values, rules);
    if (resultErrors.length) {
      toast.error(resultErrors[0]);
    } else {
      await subsFetcher("post", subscription.post(), {
        email: values.email,
        url,
      });
    }
  };

  const handleChange = (name: string, value: string) => {
    setListShow(true);
    setValues({ email: value });
    const data = response.filter((item) => {
      return item.email.includes(value);
    });

    setData(data);
  };

  const handleSelect = (item) => {
    setListShow(false);
    setValues({ email: item.email });
  };

  const handleShowModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (modal) {
      getMemebers();
      getAccounts();
    }
    if (subsFetcher && subsResponse) {
      setTid(subsResponse?.id);
      toast.success("ایمیل با موفقیت ارسال شد.");
    }
  }, [modal, tid, subsResponse]);

  return (
    <>
      {createPortal(
        <Modal
          modal={modal}
          setModal={handleShowModal}
          hasHeader={true}
          header={{ text: title, order: 2 }}
          hasBackIcon={false}
          backIcon={{ order: 1 }}
          hasCloseIcon={true}
          closeIcon={{ order: 3 }}
        >
          <div className="flex relative">
            <Button
              disabled={!values.email}
              text="ارسال"
              type="button"
              onClick={handleSubmit}
              className="h-XL bg-brand-primary rounded-l-lg text-white text-sm px-[30px]"
            />
            <div className="w-full">
              <Input
                inputValue={values.email}
                name="email"
                id="email"
                type="email"
                onChange={(name, value) => handleChange(name, value)}
                placeholder="دعوت با ایمیل"
                className="h-XL rounded-l-none rounded-r-lg border-none bg-[#F0F1F3] text-sm outline-none"
              >
                {values.email && listShow && (
                  <div className="absolute left-0 bg-white w-full rounded-sm top-XL p-2 shadow-select z-30 max-h-[200px] overflow-y-auto overflow-x-hidden">
                    {data.length ? (
                      data?.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className="cursor-pointer hover:bg-lightgray_200 p-1 text-left rounded-sm"
                            onClick={() => {
                              handleSelect(item);
                            }}
                          >
                            {item.email}
                          </div>
                        );
                      })
                    ) : (
                      <p>! موردی یافت نشد</p>
                    )}
                  </div>
                )}
              </Input>
            </div>
          </div>
          <div className="flex justify-between w-[430px] my-[25px]">
            <CopyLink privateLink={url} />
          </div>
          <div className="flex flex-col w-[430px] gap-S">
            <MemberList members={memberResponse} />
          </div>
        </Modal>,
        portals
      )}
    </>
  );
};

export default ShareModal;
