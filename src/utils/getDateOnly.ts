const getDateOnly = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const _date = date
    .getDate()
    .toString()
    .padStart(2, "0");

  return `${year}/${month}/${_date}`;
};
export default getDateOnly;
