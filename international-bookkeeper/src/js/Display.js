const getUTCyyyymmddDate = (date) => {
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate
}

const getUTCmmddyyyyDate = (date) => {
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
}

const getmmmddDate = (date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${month}/${day}`;

  return formattedDate;
}

// Takes a JS Date object, and returns an object of format { seconds: 1677308100, nanoseconds: 915000000}
const convertDateToTimestamp = (date) => {
  return {
    seconds: Math.floor(date.getTime() / 1000),
    nanoseconds: 0,
  };
};

// Given a list of objects with the form { id: 1, [key]: value }, a key name, and an id, returns the first value that matches the id
const getValueFromList = (list, id, key) => {
  const item = list.find(item => item.id === id);
  return item[key] ?? "";
}

// Given a list of objects with the form { id: 1, [key]: value }, a key name, returns an object of the form { 1: value }
const mapListToKey = (list, key) => {
  let result = {};
  list.forEach(item => {
    result[item.id] = item[key];
  });
  return result
};

const CONSTANTS = {
  currencies: [
    "USD",
    "JPY"
  ],
}

export {
  getUTCyyyymmddDate,
  getUTCmmddyyyyDate,
  getmmmddDate,
  convertDateToTimestamp,
  getValueFromList,
  mapListToKey,
  CONSTANTS
}