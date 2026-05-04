export const formatDueDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const parseDueDate = (dueDate?: string | null) => {
  if (!dueDate) return null;

  const date = new Date(dueDate);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const isSameDueDate = (nextDate: Date | null, originDueDate?: string | null) => {
  const originDate = parseDueDate(originDueDate);

  if (!nextDate && !originDate) return true;
  if (!nextDate || !originDate) return false;

  return nextDate.getTime() === originDate.getTime();
};