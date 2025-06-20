export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function toMonthAndYear(date: Date): string {
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${month.slice(0, 3)} ${year}`;
}

export const dateToLocalDateType = (date: Date) => {
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const strDay = day < 10 ? `0${day}` : `${day}`;
  const strMonth = month < 10 ? `0${month + 1}` : `${month + 1}`;

  return `${year}-${strMonth}-${strDay}`;
};

export const ISOToDate = (isoString: string) => {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(isoString));
}

export const ISOToTime = (isoString: string) => {
  return new Intl.DateTimeFormat('de-DE', {
    timeStyle: 'short',
    timeZone: 'Europe/Berlin'
  })?.format(new Date(isoString));
}

export const normalizeDate = (dateString: string) => {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0); // Strip time
  return date;
};