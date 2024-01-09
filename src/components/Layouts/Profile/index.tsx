import Button from "../../Common/Form/Button";
import SideBar from "../Dashboard/SideBar";
import styles from "../Auth/Header/style.module.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import IconItem from "../../Common/IconItem";

const ProfileLayout: React.FC = (): JSX.Element => {
  const { pathname } = useLocation();

  const handleClick = () => {};
  return (
    <div className="flex px-2XL">
      <div className="flex-grow flex-col w-full pb-10">
        <Outlet />
      </div>
      <SideBar>
        <Link to="/workspaces">
          <h2 className={`${styles.navbarTitle} bg-gradient-to-r from-header-color1 to-header-color2 mb-[45px] mt-XL`}>
            کوئرا تسک منیجر
          </h2>
        </Link>
        <div className="flex flex-col items-end ">
          <Link to="/workspaces">
            <Button
              text="بازگشت"
              type="button"
              hasIcon={true}
              onClick={handleClick}
              className="bg-brand-primary text-white text-xl rounded-md w-[113px] h-XL justify-start mb-[36px] p-[4px]"
              icon={{
                icon: "arrow_right",
                color: "white",
                className: "ml-1",
              }}
            />
          </Link>
          <ul className="flex flex-col w-full justify-start gap-L">
            <IconItem
              text="اطلاعات فردی"
              url="information"
              icon="profile_edit"
              className={`${
                pathname === "/information"
                  ? "bg-blue_secondary font-bold dark:text-[#323232]"
                  : ""
              }`}
            ></IconItem>
            <IconItem
              text="اطلاعات حساب"
              url="account"
              icon="profile_check"
              className={`${
                pathname === "/account"
                  ? "bg-blue_secondary font-bold dark:text-[#323232]"
                  : ""
              }`}
            ></IconItem>
            <IconItem
              text="تنظیمات"
              url="setting"
              icon="setting"
              className={`${
                pathname === "/setting"
                  ? "bg-blue_secondary font-bold dark:text-[#323232]"
                  : ""
              }`}
            ></IconItem>
          </ul>
        </div>
      </SideBar>
    </div>
  );
};

export default ProfileLayout;
