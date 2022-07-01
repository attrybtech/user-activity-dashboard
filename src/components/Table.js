import React, { useState } from "react";
import TableRow from "./TableRow";
import FilterDropDown from "./ColumnFilter/FilterDropDown";
import { DEVICE_CATEGORY_COLUMN_FILTER_OPTIONS } from "../constants";

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
  selectedDeviceCategory
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
            <div>Device Category</div>
            {showDeviceCategoryFilter && (
                <FilterDropDown
                  options={DEVICE_CATEGORY_COLUMN_FILTER_OPTIONS}
                  handleCheckboxSelection={handleDeviceCategorySelection}
                  handleOutsideFilterClick={()=>setShowDeviceCategoryFilter(false)}
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
            <div>Country</div>
            {showCountryFilter && (
              <FilterDropDown
                options={uniqueCountries}
                handleCheckboxSelection={handleCountrySelection}
                handleOutsideFilterClick={()=>setShowCountryFilter(false)}
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
            <div>City</div>
            {showCityFilter && (
              <FilterDropDown
                options={uniqueCities}
                handleCheckboxSelection={handleCitySelection}
                handleOutsideFilterClick={()=>setShowCityFilter(false)}
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
