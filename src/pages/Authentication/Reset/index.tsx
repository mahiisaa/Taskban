import Card from "../../../components/Layouts/Auth/Card";
import Input from "../../../components/Common/Form/Input";
import Button from "../../../components/Common/Form/Button";
import { useState, useEffect } from "react";
import {
  minLength,
  required,
  strong,
  validate,
} from "../../../utils/validator";
import useAxios from "../../../hooks/useAxios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { forget } from "../../../constants/url";

const rules = {
  password: [required, strong, minLength(8)],
};

type Values = {
  [key: string]: string;
};

const Reset: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errors, setErrors] = useState<string[]>([]);
  const [values, setValues] = useState<Values>({
    password: "",
    password1: "",
    token: "",
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
      values.password1 = values.password;
      values.token = searchParams.get("token") || "";

      await fetcher("patch", forget.patch(), values);
    }
  };

  useEffect(() => {
    if (response) {
      navigate("/login");
    }
  }, [response]);

  return (
    <Card page={"reset"} errors={errors}>
      <form className="flex flex-col gap-5 self-stretch">
        <Input
          name="password"
          id="password"
          type="password"
          label="رمز عبور جدید را وارد کنید"
          className="h-XL"
          hasLabel={true}
          onChange={(name, value) => handleChange(name, value)}
        />
        <Button
          loading={loading}
          text="تغییر رمز عبور"
          type="button"
          onClick={handleClick}
          hasIcon={false}
          className="text-white text-sm leading-normal font-extrabold h-12 self-stretch rounded-md bg-brand-primary"
        />
      </form>
    </Card>
  );
};

export default Reset;
