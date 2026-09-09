/**
 * One-time (standalone) classes disappear automatically once their date and
 * end time have passed. Recurring classes are never auto-hidden.
 */
export const isExpiredOneTimeClass = (cls: {
  is_one_time?: boolean | null;
  start_date?: string | null;
  end_time?: string | null;
}): boolean => {
  if (!cls.is_one_time || !cls.start_date) return false;
  const endTime = cls.end_time && cls.end_time !== "00:00:00" ? cls.end_time : "23:59:59";
  const endsAt = new Date(`${cls.start_date}T${endTime}`);
  return endsAt.getTime() < Date.now();
};
