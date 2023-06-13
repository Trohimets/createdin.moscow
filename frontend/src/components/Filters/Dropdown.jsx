// import dropdown from './dropdown.module.sass'
import "./dropdown.css";

import { useState } from "react";
export const Dropdown = ({ children, lable, value }) => {
  const [isOpen, setOpen] = useState(false);

  const toggleDropdown = (e) => {
   
    setOpen(!isOpen)};

  const handleMouseOver = () => {
    setOpen(true);
  };

  const handleMouseOut = () => {
    setOpen(false);
  };

  return (
    <div className="dropdown"       onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut} onClick={e => {toggleDropdown(e)}}>
      <div className="dropdown-header" >
        {value ? value : lable}
        <i className={`iconDr ${isOpen && "open"}`}></i>
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`} onClick={e =>  e.stopPropagation()}>{children}</div>
    </div>
  );
};
