export const dateOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  weekday: undefined,
  hour: 'numeric',
  minute: 'numeric',
  second: undefined,
  hour12: true,
  timeZoneName: undefined,
};

export const isValidDateFormat = (date) => {
  // Use regular expression to check if date is valid as en-US format.
  const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  return regex.test(date);
};

export const isValidTimeFormat = (date) => {
  // Use regular expression to check if date is valid as en-US format.
  const regex = /^\d{1,2}:\d{1,2}$/;
  return regex.test(date);
};

export const isValidDateTimeFormat = (date) => {
  // Use regular expression to check if date is valid as en-US format.
  const regex = /^\d{1,2}\/\d{1,2}\/\d{4}[ ](?:|\d{1,2}:\d{1,2})$/;
  return regex.test(date);
};