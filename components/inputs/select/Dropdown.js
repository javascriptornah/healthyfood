import { useRef, useEffect } from "react";

const Dropdown = ({
  searchPlaceholder,
  search,
  searchChangeHandler,
  selectedValue,
  selectedIndex,
  changeSelectedHandler,
  regions,
  name,
}) => {
  const searchInputEl = useRef();
  const itemsEl = useRef();

  useEffect(() => {
    if (selectedValue) {
      itemsEl.current.scrollTop =
        itemsEl?.current?.querySelector(`.item-${selectedIndex}`)?.offsetTop -
        42;
    }
  }, []);

  return (
    <div className="dropdown__menu">
      <div className="dropdown__menu_items small-scrollbar" ref={itemsEl}>
        {regions.map((item, index) => (
          <div
            className={
              selectedValue === item
                ? `dropdown__menu_item item-${regions.indexOf(item)} selected`
                : `dropdown__menu_item item-${regions.indexOf(item)}`
            }
            key={index}
            onClick={() =>
              changeSelectedHandler(item, name, regions.indexOf(item))
            }
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
