import Card from "../../../components/Layouts/Auth/Card";
import Input from "../../../components/Common/Form/Input";
import Button from "../../../components/Common/Form/Button";
import Checkbox from "../../../components/Common/Form/Checkbox";

import { useEffect, useState } from "react";
import {
  required,
  minLength,
  email,
  validate,
  checked,
  strong,
} from "../../../utils/validator/index";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { register } from "../../../constants/url";
import RulesModal from "../../../components/Layouts/Auth/RulesModal";

type Values = {
  username: string,
  email: string,
  password: string,
  rules: boolean,
}

const rules = {
  username: [required, minLength(4)],
  email: [required, email],
  password: [required, minLength(8), strong],
  rules: [checked],
};

const Register: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const [rulesModal,setrulesModal]=useState(false)
  const [values, setValues] = useState<Values>({
    username: "",
    email: "",
    password: "",
    rules: false,
  });
  const [response, error, loading, fetcher] = useAxios();

  const handleChange = (name: string, value: string | boolean) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = async () => {
    const resultErrors = validate(values, rules);

    if (resultErrors.length) {
      setErrors(resultErrors);
    } else {
      await fetcher("post", register.post(), values);
    }
  };
    const clickRules=()=>{
     setrulesModal(!rulesModal)
     }
  useEffect(() => {
    if (response) {
      navigate("/login");
    }
  }, [response])

  return (
    <Card page={"register"} errors={errors}>
      <form className="flex flex-col gap-[20px] self-stretch">
        <Input
          inputValue={values.username}
          name="username"
          id="username"
          type="text"
          label="نام کاربری"
          className="h-XL"
          hasLabel={true}
          onChange={(name, value) => handleChange(name, value)}
        />
        <Input
          inputValue={values.email}
          name="email"
          id="email"
          type="email"
          label="ایمیل"
          className="h-XL"
          hasLabel={true}
          onChange={(name, value) => handleChange(name, value)}
        />
        <Input
          inputValue={values.password}
          name="password"
          id="password"
          type="password"
          label="رمز عبور"
          className="h-XL"
          hasLabel={true}
          onChange={(name, value) => handleChange(name, value)}
        />
        <Checkbox
          name="rules"
          id="rules"
          type="checkbox"
          label=".قوانین و مقررات را می‌پذیرم"
          hasLabel={true}
          className="text-blue-primary cursor-pointer"
          onChange={(name, value) => handleChange(name, value)}
          onClick={clickRules}
        />
        <Button
          loading={loading}
          text="ثبت‌نام"
          type="button"
          onClick={handleClick}
          hasIcon={false}
          className="text-white text-sm leading-normal font-extrabold h-12 self-stretch rounded-md bg-brand-primary"
        />
      </form>
      {rulesModal && <RulesModal modal={rulesModal} setModal={clickRules} />}
    </Card>
    
  );
};

export default Register;
