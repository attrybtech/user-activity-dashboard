import React from "react";

const activities = ["location", "device", "user", "userAction"];

export default function TableRow({ activity, handleRowClick, activityIdx }) {
  const getTime = () => {
    if (activity?.userAction?.time) {
      // const day = new Date(activity?.userAction?.time).getDay()
      const date = new Date(activity?.userAction?.time).getDate();
      const month = new Date(activity?.userAction?.time).getMonth();
      const year = new Date(activity?.userAction?.time).getFullYear();
      return `${date}/${month}/${year}`;
    } else return "";
  };

  const getTimeStamp = () => {
    if (activity?.userAction?.timestamp) {
      const hour = new Date(activity?.userAction?.timestamp).getHours();
      const mins = new Date(activity?.userAction?.timestamp).getMinutes();
      const secs = new Date(activity?.userAction?.timestamp).getSeconds();
      const miliSecs = new Date(
        activity?.userAction?.timestamp
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
