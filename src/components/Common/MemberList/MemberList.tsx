import { useEffect } from "react";
import MemberRow from "./MemberRow/MemberRow";

interface IMember {
  id: number;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    thumbnail: string;
  };
}

interface IProps {
  members?: IMember[];
}

const MemberList: React.FC<IProps> = ({ members }): JSX.Element => {

  useEffect(() => { }, [members]);

  return (
    <>
      <span className="text-sm text-[#7D828C] flex flex-row-reverse">
        اشتراک‌گذاشته شده با
      </span>
      <ul className="flex flex-col gap-XS">
        {members?.map((item) => (
          <MemberRow
            key={item.id}
            email={item.user.email}
            thumbnail={item.user.thumbnail}
            first_name={item.user.first_name}
            last_name={item.user.last_name}
          />
        ))}
      </ul>
    </>
  );
};

export default MemberList;
