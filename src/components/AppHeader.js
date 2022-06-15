import React from "react";

export default function AppHeader({
  handleFilter,
  options,
  handleOptionClick,
}) {
  return (
    <div className="app_header">
      <div>
        <span> Filter </span>
        <select
          name="filter-options"
          id="filter-options"
          onChange={handleOptionClick}
        >
          {options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button onClick={handleFilter}>Submit</button>
      </div>
    </div>
  );
}
