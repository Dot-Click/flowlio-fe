import { environment } from "@/configs/axios.config";
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export type TaskStatus = "completed" | "ongoing" | "pending";

export type Task = {
  description: string;
  status: TaskStatus;
  startDate: string;
  location: string;
  comments: number;
  endDate: string;
  title: string;
  users: string;
  file?: string;
  id: string;
};

type Store = {
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  tasks: Task[];
};

export const defaultValues: Task[] = [
  {
    location: "ABC Street, New York",
    startDate: "2025-05-10",
    description: "Task 1",
    endDate: "2025-05-12",
    status: "ongoing",
    comments: 10,
    users: "12",
    id: "11",
    title: "taskName",
  },
  {
    location: "ABC Street, New York",
    startDate: "2025-05-12",
    description: "Task 2",
    endDate: "2025-05-14",
    status: "pending",
    comments: 10,
    users: "5",
    id: "12",
    title: "taskName",
  },
  {
    id: "13",
    title: "taskName",
    description: "Task 3",
    location: "ABC Street, New York",
    status: "completed",
    startDate: "2025-05-11",
    endDate: "2025-05-14",
    comments: 10,
    users: "8",
  },
  {
    id: "14",
    title: "taskName",
    description: "Task 4",
    location: "ABC Street, New York",
    status: "completed",
    startDate: "2025-05-12",
    endDate: "2025-05-15",
    comments: 10,
    users: "14",
  },
  {
    id: "15",
    title: "taskName",
    description: "Task 5",
    location: "ABC Street, New York",
    status: "ongoing",
    startDate: "2025-05-17",
    endDate: "2025-05-19",
    comments: 10,
    users: "3",
  },
  {
    id: "16",
    title: "taskName",
    description: "Task 6",
    location: "ABC Street, New York",
    status: "pending",
    startDate: "2025-05-18",
    endDate: "2025-05-20",
    comments: 10,
    users: "4",
  },
];

const store: StateCreator<Store> = (set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
});

export const useTaskStore = create(
  devtools(store, {
    enabled: environment === "development",
    store: "Sidebar Store",
  })
);
