export function formatDateFull(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JS
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Format the date to DD/MM/YYYY HH:MM
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function formatDateShort(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JS
  const year = date.getFullYear();

  // Format the date to DD/MM/YYYY
  return `${day}.${month}.${year}`;
}
