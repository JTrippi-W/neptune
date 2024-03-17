import { formatDistanceToNow } from 'date-fns';

export function safeFormatDistanceToNow(timestamp) {
  if (timestamp == null) return 'Unkown time';
  const date = new Date(timestamp * 1000);
  if (isNaN(date.getTime())) return 'Invalid date';
  return formatDistanceToNow(date);
}
