import React from "react";
import EmptyStateImg from '../assets/empty-state.svg'

export default function Modal({ activity = {}, modalHeading = "" }) {
  return (
    <div id="expand_activites-modal" className="modal">
    <div className="modal-content" id="modal-content">
     {
     (activity && Object.keys(activity).length === 0) 
     ? 
     <>
        <div> 
            <div className="empty__state-heading" >
                <p>Data not available</p>
            </div>
            <div className="empty__state-img"  >
                <img src={EmptyStateImg} />
            </div>
        </div>
     </>
    :
     <>
        <p className="modal_heading" style={{ textAlign: "center" }}>{modalHeading.toUpperCase()}</p>
        <table id="expand_activites-modal-table">
          <thead>
            <tr className="expand_activites-modal-table-heading-row">
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(activity).map((element, idx) => (
              <tr>
                <td className="modal-content-table-data">{element[0]}</td>
                <td className="modal-content-table-data">
                  {" "}
                  {typeof element[1] === "object"
                    ? JSON.stringify(element[1])
                    : element[1].toString()}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </>}
      </div>
    </div>
  );
}
