export const formatDateInMilliSeconds = (date) => {
  const formatedDate = new Date(date).getTime();
  if (formatedDate) return formatedDate;
  return "";
};
