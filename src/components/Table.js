import React, { useState } from "react";
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
}) {
  const [showDeviceCategoryFilter, setShowDeviceCategoryFilter] =
    useState(false);
  const [showCountryFilter, setShowCountryFilter] = useState(false);
  const [showCityFilter, setShowCityFilter] = useState(false);

  return (
    <table id="user-activities">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th
            onClick={(e) => {
              if (!showDeviceCategoryFilter) {
                e.preventDefault();
                setShowDeviceCategoryFilter(!showDeviceCategoryFilter);
              }
            }}
          >
            <div className="table_column-filter-header" >
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
            <div className="table_column-filter-header" >
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
            <div className="table_column-filter-header" >
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
          <th>Device</th>
          <th>User</th>
          <th>Location</th>
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
