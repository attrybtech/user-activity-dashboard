import { useEffect, useState } from "react";
import Table from "./components/Table";
import "./components/index.css";
import Modal from "./components/Modal";
import ClickAwayListener from "react-click-away-listener";
import {
  getActivities,
  getCountriesByCities,
  getDownloadData,
  getUniqueCities,
  getUniqueCountries,
} from "./components/services";
import Pagination from "./components/Pagination";
import { DEFAULT_PAGE_SIZE } from "./constants";
import "./index.css";
import { exportToJson } from "./components/helpers";

const pageArray = ["<< First", "< Prev", "Next >", "Last >>"];

function App() {
  const [userActivities, setUserActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [modalHeading, setModalHeading] = useState("");

  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageLength, setPageLength] = useState(0);

  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedDeviceCategory, setSelectedDeviceCategory] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    getInitialDashBoardData();
  }, []);

  useEffect(() => {
    updateCitiesByCountry();
  }, [selectedCountries]);

  useEffect(() => {
    if (
      selectedCountries.length ||
      selectedCities.length ||
      selectedDeviceCategory.length ||
      page
    ) {
      updateUserActivities();
    }
  }, [selectedCountries, selectedCities, selectedDeviceCategory, page]);

  useEffect(() => {
    setPageLength(Math.ceil(totalRecords / pageSize));
  }, [totalRecords]);

  useEffect(() => {
    if (!selectedCountries.length) getUniqueCitiesByCountry();
  }, [selectedCountries]);

  useEffect(() => {
    if (selectedCities.length && !selectedCountries.length)
      updateContriesBySelectedCities();
  }, [selectedCities]);

  const updateCitiesByCountry = async () => {
    const cities = await getUniqueCitiesByCountry();
    setUniqueCities(cities);
  };

  const updateUserActivities = async () => {
    const activities = await getUserActivities();
    setUserActivities(activities);
  };

  const updateContriesBySelectedCities = async () => {
    const countries = await getCountriesByCities(selectedCities);
    setSelectedCountries(countries);
  };

  const getInitialDashBoardData = async () => {
    const activities = await getUserActivities();
    setUserActivities(activities);

    const countries = await getUniqueCountries();
    const cities = await getUniqueCitiesByCountry();
    setUniqueCountries(countries);
    setUniqueCities(cities);
    setLoading(false);
  };

  const getUniqueCitiesByCountry = async () => {
    return await getUniqueCities(selectedCountries);
  };

  const getUserActivities = async () => {
    const activities = await getActivities(
      pageSize,
      page,
      selectedCities,
      selectedCountries,
      selectedDeviceCategory,
      startDate,
      endDate
    );
    setTotalRecords(activities.totalRecords);
    return activities?.data;
  };

  const handleRowClick = (idx, property) => {
    const activity = userActivities[idx][property];
    setModalContent(activity);
    setModalHeading(property);
    setShowModal(true);
  };

  const handleCountrySelection = (value, checked) => {
    if (checked) {
      const tempCountries = [...selectedCountries, value];
      setSelectedCountries([...new Set(tempCountries)]);
    } else {
      setSelectedCountries([
        ...selectedCountries.filter((option) => option !== value),
      ]);
    }
  };

  const handleCitySelection = (value, checked) => {
    if (checked) {
      const tempCities = [...selectedCities, value];
      setSelectedCities([...new Set(tempCities)]);
    } else {
      setSelectedCities([
        ...selectedCities.filter((option) => option !== value),
      ]);
    }
  };

  const handleDeviceCategorySelection = (value, checked) => {
    if (checked) {
      const tempDevices = [...selectedDeviceCategory, value];
      setSelectedDeviceCategory([...new Set(tempDevices)]);
    } else {
      setSelectedDeviceCategory([
        ...selectedDeviceCategory.filter((option) => option !== value),
      ]);
    }
  };

  const handlePageChange = (pageStr) => {
    switch (pageStr) {
      case pageArray[0]:
        setPage(1);
        break;
      case pageArray[1]:
        setPage(page - 1);
        break;
      case pageArray[2]:
        setPage(page + 1);
        break;
      case pageArray[3]:
        setPage(pageLength);
        break;

      default:
        break;
    }
  };

  const isPaginationButtonDisable = (idx) => {
    if (
      (idx === 0 && page === 1) ||
      (idx === 1 && page === 1) ||
      (idx === 2 && pageLength === page) ||
      (idx === 3 && pageLength === page)
    )
      return true;
    return false;
  };

  const handleDateSubmit = () => {
    updateUserActivities();
  };

  const handleDownloadClick = async (e) => {
    const downloadData = await getDownloadData(
      selectedCities,
      selectedCountries,
      selectedDeviceCategory,
      startDate,
      endDate
    );

    exportToJson(e, downloadData?.data);
  };

  return (
    <div className="App">
      <Table
        userActivities={userActivities}
        handleRowClick={handleRowClick}
        loading={loading}
        uniqueCountries={uniqueCountries}
        uniqueCities={uniqueCities}
        selectedCities={selectedCities}
        selectedCountries={selectedCountries}
        handleCitySelection={handleCitySelection}
        handleCountrySelection={handleCountrySelection}
        handleDeviceCategorySelection={handleDeviceCategorySelection}
        selectedDeviceCategory={selectedDeviceCategory}
        handleDateSubmit={handleDateSubmit}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        
      />
      {showModal && (
        <ClickAwayListener onClickAway={() => setShowModal(false)}>
          <Modal activity={modalContent} modalHeading={modalHeading} />
        </ClickAwayListener>
      )}
      <Pagination
        page={page}
        totalRecords={totalRecords}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
        pageArray={pageArray}
        pageLength={pageLength}
        isPaginationButtonDisable={isPaginationButtonDisable}
        handleDownloadClick={handleDownloadClick}
      />
    </div>
  );
}

export default App;
