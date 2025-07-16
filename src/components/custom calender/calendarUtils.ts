// Shared types and utilities for custom calendar components

export type CustomEvent = {
  title: string;
  date: string; // ISO date string
  day: number;
  startHour: number;
  endHour: number;
  weekStart: string;
  calendarType: "work" | "education" | "personal";
  platform?: "google_meet" | "whatsapp" | "outlook" | "none";
  meetLink?: string;
};

export const initialEvents: CustomEvent[] = [];

export function formatHour(hour: number) {
  const h = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour < 12 ? "AM" : "PM";
  return `${h} ${ampm}`;
}

export const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function getStartOfWeek(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

export function getWeekDates(start: Date) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export const platformColors = {
  google_meet: { bg: "#E6F4D6", text: "#92AB74" },
  whatsapp: { bg: "#E8EBFF", text: "#6D7EF3" },
  outlook: { bg: "#FFF4EB", text: "#F39F5A" },
  none: { bg: "#f0f0f0", text: "#323334" },
};
