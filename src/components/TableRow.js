import React from "react";

const activities = ["location", "device", "user", "userAction"];

export default function TableRow({ activity, handleRowClick, activityIdx }) {

  const getTime = () => {
    if(activity?.userAction?.time){
      // const day = new Date(activity?.userAction?.time).getDay()
      const date = new Date(activity?.userAction?.time).getDate()
      const month = new Date(activity?.userAction?.time).getMonth()
      const year = new Date(activity?.userAction?.time).getFullYear()
      return `${date}/${month}/${year}`
    }
    else return ''
  }

  const getTimeStamp = () => {
    if(activity?.userAction?.timestamp){
      const hour = new Date(activity?.userAction?.timestamp).getHours()
      const mins = new Date(activity?.userAction?.timestamp).getMinutes()
      const secs = new Date(activity?.userAction?.timestamp).getSeconds()
      const miliSecs = new Date(activity?.userAction?.timestamp).getMilliseconds()
      return `${hour}:${mins}:${secs}:${miliSecs}`
    }
    else return ''
  }

  return (
    <tr id="table-row">
      <td id="id-field">{getTime()}</td>
      <td id="id-field">{getTimeStamp()}</td>
      <td id="id-field">{activity?.device?.deviceCategory}</td>
      <td id="id-field">{`${activity?.location?.city?.name}, ${activity?.location?.country?.name}`}</td>
      <td id="id-field">{activity?.user?.ipAddress || activity?.location?.ipAddress}</td>
      <td id="id-field">{activity?.userAction?.action}</td>
      <td id="id-field">{activity?.user?.id}</td>

      {activities.map((element, idx) => (
        <td onClick={() => handleRowClick(activityIdx, element)} key={idx}>
          {element}
        </td>
      ))}
      
    </tr>
  );
}
