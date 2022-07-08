import React, { useEffect } from "react";
import "./index.css";

export default function Pagination({
  page,
  totalRecords,
  pageSize,
  handlePageChange,
  pageArray,
  pageLength,
  isPaginationButtonDisable,
  handleDownloadClick,
}) {
  return (
    <div className="pagination_container">
      <ul className="pages" id="pages_container">
        {pageArray.map((page, idx) => (
          <li key={idx}>
            <button
              className={`btn btn--primary ${
                isPaginationButtonDisable(idx) && "--disabled"
              }`}
              onClick={() => handlePageChange(page)}
              disabled={isPaginationButtonDisable(idx)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        className={`btn btn--primary`}
        onClick={handleDownloadClick}
        style={{position:'absolute', right:30}}
      >
        Download
      </button>
    </div>
  );
}
