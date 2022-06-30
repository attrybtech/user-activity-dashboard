import React, { useState } from "react";
import CheckboxWithLabel from "./CheckboxWithLabel";
import "./filter.css";

export default function FilterDropDown({
  options = [],
  handleCheckboxSelection,
}) {
  return (
    <div className="list">
      {options.map((option) => (
        <CheckboxWithLabel
          label={option}
          handleCheckboxSelection={handleCheckboxSelection}
        />
      ))}
    </div>
  );
}
