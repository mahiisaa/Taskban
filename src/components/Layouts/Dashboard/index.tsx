import { Outlet, useNavigate } from "react-router-dom";
import Button from "../../Common/Form/Button";
import Input from "../../Common/Form/Input";
import Icon from "../../Common/Icon";
import DarkMode from "../../Theme/Switcher";
import SideBar from "./SideBar";
import styles from "./style.module.css";
import List from "./../../Common/List";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import NestedModals from "../../Common/Modal/NestedModals";
import { logout, selectUser } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../../Common/ProfileImage";
import { IWorkspace } from "../../../interfaces/workspace";
import { selectWorkspace } from "../../../features/workspace/workspaceSlice";
import { boards, projects } from "../../../constants/url";

const DashboardLayout: React.FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const portals = document.getElementById("portals") as Element;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [data, setData] = useState<IWorkspace[]>([]);
  const [query, setQuery] = useState<string>("");
  const { workspaces } = useSelector(selectWorkspace);

  const handleSearch = (name: string, value: string) => {
    setQuery(value);
    const data = workspaces.filter((item) => {
      return (
        item.name.includes(value) ||
        item.projects.find((x) => x.name.includes(value))
      );
    });

    setData(data);
  };

  const handleClose = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => { }, [user]);
  return (
    <div className="flex px-2XL">
      <div className="flex-grow flex-col w-full overflow-hidden">
        <Outlet />
      </div>
      <SideBar>
        <h2 className={`${styles.navbarTitle} bg-gradient-to-r from-header-color1 to-header-color2 mb-[27px] mt-XL`}>
          <Link to="/workspaces">کوئرا تسک منیجر</Link>
        </h2>
        <div className="flex justify-between">
          <Icon icon="chevron_down" />
          <span className="font-bold font-base">ورک‌ اسپیس‌ها</span>
        </div>
        <Input
          inputValue={query}
          className="pr-L my-5 border-none bg-lightgray_100 h-XL text-xs relative"
          placeholder="جستجو کنید"
          name="search"
          id="search"
          type="text"
          hasLabel={false}
          hasIcon={true}
          icon={{
            icon: "search",
          }}
          onChange={(name, value) => handleSearch(name, value)}
        >
          {query && (
            <div className="absolute left-0 bg-white w-full rounded-sm top-[64px] p-2 shadow-select z-30 max-h-[200px] overflow-y-auto overflow-x-hidden">
              {data.length ? (
                data?.map((item) => {
                  return (
                    <div className="flex flex-col" key={item.id}>
                      <div
                        style={{ color: item.color }}
                        key={item.id}
                        className="cursor-pointer hover:bg-lightgray_200 p-1 rounded-sm"
                      >
                        {item.name}
                      </div>
                      <div>
                        {item.projects.map((project) => {
                          if (project.name.includes(query)) {
                            return (
                              <p
                                key={project.id}
                                onClick={() => {
                                  navigate(
                                    `${boards.gets({
                                      wid: item.id,
                                      pid: project.id,
                                    })}`
                                  );
                                  setQuery("")
                                }}
                                className="flex flex-row-reverse items-center cursor-pointer hover:bg-lightgray_200 p-1 rounded-sm text-sm"
                              >
                                <Icon icon="chevron_left" />
                                {project.name}
                              </p>
                            );
                          }
                        })}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>! موردی یافت نشد</p>
              )}
            </div>
          )}
        </Input>
        <Button
          text="ساختن اسپیس جدید"
          onClick={() => {
            setIsModalOpen(true);
          }}
          type="button"
          className="bg-lightgray_300 text-black h-L text-sm leading-normal self-stretch rounded-md"
          hasIcon={true}
          icon={{
            icon: "plus_square",
            color: "black",
            className: "ml-1",
          }}
        />
        <List />

        <div className="mt-auto mb-L flex flex-col gap-S border-t-2 pt-5 border-lightgray_200">
          <Link to="/account">
            <ProfileImage
              firstName={user.first_name}
              lastName={user.last_name}
              showName={true}
              img={user.thumbnail}
            />
          </Link>
          <div className="flex justify-between items-center">
            <DarkMode />
            <span
              className="flex items-center cursor-pointer"
              onClick={handleClose}
            >
              خروج
              <Icon icon="door" color="#818181" />
            </span>
          </div>
        </div>
      </SideBar>
      {createPortal(
        <NestedModals
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />,
        portals
      )}
    </div>
  );
};

export default DashboardLayout;
