import { DateTime } from 'luxon';

/**
 * Format ISO DateTime for data tables
 * @param isoDate ISO Date
 * @returns Formatted date (e.g. Nov 14, 2023)
 */
export const formatISOForTable = (isoDate: string) => {
  const date = DateTime.fromISO(isoDate).toFormat('MMM dd, yyyy');

  return date;
};
