import React from "react";
import ClickAwayListener from "react-click-away-listener";

import "./index.css";

export default function DatePickerModal({
  setStartDate,
  startDate,
  endDate,
  setEndDate,
  handleDateSubmit,
  handleOutsideDatePickerClick,
}) {
  return (
    <div id="expand_activites-modal" className="modal">
      <ClickAwayListener onClickAway={handleOutsideDatePickerClick}>
        <div className="modal-content date_picker_modal" id="modal-content">
          <div className="range__date__input__container">
            <div className="date__inputs">
              <div className="range__input_start-date">
                <label className="date_label-text" for="start-date">Select Start Date</label>
                <input
                  type="date"
                  id="start-date"
                  name="start-date"
                  value={startDate}
                  placeholder="start date"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="range__input_end-date">
                <label className="date_label-text" for="end-date">Select End date</label>
                <input
                  type="date"
                  id="end-date"
                  name="end-date"
                  value={endDate}
                  placeholder="end date"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <button
              className="range__date__input-submit-btn btn btn--primary"
              onClick={handleDateSubmit}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
}
