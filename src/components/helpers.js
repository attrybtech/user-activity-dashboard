export const formatDateInMilliSeconds = (date) => {
  const formatedDate = new Date(date).getTime();
  if (formatedDate) return formatedDate;
  return "";
};


export const downloadFile = ({ data, fileName, fileType }) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([data], { type: fileType })
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement('a')
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  a.dispatchEvent(clickEvt)
  a.remove()
}


export const exportToJson = (e, data) => {
  e.preventDefault();
  downloadFile({
    data: JSON.stringify(data),
    fileName: "useractivities.json",
    fileType: "text/json",
  });
};