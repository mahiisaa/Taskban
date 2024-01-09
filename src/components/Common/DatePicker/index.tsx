import React, { useEffect, useState, useContext } from "react";
import Table from "./Table";
import { datesMaker } from "../../../utils/datesMaker";
import { AppContext } from "../../../context/store";
import Navigator from "../../Dashboard/CalenderView/Navigator";
import Icon from "../Icon";
import Button from "../Form/Button";
import { datesBetween } from "../../../utils/datesBetween";

interface IProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  onChangeDate: ({}) => void;
}

const CalenderView: React.FC<IProps> = ({ onClick, onChangeDate }): JSX.Element => {
  const [dates, setDates] = useState<any[]>([]);
  const { dateValues, setDateValues } = useContext(AppContext);
  const [selecte, setSelecte] = useState({
    start: { date: "", day: "" },
    end: { date: "", day: "" },
  });
  const [selectedArray, setSelectedArray] = useState<number[]>([]);

  const handleSelect = (data) => {
    if (!selecte.start.date || (selecte.start.date && selecte.end.date)) {
      setSelecte({
        start: { date: data.date, day: data.day },
        end: { date: "", day: "" },
      });
      setSelectedArray([]);
    } else {
      let start = selecte.start;
      let end = data;

      if (new Date(start.date) > new Date(end.date)) {
        start = end;
        end = selecte.start;
      }

      setSelecte({ start, end });
      onChangeDate({ start, end })
      setSelectedArray(datesBetween(start.date, end.date));
    }
  };

  useEffect(() => {
    // dateMaker get month index (0 is current ,1 and more are next monthes and -1 and more are previous monthew)
    // dateMaker use for both gregorian and jalali dates
    // example : to get next moth set first param of dateMaker to 1 and to get prev month dates set it to -1
    const result = datesMaker(dateValues.currentMonth, dateValues.type);

    setDateValues({
      ...dateValues,
      year: result.year,
      month: result.month,
      today: result.today,
      monthName: result.monthName,
      type: result.type,
    });
    setDates(result.dates);
  }, [dateValues.currentMonth, dateValues.type]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row-reverse justify-between border-b-2 p-M border-lightgray_300 font-bold">
        <span className="flex justify-end grow gap-2">
          {selecte.start.date && (
            <span className="text-brand-primary flex justify-end gap-2">
              <span>
                {new Date(selecte.start.date).toLocaleDateString(
                  dateValues.type === "jalali" ? "fa-IR" : "en-US",
                  { month: "short" }
                )}
              </span>
              <span>{selecte.start.day}</span>
            </span>
          )}
          زمان شروع
          <Icon icon="calende_empty" />
        </span>
        <span className="flex justify-end grow gap-2">
          {selecte.end.date && (
            <span className="text-brand-primary flex justify-end gap-2">
              <span>
                {new Date(selecte.end.date).toLocaleDateString(
                  dateValues.type === "jalali" ? "fa-IR" : "en-US",
                  { month: "short" }
                )}
              </span>
              <span>{selecte.end.day}</span>
            </span>
          )}
          زمان پایان
          <Icon icon="calende_empty" />
        </span>
      </div>
      <div className="flex flex-row-reverse">
        <div className="w-[200px] bg-lightgray_200 py-M px-XS rounded-br-[12px] rounded-bl-[12px]">
          <ul className="flex flex-col gap-XS text-right text-sm">
            <li className="dark:text-[#323232] hover:bg-lightgray_300 p-1 transition-all duration-100 cursor-pointer rounded-md px-4 flex justify-between">
              <span></span>
              <span>امروز</span>
            </li>
            <li className="dark:text-[#323232] hover:bg-lightgray_300 p-1 transition-all duration-100 cursor-pointer rounded-md px-4">
              کمی بعد
            </li>
            <li className="dark:text-[#323232] hover:bg-lightgray_300 p-1 transition-all duration-100 cursor-pointer rounded-md px-4">
              فردا
            </li>
            <li className="dark:text-[#323232] hover:bg-lightgray_300 p-1 transition-all duration-100 cursor-pointer rounded-md px-4">
              این آخر هفته
            </li>
            <li className="dark:text-[#323232] hover:bg-lightgray_300 p-1 transition-all duration-100 cursor-pointer rounded-md px-4">
              آخر هفته بعد
            </li>
            <li className="dark:text-[#323232] hover:bg-lightgray_300 p-1 transition-all duration-100 cursor-pointer rounded-md px-4">
              دو هفته دیگر
            </li>
            <li className="dark:text-[#323232] hover:bg-lightgray_300 p-1 transition-all duration-100 cursor-pointer rounded-md px-4">
              چهار هفته دیگر
            </li>
          </ul>
        </div>
        <div className="w-[380px] mr-[23px] flex flex-col gap-S m-S">
          <div className="flex flex-row-reverse flex-end text-sm">
            <Navigator />
          </div>
          <Table
            selectedArray={selectedArray}
            monthName={dateValues.monthName}
            onclick={(data) => {
              handleSelect(data);
            }}
            type={dateValues.type}
            today={dateValues.today}
            dates={dates}
            currentMonth={dateValues.currentMonth}
          />
          <Button
            onClick={onClick}
            text="بستن"
            type="button"
            className="bg-brand-primary rounded-md w-[125px] text-white py-1"
          />
        </div>
      </div>
    </div>
  );
};

export default CalenderView;
