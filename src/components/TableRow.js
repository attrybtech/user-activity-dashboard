import React from "react";

const activities = ["location", "device", "user", "userAction"];

export default function TableRow({ activity, handleRowClick, activityIdx }) {
  return (
    <tr id="table-row">
      <td id="id-field">{activity?.user?.id}</td>
      {activities.map((element, idx) => (
        <td onClick={()=>handleRowClick(activityIdx,element)} key={idx}>{element}</td>
      ))}
    </tr>
  );
}
