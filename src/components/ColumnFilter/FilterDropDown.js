import React, { useState } from "react";
import CheckboxWithLabel from "./CheckboxWithLabel";
import ClickAwayListener from "react-click-away-listener";
import "./filter.css";

export default function FilterDropDown({
  options = [],
  handleCheckboxSelection,
  handleOutsideFilterClick,
  selectedArray=[]
}) {
  return (
    <ClickAwayListener onClickAway={handleOutsideFilterClick} >
      <div className="list">
        {options.map((option) => (
          <CheckboxWithLabel
            label={option}
            handleCheckboxSelection={handleCheckboxSelection}
            selectedArray={selectedArray}
          />
        ))}
      </div>
    </ClickAwayListener>
  );
}
