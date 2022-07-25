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

  const getMaxDate = () => {
    const date = new Date()
    const month =( date.getMonth() + 1) > 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`
    return `${date.getFullYear()}-${month}-${date.getDate()}`
  }

  return (
    <div id="expand_activites-modal" className="modal expand_activites_date-picker-modal">
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
                  max={getMaxDate()}
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
                  max={getMaxDate()}
                  min={startDate}
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
