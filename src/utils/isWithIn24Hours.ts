const isWithIn24Hours = (date: Date) => {
  const lastDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  return date > lastDate;
};
export default isWithIn24Hours;
