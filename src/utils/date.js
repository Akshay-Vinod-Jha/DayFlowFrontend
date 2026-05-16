export const formatIsoDate = (date) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
};

export const getIsoMonth = (date) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const getMonthName = (monthKey) => {
  const [year, month] = monthKey.split('-').map(Number);
  const d = new Date(Date.UTC(year, month - 1, 1));
  return d.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

export const shiftMonth = (monthKey, delta) => {
  const [year, month] = monthKey.split('-').map(Number);
  const d = new Date(Date.UTC(year, month - 1 + delta, 1));
  return getIsoMonth(d);
};

export const getMonthDaysGrid = (monthKey) => {
  const [year, month] = monthKey.split('-').map(Number);
  const firstDay = new Date(Date.UTC(year, month - 1, 1));
  const lastDay = new Date(Date.UTC(year, month, 0));

  const leading = firstDay.getUTCDay();
  const days = [];

  for (let i = 0; i < leading; i += 1) {
    days.push(null);
  }

  for (let day = 1; day <= lastDay.getUTCDate(); day += 1) {
    const date = new Date(Date.UTC(year, month - 1, day));
    days.push(formatIsoDate(date));
  }

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return days;
};
