import { useEffect, useState } from "react";
import Table from "./components/Table";
import "./components/index.css";
import Modal from "./components/Modal";
import ClickAwayListener from "react-click-away-listener";
import AppHeader from "./components/AppHeader";
import {
  getActivities,
  getUniqueCities,
  getUniqueCountries,
} from "./components/services";

function App() {
  const [userActivities, setUserActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [modalHeading, setModalHeading] = useState("");

  const [pageSize, setPageSize] = useState(0);
  const [page, setPage] = useState(1);

  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
    getInitialDashBoardData();
  }, []);

  useEffect(() => {
    updateCitiesByCountry();
  }, [selectedCountries]);

  useEffect(() => {
    if (selectedCountries.length || selectedCities.length)
      updateUserActivities();
  }, [selectedCountries, selectedCities]);

  const updateCitiesByCountry = async () => {
    if (selectedCountries.length) {
      const cities = await getUniqueCitiesByCountry();
      setUniqueCities(cities);
    }
  };

  const updateUserActivities = async () => {
    const activities = await getUserActivities();
    setUserActivities(activities);
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
      selectedCountries
    );
    return activities;
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
      />
      {showModal && (
        <ClickAwayListener onClickAway={() => setShowModal(false)}>
          <Modal activity={modalContent} modalHeading={modalHeading} />
        </ClickAwayListener>
      )}
    </div>
  );
}

export default App;
