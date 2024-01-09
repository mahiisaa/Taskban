import { useEffect, useState } from "react";
import ColorPicker from "../../../components/Common/ColorPicker";
import Button from "../../../components/Common/Form/Button";
import Switcher from "../../../components/Theme/Switcher";
import { useDispatch } from "react-redux";
import { setting } from "../../../constants/url";
import { AXIOS } from "../../../config/axios.config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  selectSetting,
  updateSetting,
} from "../../../features/setting/settingSlice";

const Setting: React.FC = (): JSX.Element => {
  const appSetting = useSelector(selectSetting);
  const [color, setColor] = useState(appSetting.theme);
  const [themeUpdate, setThemeUpdate] = useState(false);
  const dispatch = useDispatch();
  const root = document.documentElement;

  const handleClick = async () => {
    setThemeUpdate(false);
    try {
      const res = await AXIOS.post(setting.post(), { theme: color });
      if (res?.status === 201) {
        setThemeUpdate(true);
        dispatch(updateSetting(res.data));
        setColor(res.data.theme);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    root.style.setProperty("--color-primary", color);
    if (themeUpdate) {
      window.location.reload();
    }
    setThemeUpdate(false);
  }, [appSetting]);

  return (
    <div className="flex justify-end">
      <div className="flex flex-col mt-[125px] mr-[58px]">
        <h2 className="text-[31px] text-bold text-right mb-L">تنظیمات</h2>
        <h3 className="dark:text-[#bac4c8] text-right text-normal text-black mb-XS">
          انتخاب تم
        </h3>
        <div>
          <div className="flex flex-row-reverse items-center">
            <ColorPicker
              onClick={(data) => setColor(data.code || "")}
              hasDisableIcon={false}
              selected={color}
            />
          </div>
        </div>
        <div className="my-M flex flex-row-reverse">
          <Switcher />
        </div>
        <Button
          text="ثبت تغییرات"
          type="button"
          onClick={handleClick}
          hasIcon={false}
          className="text-white text-sm font-black leading-normal h-XL self-stretch rounded-md bg-brand-primary"
        />
      </div>
    </div>
  );
};

export default Setting;
