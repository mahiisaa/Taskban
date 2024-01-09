import Card from "../../../components/Layouts/Auth/Card";
import Input from "../../../components/Common/Form/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Common/Form/Button";
import { useState, useEffect } from "react";
import { required, validate } from "../../../utils/validator";
import API_URL from "../../../constants/api.url";
import { login } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import useAxios from "../../../hooks/useAxios";
const rules = {
  username: [required],
  password: [required],
};

type Values = {
  [key: string]: string;
};

const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<string[]>([]);
  const [values, setValues] = useState<Values>({
    username: "",
    password: "",
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
      await fetcher("post", API_URL.Login, values);
    }
  };

  useEffect(() => {
    if (response) {
      dispatch(login(response));
      navigate("/workspaces");
    }
  }, [response]);

  return (
    <Card page={"login"} errors={errors}>
      <form className="flex flex-col gap-L self-stretch">
        <div className="flex flex-col gap-M self-stretch">
          <Input
            autoComplete="on"
            inputValue={values.username}
            name="username"
            id="username"
            type="text"
            label="نام کاربری"
            hasLabel={true}
            className="h-XL"
            onChange={(name, value) => handleChange(name, value)}
          />
          <Input
          autoComplete="on"
            inputValue={values.password}
            name="password"
            id="password"
            type="password"
            label="رمز عبور"
            className="h-XL"
            hasLabel={true}
            subText={{
              text: "رمز عبور را فراموش کرده‌ای؟",
              link: "/forgot",
            }}
            onChange={(name, value) => handleChange(name, value)}
          />
        </div>
        <div className="flex flex-col items-center gap-M self-stretch">
          <Button
            loading={loading}
            autoFocus={true}
            text="ورود"
            type="button"
            onClick={handleClick}
            hasIcon={false}
            className="text-white text-sm leading-normal font-extrabold h-12 self-stretch rounded-md bg-brand-primary"
          />
          <div className="flex gap-XS">
            <Link
              className="text-brand-primary text-base font-extrabold"
              to="/register"
            >
              ثبت‌نام
            </Link>
            <span className="dark:text-[#bac4c8] text-black text-base font-medium">
              ثبت‌نام نکرده‌ای؟
            </span>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default Login;
