export function addDays(date, days) {
  // 1000 milliseconds in a second, 60 seconds in a minute, 60 minutes
  // in and hour, 24 hours in a day.
  const lengthOfDay = 1000 * 60 * 60 * 24;

  // get numeric value of date, then create new Date object after
  // performing addition.
  const dateNumber = date.getTime();
  const newDate = new Date();
  newDate.setTime(dateNumber + days * lengthOfDay);
  return newDate;
}
