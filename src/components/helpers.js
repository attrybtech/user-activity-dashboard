import { END_DATE, START_DATE } from "../constants";

export const formatDateInMilliSeconds = (date, dateFormat) => {
  const formatedDate = new Date(date);
  var updatedDate = "";
  if (dateFormat === START_DATE) {
    updatedDate = formatedDate.setHours(0, 0, 0);
  } else {
    updatedDate = formatedDate.setHours(23, 59, 59);
  }
  if (isNaN(updatedDate) || !updatedDate) return "";
  return updatedDate;
};

export const downloadFile = ({ data, fileName, fileType }) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([data], { type: fileType });
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

export const exportToJson = (e, data) => {
  e.preventDefault();
  downloadFile({
    data: JSON.stringify(data),
    fileName: "useractivities.json",
    fileType: "text/json",
  });
};
