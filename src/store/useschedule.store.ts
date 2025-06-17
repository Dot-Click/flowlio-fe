import { environment } from "@/configs/axios.config";
import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type Task = {
  id: number;
  taskName: string;
  location: string;
  costCode: string;
  subcontractor: string;
  manpower: { [weekIndex: number]: number[] };
  materialsByWeek: { [weekIndex: number]: string[] };
  equipmentByWeek: { [weekIndex: number]: string[] };
};

type ScheduleData = {
  currentWeekIndex: number;
  scheduleName: string;
  workDays: number[];
  totalWeeks: string;
  startDate: Date;
  endDate: Date;
  hours: string;
  tasks: Task[];
};

interface Store {
  clearSchedule: () => void;
  schedule: ScheduleData | null;
  setSchedule: (data: ScheduleData) => void;
  updateSchedule: (newSchedule: Partial<ScheduleData>) => void;
  addTask: () => void;
  removeTask: (taskId: number) => void;
  updateTask: (
    taskId: number,
    field: keyof Task,
    value: string | number[] | { [weekIndex: number]: string[] | number[] }
  ) => void;
  updateManpower: (taskId: number, dayIndex: number, value: number) => void;
  setCurrentWeekIndex: (index: number) => void;
}

const store: StateCreator<Store> = (set) => ({
  schedule: null,
  clearSchedule: () => set({ schedule: null }),
  setSchedule: (data) =>
    set({
      schedule: {
        ...data,
        tasks: data.tasks?.length
          ? data.tasks
          : [
              {
                id: 1,
                taskName: "",
                location: "",
                costCode: "",
                subcontractor: "",
                manpower: {},
                materialsByWeek: {},
                equipmentByWeek: {},
              },
            ],
        currentWeekIndex: data.currentWeekIndex ?? 0,
      },
    }),
  updateSchedule: (newSchedule) =>
    set((state) => ({
      schedule: { ...state.schedule, ...newSchedule } as ScheduleData,
    })),
  addTask: () =>
    set((state) => {
      if (!state.schedule) return state;
      const newTask: Task = {
        id: (state.schedule.tasks?.length || 0) + 1,
        taskName: "",
        location: "",
        costCode: "",
        subcontractor: "",
        manpower: {},
        materialsByWeek: {},
        equipmentByWeek: {},
      };
      return {
        schedule: {
          ...state.schedule,
          tasks: [...(state.schedule.tasks || []), newTask],
        },
      };
    }),
  removeTask: (taskId) =>
    set((state) => {
      if (!state.schedule) return state;
      return {
        schedule: {
          ...state.schedule,
          tasks: state.schedule.tasks.filter((task) => task.id !== taskId),
        },
      };
    }),
  updateTask: (taskId, field, value) =>
    set((state) => {
      if (!state.schedule) return state;
      return {
        schedule: {
          ...state.schedule,
          tasks: state.schedule.tasks.map((task) =>
            task.id === taskId ? { ...task, [field]: value } : task
          ),
        },
      };
    }),
  updateManpower: (taskId, dayIndex, value) =>
    set((state) => {
      if (!state.schedule) return state;
      const weekIndex = state.schedule.currentWeekIndex;
      return {
        schedule: {
          ...state.schedule,
          tasks: state.schedule.tasks.map((task) => {
            if (task.id === taskId) {
              const newManpower = { ...task.manpower };
              if (!newManpower[weekIndex]) {
                newManpower[weekIndex] = Array(7).fill(0);
              }
              newManpower[weekIndex][dayIndex] = value;
              return { ...task, manpower: newManpower };
            }
            return task;
          }),
        },
      };
    }),
  setCurrentWeekIndex: (index) =>
    set((state) => {
      if (!state.schedule) return state;
      return {
        schedule: {
          ...state.schedule,
          currentWeekIndex: index,
        },
      };
    }),
});

export const useScheduleStore = create(
  devtools(store, {
    enabled: environment === "development",
    store: "schedule store",
  })
);
