import { create } from "zustand";
import { CustomEvent } from "@/components/custom calender/calendarUtils";

interface CalendarEventsState {
  events: CustomEvent[];
  setEvents: (events: CustomEvent[]) => void;
  addEvent: (event: CustomEvent) => void;
  updateEvent: (event: CustomEvent) => void;
  deleteEvent: (event: CustomEvent) => void;
}

export const useCalendarEventsStore = create<CalendarEventsState>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((ev) =>
        ev.date === updatedEvent.date && ev.startHour === updatedEvent.startHour
          ? updatedEvent
          : ev
      ),
    })),
  deleteEvent: (eventToDelete) =>
    set((state) => ({
      events: state.events.filter(
        (ev) =>
          !(
            ev.date === eventToDelete.date &&
            ev.startHour === eventToDelete.startHour
          )
      ),
    })),
}));
