import moment from "moment-jalaali";
import uuid from "react-uuid";

// dateMaker get month index (0 is current ,1 and more are next monthes and -1 and more are previous monthew)
// dateMaker use for both gregorian and jalali dates
// example : to get next moth set first param of dateMaker to 1 and to get prev month dates set it to -1
// how to use : const result = datesMaker(dateValues.currentMonth, 'jalali');

type DateList = {
  key: string;
  day: string;
  showBtn: boolean;
  value: string;
  disable: boolean;
  uKey: number;
  month: number
  task?: []
};

export const datesMaker = (currentMonth = 0, type = "gregorian") => {
  const date = new Date();
  date.setMonth(date.getMonth() + currentMonth);

  // get full persian date, it return array [0] = year, [1] = month , [2] = day
  const splitedtDate = date
    .toLocaleDateString(
      type === "jalali" ? "fa-IR-u-nu-latn" : "en-US-u-nu-latn"
    )
    .split("/")
    .map(Number);

  // set year, month and currentDay
  const year = type === "jalali" ? splitedtDate[0] : splitedtDate[2];
  const month = type === "jalali" ? splitedtDate[1] : splitedtDate[0];
  const today = type === "jalali" ? splitedtDate[2] : splitedtDate[1];
  const monthName = date.toLocaleDateString(
    type === "jalali" ? "fa-IR" : "en-US",
    { month: "short" }
  );

  return createArray(year, month, today, date, monthName, type);
};

const createArray = (
  year: number,
  month: number,
  today: number,
  date: Date,
  monthName: string,
  type: string,
) => {
  let firstDayOfWeekIndex: number = 0;
  // get first day of week to start array from there
  if (type === "jalali") {
    let firstDayOfMonth = moment(`${year}-${month}-1`, "jYYYY-jM-jD").format(
      "YYYY-M-D"
    );

    firstDayOfWeekIndex = new Date(firstDayOfMonth).getDay();
    // change day index during to persian week days (week start day is friday in gregorian calender, plus it one to start from saturday)
    firstDayOfWeekIndex =
      firstDayOfWeekIndex === 6 ? 0 : firstDayOfWeekIndex + 1;
  } else {
    firstDayOfWeekIndex = new Date(`${year}-${month}-1`).getDay() + 1;
  }

  let monthLength: number,
    prevMothLenth: number,
    prevMothDays: number,
    prevMonth: number = 0;
  if (type === "jalali") {
    // get month length to indicate max number for loop to create array of dates
    monthLength = moment.jDaysInMonth(year, month - 1);
    // get previous month length
    prevMothLenth = moment.jDaysInMonth(year, month - 2);
    // get prevoius month days
    prevMothDays = prevMothLenth - (firstDayOfWeekIndex - 1);
    prevMonth = month - 1 === 0 ? 12 : month - 1;
  } else {
    monthLength = new Date(year, month, 0).getDate();
    prevMothLenth = new Date(year, month - 1, 0).getDate();
    prevMothDays = prevMothLenth - (firstDayOfWeekIndex - 1);
    prevMonth = month - 1 === 0 ? 12 : month - 1;
  }

  // create table of dates
  let dates: DateList[] = [];
  let index = firstDayOfWeekIndex;
  for (let i = 0; i < monthLength; i++) {
    // fill previous month dates
    if (i < firstDayOfWeekIndex) {
      const value =
        type === "jalali"
          ? moment(`${year}-${prevMonth}-${prevMothDays}`, "jYYYY-jM-jD").format(
              "YYYY-M-D"
            )
          : `${year}-${prevMonth}-${prevMothDays}`;

      dates[i] = {
        key: uuid(),
        day: String(prevMothDays),
        value,
        month: prevMonth,
        showBtn: false,
        disable: true,
        uKey: new Date(value).getTime(),
        task: []
      };
      prevMothDays += 1;
    }
    // fill current month dates start from first day of week index
    const value =
      type === "jalali"
        ? moment(`${year}-${month}-${i + 1}`, "jYYYY-jM-jD").format("YYYY-M-D")
        : `${year}-${month}-${i + 1}`;

    dates[index] = {
      key: uuid(),
      day: String(i + 1),
      value,
      month: month,
      showBtn: false,
      disable: false,
      uKey: new Date(value).getTime(),
      task: []
    };
    index += 1;
  }

  return {
    year,
    month,
    today,
    monthName,
    type,
    dates,
  };
};
