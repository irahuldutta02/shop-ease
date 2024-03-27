export const formateDate = (date) => {
  //  formats the date in like dd/mm/yyyy
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${day}/${month}/${year}`;
};

export const formateDateTime = (date) => {
  //  formats the date in like dd/mm/yyyy hh:mm am/pm
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
};
