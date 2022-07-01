import React from "react";

const activities = ["location", "device", "user", "userAction"];

export default function TableRow({ activity, handleRowClick, activityIdx }) {
  const getTime = () => {
    let timeStamp = activity?.userAction?.timestamp 
    if(( typeof timeStamp ) === 'string') timeStamp = parseInt(timeStamp)
    if (timeStamp) {

      // const day = new Date(timeStamp).getDay()
      const date = new Date(timeStamp).getDate();
      const month = new Date(timeStamp).getMonth();
      const year = new Date(timeStamp).getFullYear();
      return `${date}/${month}/${year}`;
    } else return "";
  };

  const getTimeStamp = () => {
    let timeStamp = activity?.userAction?.timestamp 
    if(( typeof timeStamp ) === 'string') timeStamp = parseInt(timeStamp)
    if (timeStamp) {
      const hour = new Date(timeStamp).getHours();
      const mins = new Date(timeStamp).getMinutes();
      const secs = new Date(timeStamp).getSeconds();
      const miliSecs = new Date(
        timeStamp
      ).getMilliseconds();
      return `${hour}:${mins}:${secs}:${miliSecs}`;
    } else return null;
  };

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
      <td id="id-field">{activity?.user?.id}</td>

      {activities.map((element, idx) => (
        <td
          className="table_row-text"
          onClick={() => handleRowClick(activityIdx, element)}
          key={idx}
        >
          {element}
        </td>
      ))}
    </tr>
  );
}
