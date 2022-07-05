import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import FilterDropDown from "./ColumnFilter/FilterDropDown";
import { DEVICE_CATEGORY_COLUMN_FILTER_OPTIONS } from "../constants";
import ChevronDownIcon from "../assets/icons/chevron-down.svg";

export default function Table({
  userActivities = [],
  handleRowClick,
  loading,
  uniqueCountries,
  uniqueCities,
  handleCitySelection,
  handleCountrySelection,
  selectedCities,
  selectedCountries,
  handleDeviceCategorySelection,
  selectedDeviceCategory,
  handleDateSubmit,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  const [showDeviceCategoryFilter, setShowDeviceCategoryFilter] =
    useState(false);
  const [showCountryFilter, setShowCountryFilter] = useState(false);
  const [showCityFilter, setShowCityFilter] = useState(false);

  return (
    <table id="user-activities">
      <thead>
        <tr>
          <th>
            <div>Date</div>
            <div className="range__date__input__container">
              <div className="date__inputs">
                <div className="range__input_start-date">
                  <label for="start-date">Start date</label>
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
                  <label for="end-date">End date</label>
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
                className="range__date__input-submit-btn"
                onClick={handleDateSubmit}
              >
                Apply
              </button>
            </div>
          </th>
          <th>Time</th>
          <th
            onClick={(e) => {
              if (!showDeviceCategoryFilter) {
                e.preventDefault();
                setShowDeviceCategoryFilter(!showDeviceCategoryFilter);
              }
            }}
          >
            <div className="table_column-filter-header">
              Device Category
              <img src={ChevronDownIcon} className="table_column_filter_icon" />
            </div>
            {showDeviceCategoryFilter && (
              <FilterDropDown
                options={DEVICE_CATEGORY_COLUMN_FILTER_OPTIONS}
                handleCheckboxSelection={handleDeviceCategorySelection}
                handleOutsideFilterClick={() =>
                  setShowDeviceCategoryFilter(false)
                }
                selectedArray={selectedDeviceCategory}
              />
            )}
          </th>
          <th
            onClick={(e) => {
              if (!showCountryFilter) {
                e.preventDefault();
                setShowCountryFilter(true);
              }
            }}
          >
            <div className="table_column-filter-header">
              Country
              <img src={ChevronDownIcon} className="table_column_filter_icon" />
            </div>
            {showCountryFilter && (
              <FilterDropDown
                options={uniqueCountries}
                handleCheckboxSelection={handleCountrySelection}
                handleOutsideFilterClick={() => setShowCountryFilter(false)}
                selectedArray={selectedCountries}
              />
            )}
          </th>
          <th
            onClick={(e) => {
              if (!showCityFilter) {
                e.preventDefault();
                setShowCityFilter(true);
              }
            }}
          >
            <div className="table_column-filter-header">
              City
              <img src={ChevronDownIcon} className="table_column_filter_icon" />
            </div>
            {showCityFilter && (
              <FilterDropDown
                options={uniqueCities}
                handleCheckboxSelection={handleCitySelection}
                handleOutsideFilterClick={() => setShowCityFilter(false)}
                selectedArray={selectedCities}
              />
            )}
          </th>
          <th>IP</th>
          <th>User Action</th>
          <th>ID</th>
          <th>Location</th>
          <th>Device</th>
          <th>User</th>

          <th>User-Action</th>
        </tr>
      </thead>
      <tbody>
        <>
          {loading ? (
            "Loading..."
          ) : (
            <>
              {userActivities.map((activity, idx) => (
                <TableRow
                  activity={activity}
                  key={idx}
                  handleRowClick={handleRowClick}
                  activityIdx={idx}
                />
              ))}
            </>
          )}
        </>
      </tbody>
    </table>
  );
}
