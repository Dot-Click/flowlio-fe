/**
 * Formats decimal hours into a readable format like "1h" or "45h"
 * @param totalHours - Total hours as a decimal number (e.g., 1.5, 0.75)
 * @returns Formatted string like "1h" or "45h" (rounded to nearest hour)
 */
export const formatHours = (totalHours: number): string => {
  if (totalHours === 0) return "0h";
  
  // Round to nearest hour
  const roundedHours = Math.round(totalHours);
  return `${roundedHours}h`;
};
