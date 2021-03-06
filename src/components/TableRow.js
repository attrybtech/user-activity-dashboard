import React from "react";

const activities = [
  { label: "Expand location", property: "location" },
  { label: "Expand device", property: "device" },
  { label: "Expand user", property: "user" },
  { label: "Expand userAction", property: "userAction" },
];

export default function TableRow({ activity, handleRowClick, activityIdx }) {
  const getTime = () => {
    let timeStamp = activity?.userAction?.timestamp;
    if (typeof timeStamp === "string") timeStamp = parseInt(timeStamp);
    if (timeStamp) {
      // const day = new Date(timeStamp).getDay()
      const date = new Date(timeStamp).getDate();
      const month = new Date(timeStamp).getMonth();
      const year = new Date(timeStamp).getFullYear();
      return `${date}/${month + 1}/${year}`;
    } else return "";
  };

  const getTimeStamp = () => {
    let timeStamp = activity?.userAction?.timestamp;
    if (typeof timeStamp === "string") timeStamp = parseInt(timeStamp);
    if (timeStamp) {
      let hour = new Date(timeStamp).getHours();
      const mins = new Date(timeStamp).getMinutes();
      const secs = new Date(timeStamp).getSeconds();
      let hours = hour % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      // const miliSecs = new Date(timeStamp).getMilliseconds();
      return `${hours}:${mins}:${secs} ${findMeridiemIndicator(
        new Date(timeStamp)
      )} `;
    } else return null;
  };

  function findMeridiemIndicator(date) {
    var hours = date?.getHours();
    var ampm = hours >= 12 ? "PM" : "AM";
    return ampm;
  }

  return (
    <tr id="table-row">
      <td className="table_row-text">{getTime()}</td>
      <td className="table_row-text">{getTimeStamp()}</td>
      <td className="table_row-text">{activity?.device?.deviceCategory}</td>
      <td className="table_row-text">{`${activity?.location?.country?.name}`}</td>
      <td className="table_row-text">{`${activity?.location?.city?.name}`}</td>
      <td className="table_row-text">
        {activity?.user?.ipAddress || activity?.location?.ipAddress}
      </td>
      <td className="table_row-text">{activity?.userAction?.action}</td>
      <td id="id-field" className="table_row-text">{activity?.user?.id}</td>

      {activities.map((element, idx) => (
        <td
          className="table_row-text expandable-rows"
          onClick={() => handleRowClick(activityIdx, element.property)}
          key={idx}
        >
          {element.label}
        </td>
      ))}
    </tr>
  );
}
