import React, { useEffect } from "react";
import Footer from "../Footer";
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
      <Footer />
      <>
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
        <div className="pages_container-download-btn" >
          <button
            className={`btn btn--primary`}
            onClick={handleDownloadClick}
            // style={{ position: "absolute", right: 30 }}
          >
            Download
          </button>
        </div>
      </>
    </div>
  );
}
