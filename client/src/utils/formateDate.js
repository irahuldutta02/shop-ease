export const formateDate = (date) => {
  //  formats the date in like dd/mm/yyyy
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${day}/${month}/${year}`;
};
