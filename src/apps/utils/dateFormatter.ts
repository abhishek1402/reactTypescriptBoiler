const dateFormatter = (date: string | Date) => {
  let dateObj;
  let day;
  if (typeof date === "object") {
    dateObj = date;
    day = dateObj.getDate();
  } else {
    dateObj = new Date(date);
    day = dateObj.getDate();
  }
  let month = dateObj.getUTCMonth() + 1;
  let year = dateObj.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

export default dateFormatter;
