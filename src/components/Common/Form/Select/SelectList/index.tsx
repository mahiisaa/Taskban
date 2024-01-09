import Input from "../../Input";

interface IItem {
  id: number;
  name: string;
  color?: string;
}

interface IProps {
  items: IItem[];
  name: string,
  hasSearch?: boolean;
  searchPlaceholder?: string;
  onSelect: (e: React.MouseEvent<HTMLElement>) => void;
  onSearch: (value: string) => void;
  listDirection?: {}
}

const Selectlist: React.FC<IProps> = ({
  onSelect,
  onSearch,
  items,
  name,
  hasSearch = true,
  searchPlaceholder = "جستجو بین فیلترها",
  listDirection
}): JSX.Element => {

  const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
    onSelect(e)
  };

  const handleSearch = (name: string, value: string) => {
    onSearch(value)
  }

  return (
    <div
      style={listDirection}
      onClick={(e) => { e.stopPropagation() }}
      className={`bg-white rounded-lg gap-XS absolute w-full left-0 shadow-select border border-lightgray_300 z-10`}
    >
      {hasSearch ? (
        <div className="border-b-2 mb-XS border-lightgray_300">
          <Input
            autoFocus={true}
            className="pr-L border-none bg-white h-XL outline-none"
            placeholder={searchPlaceholder}
            name="search"
            id="search"
            type="text"
            hasLabel={false}
            hasIcon={true}
            icon={{
              icon: "search",
              color: "#208D8E",
            }}
            onChange={handleSearch}
          />
        </div>
      ) : <div style={{ maxWidth: 0, maxHeight: 0, overflow: 'hidden' }}>
        <input autoFocus={true} />
      </div>}
      <div className="max-h-[180px] overflow-auto">
        {items.length ? items?.map((item) => (
          <div
            data-name={name}
            data-value={item.id}
            className="p-XS hover:bg-lightgray_100 rounded-md"
            onClick={handleSelect}
            key={item.id}
          >
            {item.color ? (
              <span
                className={`bg-${item.color} text-black rounded-2xl px-2`}
              >
                {item.name}
              </span>
            ) : (
              item.name
            )}
          </div>
        ))
          : <div className="p-XS rounded-md">!موردی یافت نشد</div>
        }
      </div>
    </div>
  );
};

export default Selectlist;