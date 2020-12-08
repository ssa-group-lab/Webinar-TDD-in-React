import React, { useState, useEffect, useRef } from "react";
import "./Dropdown.scss";

function Dropdown({ items, onSelect }) {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpened(false);
      }
    };

    document.addEventListener("click", onClickOutside);

    return () => {
      // TODO: clear event listeners
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown__caption" onClick={() => setIsOpened(true)}>
        {selectedItem.text || "Click here to open the dropdown"}
      </button>
      {isOpened ? (
        <ul className="dropdown__list">
          {items.map((item) => (
            <li className="dropdown__listitem" key={item.id}>
              <button
                className={`dropdown__listbutton ${
                  selectedItem.id === item.id
                    ? "dropdown__listbutton--selected"
                    : ""
                }`}
                onClick={() => {
                  setSelectedItem(item);
                  onSelect(item);
                  setIsOpened(false);
                }}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default Dropdown;
