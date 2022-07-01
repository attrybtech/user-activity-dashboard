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
}) {
  return (
    <div className="pagination_container">
      <ul className="pages" id="pages_container">
        {pageArray.map((page, idx) => (
          <li key={idx}>
            <button
              className={`page__numbers ${
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
    </div>
  );
}
