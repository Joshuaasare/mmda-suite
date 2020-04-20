import format from 'date-fns/format';

export function getMidnightDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const currDay = date.getDate();
  const currDate = new Date(year, month, currDay);
  return currDate;
}


export function consoleIndividualRealmObject(results: Object) {
  for (let i = 0; i < results.length; i += 1) {
    console.log({ [i]: results[i] });
  }
}

export function getHumanReadableDate(date: number) {
  return format(date, ['ddd, Do MMM YYYY']);
}

export const getGridColumn = deviceWidth => Math.floor(deviceWidth / 180);
