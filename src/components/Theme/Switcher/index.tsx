import Icon from "../../Common/Icon";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const Switcher: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const handleClick = () => {
    toggleTheme();
    document.body.classList.toggle("dark");
    if (isDarkTheme === false) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <span
        onClick={handleClick}
        className={`flex items-center ${
          isDarkTheme === false ? "justify-end" : "justify-start"
        } w-[65px] bg-lightgray_200 rounded-md cursor-pointer`}
      >
        <Icon
          icon={isDarkTheme === false ? "sun" : "moon"}
          color="#818181"
          className={`${
            isDarkTheme === false ? "bg-white" : "bg-[#323232]"
          } m-1 rounded-md p-[3px]`}
        />
      </span>
    </>
  );
};

export default Switcher;
