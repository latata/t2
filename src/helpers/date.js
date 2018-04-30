export default function formatDate(date) {
  if (date) {
    return date.substring(0, 10);
  }
  return null;
}
