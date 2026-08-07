export function formatTime(time) {
  if (!time) return "";

  const [hour, minute] = time.split(":");

  const h = Number(hour);

  const ampm = h >= 12 ? "PM" : "AM";

  const displayHour = ((h + 11) % 12) + 1;

  return `${displayHour}:${minute} ${ampm}`;
}

export function getDuration(start, end) {
  if (!start || !end) return 0;

  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;

  let total = endMin - startMin;

  if (total < 0) {
    total += 24 * 60;
  }

  return total;
}

export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h === 0) return `${m}m`;

  return `${h}h ${m}m`;
}


export function parseHistoryDate(dateString) {

  if (!dateString) return null;

  // ISO format (2026-07-21)
  if (dateString.includes("-")) {
    return new Date(dateString);
  }

  // DD/MM/YYYY format
  const parts = dateString.split("/");

  if (parts.length === 3) {

    const day = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const year = Number(parts[2]);

    return new Date(year, month, day);
  }

  return null;
}