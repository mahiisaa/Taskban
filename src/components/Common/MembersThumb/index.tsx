import colors from "../ColorPicker/colors";
import Icon from "../Icon";
import { useState, useEffect } from "react";
import {members_thumb, IProps} from '../../../interfaces/members_thumb'

const MembersThumb: React.FC<IProps> = ({
  size = 32,
  members = [],
  hasAddIcon = false,
}): JSX.Element => {
  const [slicedData, setSlicedData] = useState<members_thumb[]>([]);

  const randomColor = () => {
    const max = 12;
    const min = 0;
    const randomColor =
      colors[Math.floor(Math.random() * (max - min + 1) + min)].code;
    const colorDetails = {
      mainColor: randomColor,
      paleColor: randomColor,
    };

    return colorDetails;
  };

  useEffect(() => {
    if (members?.length > 3) {
      setSlicedData(members?.slice(0, 3));
    } else {
      setSlicedData(members);
    }
  }, []);

  return (
    <div
      className="relative flex items-center z-10"
      style={{
        width: 
          (slicedData?.length +
            (hasAddIcon ? 1 : 0) +
            (members?.length > 3 ? 1 : 0)) *
          (size / 2) || 0
      }}
    >
      {slicedData?.map((member, index) => {
        const rightIndention = index * (size / 2);
        const firstLettersOfName: string =
          member.first_name?.charAt(0) + member.last_name?.charAt(0);

        return (
          <div
            key={member.id}
            className={`absolute rounded-full p-1 flex justify-center items-center`}
            style={{
              backgroundImage: `url(${member.thumbnail})`,
              right: `${rightIndention}px`,
              zIndex: `-${rightIndention}`,
              backgroundColor: randomColor().paleColor,
              width: size + "px",
              height: size + "px",
              color: "#222",
              fontSize: size / 2.5 + "px",
            }}
          >
            {member?.thumbnail ? "" : firstLettersOfName}
          </div>
        );
      })}
      {members?.length > 3 ? (
        <div
          className="absolute rounded-full border-[#c1c1c1] flex justify-center items-center bg-lightgray_300"
          style={{
            zIndex: `-${slicedData.length * (size / 2)}`,
            right: slicedData.length * (size / 2),
            width: size + "px",
            height: size + "px",
          }}
        >
          <Icon icon="dots" color="#000000" size={size / 1.2} />
        </div>
      ) : null}
      {hasAddIcon && (
        <div
          className="absolute border-dashed border-2 rounded-full border-[#c1c1c1] flex justify-center items-center"
          style={{
            zIndex: `-${(slicedData.length + 1) * (size / 2)}`,
            right: (slicedData.length + 1) * (size / 2),
            width: size + "px",
            height: size + "px",
          }}
        >
          <Icon icon="user_add" color="#c1c1c1" size={size / 1.3} />
        </div>
      )}
    </div>
  );
};

export default MembersThumb;
