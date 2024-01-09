import { Outlet } from "react-router-dom";
import Header from "./Header";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { selectSetting } from "../../../features/setting/settingSlice";
import { useSelector } from "react-redux";

const AuthLayout: React.FC = (): JSX.Element => {
  return (
    <div
      className={`${styles.background} bg-gradient-to-r from-bg-color2 to-bg-color1`}
    >
      <span className={`${styles.skewBackground} dark:bg-[#323232]`}></span>
      <Header />
      <div className="flex justify-center items-center h-screen relative">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
