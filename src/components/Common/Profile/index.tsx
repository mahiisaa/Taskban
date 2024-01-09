import colors from "../ColorPicker/colors";
import Icon from "../Icon";
import {IProps} from '../../../interfaces/members_thumb'

const ProfileThumb: React.FC<IProps> = ({
  size = 32,
  members = [],
  addIcon = false,
}): JSX.Element => {

  const randomColor = () => {
    const max = 12;
    const min = 0;
    const randomColor = colors[Math.floor(Math.random() * (max - min + 1) + min)].code;
    const colorDetails = {
      mainColor: randomColor,
      paleColor: randomColor,
    };

    return colorDetails.paleColor
  }

  return (
    <div className="relative z-20 flex flex-row-reverse items-center">
      {members?.map((member, index) => {
        const rightIndention = index * (size / 2)
        const firstLettersOfName: string = member.first_name?.charAt(0) + member.last_name?.charAt(0);
        return (
          <div
            key={member.id}
            className={`absolute rounded-full p-1 flex justify-center items-center text-xs z-10`}
            style={{
              backgroundImage: member.thumbnail,
              right: `${rightIndention}px`,
              zIndex: `-${rightIndention}`,
              backgroundColor: randomColor(),
              width: size + "px",
              height: size + "px",
              fontSize: size / 2 + "px",
            }}
          >
            {firstLettersOfName}
          </div>
        )
      })}
      {addIcon && (
        <div
          className="absolute border-dashed border-2 rounded-full border-[#c1c1c1] flex justify-center items-center"
          style={{
            zIndex: `-${members.length * (size / 2)}`,
            right: (members.length * (size / 2)),
            width: size + "px",
            height: size + "px",
          }}
        >
          <Icon icon="user_add" color="#c1c1c1" size={(size / 2)} />
        </div>
      )}
    </div>
  );
};

export default ProfileThumb;
