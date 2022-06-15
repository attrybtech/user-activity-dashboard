import React from "react";
import TableRow from "./TableRow";

export default function Table({ userActivity = [], handleRowClick,loading}) {

  return (
    <table id="customers">
      <thead>
        <tr>
          <th>ID</th>
          <th>Device</th>
          <th>User</th>
          <th>Location</th>
          <th>User Action</th>
        </tr>
      </thead>
      <tbody>
          <>
          {
              loading ? 'Loading...' : (
                <>{userActivity.map((activity, idx) => (
                  <TableRow activity={activity} key={idx} handleRowClick={handleRowClick} activityIdx={idx} />
                ))}</>
            ) 
          }
          </>
        
      </tbody>
    </table>
  );
}
