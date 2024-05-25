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

/**
 * Stringify ISO date to show the most the best format
 * in relation to the current date
 *
 *
 * @example
 * ```
 * stringifyISODate('2023-11-14T00:00:00.000Z') // 20 seconds ago
 * stringifyISODate('2023-11-14T00:00:00.000Z') // 1 hour ago
 * stringifyISODate('2023-11-14T00:00:00.000Z') // 2 days ago
 * stringifyISODate('2023-11-14T00:00:00.000Z') // 2 months ago
 * ```
 * @param isoDate
 */
export const stringifyISODate = (isoDateTime: string) => {
  const date = DateTime.fromISO(isoDateTime);
  const now = DateTime.now();

  const diff = now.diff(date, [
    'months',
    'days',
    'hours',
    'minutes',
    'seconds',
  ]);

  if (diff.months > 0) {
    const months = Math.floor(diff.months);

    return `${months} month${months > 1 ? 's' : ''} ago`;
  }

  if (diff.days > 0) {
    const days = Math.floor(diff.days);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  if (diff.hours > 0) {
    const hours = Math.floor(diff.hours);

    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  if (diff.minutes > 0) {
    const minutes = Math.floor(diff.minutes);

    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }

  const seconds = Math.floor(diff.seconds);

  if (seconds <= 30) return 'Just now';

  return `${seconds} seconds ago`;
};
