export interface IMember {
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
  
  export interface IProps {
    members?: IMember[];
  }