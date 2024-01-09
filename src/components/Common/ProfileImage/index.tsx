import { useEffect, useState } from "react";
import { selectSetting } from "../../../features/setting/settingSlice";
import {useSelector} from "react-redux"

interface IProps {
  img?: string;
  firstName: string;
  lastName: string;
  size?: number;
  nameColor?: boolean;
  showName?: boolean;
}

const ProfileImage: React.FC<IProps> = ({
  img,
  firstName,
  lastName,
  size = 32,
  nameColor = false,
  showName = false,
}): JSX.Element => {
  const [nameLetters, setNameLetters] = useState<string>("");
  const appSetting = useSelector(selectSetting);
  const [color, setColor] = useState(appSetting.theme);
  const [paleColor,setPale]=useState("")

    const newShade = (hexColor, magnitude) => {
      hexColor = hexColor.replace(`#`, ``);
      if (hexColor.length === 6) {
          const decimalColor = parseInt(hexColor, 16);
          let r = (decimalColor >> 16) + magnitude;
          r > 255 && (r = 255);
          r < 0 && (r = 0);
          let g = (decimalColor & 0x0000ff) + magnitude;
          g > 255 && (g = 255);
          g < 0 && (g = 0);
          let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
          b > 255 && (b = 255);
          b < 0 && (b = 0);
          setPale(`#${(g | (b << 8) | (r << 16)).toString(16)}`);
      } else {
          setPale(hexColor);
      }
  };
  useEffect(() => {
    setNameLetters(
      firstName?.charAt(0).toUpperCase() + lastName?.charAt(0).toUpperCase()
    );
    newShade(color,90);
  }, []);

  return (
    <div className="flex flex-row-reverse items-center">
      <div
        className="rounded-full p-1 flex justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${img})`,
          zIndex: 10,
          backgroundColor: nameColor ? paleColor : color,
          width: size + "px",
          height: size + "px",
          color: nameColor ? color : "#222",
          fontSize: size / 2.5 + "px",
        }}
      >
        {img ? "" : nameLetters}
      </div>
      {showName && (
        <span className="mr-1 font-bold">
          {!nameLetters ? (
            "بدون نام"
          ) : (
            <p>
              {firstName} {lastName}
            </p>
          )}
        </span>
      )}
    </div>
  );
};

export default ProfileImage;