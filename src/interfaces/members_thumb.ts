export interface members_thumb {
  id: number;
  username: string,
  email: string,
  first_name: string;
  last_name: string;
  thumbnail: string;
  phone_number: string,
}

export interface IProps {
  size?: number;
  hasAddIcon?: boolean;
  members?: members_thumb[];
  addIcon?: boolean,
}
