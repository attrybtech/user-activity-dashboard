import React, { useState } from "react";

export default function CheckboxWithLabel({ label, handleCheckboxSelection }) {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className="row"
      onClick={(e) => {
        e.preventDefault();
        handleCheckboxSelection(label, !checked);
        setChecked(!checked);
      }}
    >
      <input type="checkbox" checked={checked} onChange={() => {}} />
      <span className="label">{label}</span>
    </div>
  );
}
