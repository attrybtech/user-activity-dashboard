import { useEffect, useState } from "react";
import Table from "./components/Table";
import "./components/index.css";
import Modal from "./components/Modal";
import ClickAwayListener from "react-click-away-listener";
import AppHeader from "./components/AppHeader";

const URL = `https://ua.attryb.com/user-activity`;
const options = ["dsc", "asc", "mobile", "desktop"];

function App() {
  const [userActivity, setUserActity] = useState([]);
  const [ activityData, setActivityData ] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [modalHeading, setModalHeading] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    fetchUserActivities();
  }, []);

  const handleRowClick = (idx, property) => {
    const activity = userActivity[idx][property];
    setModalContent(activity);
    setModalHeading(property);
    setShowModal(true);
  };

  const fetchUserActivities = async () => {
    try {
      const response = await fetch(URL);
      const { data } = await response.json();
      const { userActivity } = data[0];
      setUserActity(userActivity);
      setActivityData(userActivity)
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = (e) => {

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 250);
      e.preventDefault();
      switch (selectedOption) {
        case options[0]:
          setUserActity(userActivity.reverse());
          break;
        case options[1]:
          setUserActity(userActivity.reverse());
          break;
        case options[2]:
          const mobileArray = activityData.filter((element, idx) => {
            if (element?.device?.deviceCategory === "mobile") return element;
          });
          setUserActity(mobileArray);
          break;
        case options[3]:
          const desktopArray = activityData.filter((element, idx) => {
            if (element?.device?.deviceCategory === "Desktop") return element;
          });
          setUserActity(desktopArray);
          break;
        default:
          setUserActity(activityData)
          break;
      }
  };

  const handleOptionClick = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="App">
      <AppHeader
        handleFilter={handleFilter}
        options={options}
        handleOptionClick={handleOptionClick}
      />
      <Table
        userActivity={userActivity}
        handleRowClick={handleRowClick}
        loading={loading}
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
