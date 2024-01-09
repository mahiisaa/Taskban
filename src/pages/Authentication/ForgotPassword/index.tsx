import { useEffect, useState } from "react";
import Card from "../../../components/Layouts/Auth/Card";
import Button from "../../../components/Common/Form/Button";
import Input from "../../../components/Common/Form/Input";
import { email, required, validate } from "../../../utils/validator";
import useAxios from "../../../hooks/useAxios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forget } from "../../../constants/url";

const rules = {
  email: [required, email],
};

type Values = {
  email: string;
};

const ForgotPassword: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSent, setIsSent] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [values, setValues] = useState<Values>({
    email: "",
  });
  const [response, error, loading, fetcher] = useAxios();

  const handleChange = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = async () => {
    const resultErrors = validate(values, rules);

    if (resultErrors.length) {
      setErrors(resultErrors);
    } else {
      await fetcher("post", forget.post(), values);
    }
  };

  useEffect(() => {
    if (response) {
      setIsSent(!isSent);
    }
  }, [response]);

  return (
    <Card page={"forgot"} errors={errors}>
      {!isSent ? (
        <form className="flex flex-col gap-5 self-stretch">
          <Input
            inputValue={values.email}
            name="email"
            id="email"
            type="email"
            className="h-XL"
            label="ایمیل خود را وارد کنید"
            hasLabel={true}
            onChange={(name, value) => handleChange(name, value)}
          />
          <Button
            loading={loading}
            text="دریافت ایمیل بازیابی رمز عبور"
            type="button"
            onClick={handleClick}
            hasIcon={false}
            className="text-white text-sm leading-normal font-extrabold h-12 self-stretch rounded-md bg-brand-primary"
          />
        </form>
      ) : (
        <p className="dark:text-[#bac4c8] text-black text-sm font-normal leading-normal">
          .لینک بازیابی رمز عبور برای شما ایمیل شد. لطفا ایمیل خود را بررسی کنید
        </p>
      )}
    </Card>
  );
};

export default ForgotPassword;
