import { createContext, useState } from "react"

export const AppContext = createContext<any>({});

interface IDate {
  currentMonth: number;
  year: number; 
  month: number;
  today: number;
  monthName: string;
  type: string;
}

interface IProps extends React.PropsWithChildren {}

const ContextProvider: React.FC<IProps> = ({ children }): JSX.Element => {
  const [dateValues, setDateValues] = useState<IDate>({
    currentMonth: 0,
    year: 0,
    month: 0,
    today: 0,
    monthName: "",
    type: "jalali",
  });

  return (
    <AppContext.Provider value={{ dateValues, setDateValues }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
