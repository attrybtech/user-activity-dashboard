import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import FilterDropDown from "./ColumnFilter/FilterDropDown";
import { DEVICE_CATEGORY_COLUMN_FILTER_OPTIONS } from "../constants";
import ChevronDownIcon from "../assets/icons/chevron-down.svg";
import DatePickerModal from "./DatePicker";

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
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);

  return (
    <table id="user-activities">
      <thead>
        <tr className="user-activities_table">
          <th
            onClick={(e) => {
              if (!showDatePickerModal) {
                e.preventDefault();
                setShowDatePickerModal(!showDatePickerModal);
              }
            }}
          >
            <div className="table_column-filter-header date_picker-range">
              Date
              <img
                src={ChevronDownIcon}
                className="table_column_filter_icon"
                // style={{ transform: "rotate(270deg)" }}
              />
            </div>
            {showDatePickerModal && (
              <DatePickerModal
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                handleDateSubmit={() => {
                  handleDateSubmit();
                  setShowDatePickerModal(false);
                }}
                handleOutsideDatePickerClick={() => {
                  console.log("asdfa");
                  setShowDatePickerModal(false);
                }}
              />
            )}
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
      <>
        <tbody>
          {userActivities.map((activity, idx) => (
            <TableRow
              activity={activity}
              key={idx}
              handleRowClick={handleRowClick}
              activityIdx={idx}
            />
          ))}
        </tbody>
      </>
    </table>
  );
}
