import Button from "../../../components/Common/Form/Button";
import Input from "../../../components/Common/Form/Input";
import useAxios from "../../../hooks/useAxios";
import { useState, useEffect } from "react";
import { required, email, validate } from "../../../utils/validator/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectUser } from "../../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { errorToaster } from "../../../utils/toaster";
import { accounts, change_password } from "../../../constants/url";

const rules = {
  email: [required, email],
  username: [required],
  old_password: [required],
  new_password: [required],
  new_password1: [required],
};

type Values = {
  [key: string]: string;
};

const Account: React.FC = (): JSX.Element => {
  const user = useSelector(selectUser);
  const [updateResponse, error, loading, fetcher] = useAxios();
  const [userResponse, userError, userLoading, userfetcher] = useAxios();
  const [values, setValues] = useState<Values>({
    email: "",
    username: "",
    old_password: "",
    new_password: "",
    new_password1: "",
  });

  const handleChange = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };
  
  const handleClick = async () => {
    const resultErrors = validate(values, rules);
    if (resultErrors.length) {
      errorToaster(resultErrors);
    } else {
      await fetcher("put", change_password.post(), values);
    }

    if (values.newPassword !== values.confirmNewPassword) {
      toast.error("تکرار رمز عبور جدید با رمز عبور جدید مطابقت ندارد");
    }
  };

  useEffect(() => {
    if (!userResponse) {
      userfetcher("get", accounts.get({ uid: user.user_id }));
    }
    setValues(userResponse);

    if (updateResponse) {
      toast.success(updateResponse.detail[0]);
    }
  }, [userResponse, updateResponse, error]);

  return (
    <div className="flex flex-row-reverse">
      <div className="w-[354px] mt-[125px] mr-[58px]">
        <h2 className="text-[31px] text-bold text-right mb-[32px]">
          اطلاعات حساب
        </h2>
        <form className="flex flex-col gap-S">
          <Input
            disabled={userLoading}
            inputValue={values?.email || ""}
            name="email"
            id="email"
            type="email"
            label="ایمیل"
            hasLabel={true}
            className="h-XL"
            onChange={(name, value) => handleChange(name, value)}
          />
          <Input
            disabled={userLoading}
            inputValue={values?.username || ""}
            name="username"
            id="username"
            type="text"
            label="نام کاربری"
            hasLabel={true}
            className="h-XL"
            onChange={(name, value) => handleChange(name, value)}
          />

          <Input
            disabled={userLoading}
            inputValue={values?.old_password || ""}
            name="old_password"
            id="old_password"
            type="password"
            label="رمز عبور فعلی"
            className="h-XL"
            hasLabel={true}
            onChange={(name, value) => handleChange(name, value)}
          />
          <Input
            disabled={userLoading}
            inputValue={values?.new_password || ""}
            name="new_password"
            id="new_password"
            type="password"
            label="رمز عبور جدید"
            className="h-XL"
            hasLabel={true}
            onChange={(name, value) => handleChange(name, value)}
          />
          <Input
            inputValue={values?.new_password1 || ""}
            name="new_password1"
            id="new_password1"
            type="password"
            label="تکرار رمز عبور جدید"
            className="h-XL"
            hasLabel={true}
            onChange={(name, value) => handleChange(name, value)}
          />
          <Button
            loading={loading || userLoading}
            text="ثبت تغییرات"
            type="button"
            onClick={handleClick}
            hasIcon={false}
            className="text-white text-sm font-black leading-normal h-XL self-stretch rounded-md bg-brand-primary w-full mt-M"
          />
        </form>
      </div>
    </div>
  );
};

export default Account;
