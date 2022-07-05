import React, { useEffect, useState } from "react";

export default function CheckboxWithLabel({
  label,
  handleCheckboxSelection,
  selectedArray,
}) {
  const [checked, setChecked] = useState(selectedArray.includes(label));

  useEffect(() => {
    setChecked(selectedArray.includes(label));
  }, [selectedArray]);

  return (
    <div
      className="row"
      onClick={(e) => {
        e.preventDefault();
        handleCheckboxSelection(label, !checked);
        setChecked(!checked);
      }}
    >
      <input
        type="checkbox"
        checked={selectedArray.includes(label)}
        onChange={(e) => {}}
      />
      <span className="label">{label}</span>
    </div>
  );
}
