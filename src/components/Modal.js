import React from "react";

export default function Modal({ activity={}, modalHeading="" }) {

  return (
    <div id="myModal" className="modal">
        
            <div className="modal-content" id="modal-content" >
            <h1 style={{textAlign:"center"}} >{modalHeading.toUpperCase()}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(activity).map((element,idx)=>(
                                <tr>
                                   <td className="modal-content-table-data" >{element[0]}</td>
                                    <td className="modal-content-table-data" > {typeof element[1] === 'object' ? JSON.stringify(element[1]) : element[1].toString() } </td>
                                </tr>
                            )
                            )
                        }
                       
                    </tbody>
                </table>
            </div>
            </div>
  );
}
