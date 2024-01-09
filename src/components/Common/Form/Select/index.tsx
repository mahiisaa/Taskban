import Icon from "../../Icon";
import React, { useEffect, useRef, useState } from "react";
import Selectlist from "./SelectList";
import Button from "../Button";

interface IProps {
  disabled?: boolean,
  selected?: number;
  items: any[];
  name: string;
  className?: string;
  hasSearch?: boolean;
  searchPlaceholder?: string;
  onChange: (e: React.MouseEvent<HTMLElement>) => void;
}

const Select: React.FC<IProps> = ({
  disabled = false,
  selected = 0,
  onChange,
  name,
  items,
  className,
  hasSearch = true,
  searchPlaceholder = "جستجو بین فیلترها",
}): JSX.Element => {
  const selectBtn = useRef<any>(null);
  const [value, setValue] = useState<string | null>("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(items);
  const [listDirection, setListDirectiob] = useState({});

  const toggleOpen = () => {
    const elementHeight =
      selectBtn.current.offsetTop + selectBtn.current.offsetHeight + 180;

    if (elementHeight > window.innerHeight) {
      setListDirectiob({ bottom: selectBtn.current.offsetHeight });
    } else {
      setListDirectiob({ top: selectBtn.current.offsetHeight });
    }
    setData(items);
    setOpen(!open);
  };

  const closeList = () => {
    setTimeout(() => {
      setOpen(false);
    }, 120);
  };

  const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
    setValue(e.currentTarget.textContent);
    onChange(e);
  };

  const handleSearch = (value: string) => {
    const data = items.filter((item) => {
      return item.name.includes(value);
    });

    setData(data);
  };

  useEffect(() => {
    if (selected && items) {
      setValue(items.find((x) => x.id === Number(selected)).name);
    }
  }, [selected, items]);

  return (
    <Button
      disabled={!items?.length || disabled}
      data-name="selectBtn"
      type="button"
      style={{ backgroundColor: !items?.length ? "#eee" : "" }}
      className={`border border-solid border-lightgray_300 rounded-md relative text-right p-XS bg-white text-[#000] ${className}`}
      onClick={toggleOpen}
      ref={selectBtn}
    >
      <div className="flex items-center flex-row-reverse justify-between flex-auto">
        <span
          className={`text-sm ${value ? "black" : "text-lightgray"} font-b`}
        >
          {value || "انتخاب کنید"}
        </span>
        <Icon icon="chevron_down" className="mr-auto" />
      </div>
      <div onBlur={closeList}>
        {open && (
          <Selectlist
            listDirection={listDirection}
            items={data}
            name={name}
            hasSearch={hasSearch}
            searchPlaceholder={searchPlaceholder}
            onSelect={handleSelect}
            onSearch={(value) => handleSearch(value)}
          />
        )}
      </div>
    </Button>
  );
};

export default Select;
