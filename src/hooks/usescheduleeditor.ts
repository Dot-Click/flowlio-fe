import { addDays, differenceInWeeks, addWeeks, subDays } from "date-fns";
import { useScheduleStore } from "@/store/useschedule.store";
import { type UseFormReturn } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

type ValidWorkDay = {
  isWorkDay: boolean;
  dayIndex: number;
  date: Date;
};

export const useScheduleEditor = (form?: UseFormReturn<any>) => {
  const {
    schedule,
    addTask,
    removeTask,
    updateTask,
    updateManpower,
    setCurrentWeekIndex,
  } = useScheduleStore(useShallow((state) => state));

  // Week calculator functionality
  useEffect(() => {
    if (!form) return;

    const subscription = form.watch((value, { name }) => {
      const { startDate, totalWeeks } = value;

      if (
        (name === "totalWeeks" || name === "startDate") &&
        startDate &&
        totalWeeks
      ) {
        form.setValue(
          "endDate",
          addWeeks(subDays(startDate, 1), Number(totalWeeks))
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  if (!schedule) return null;

  const startDateFromSchedule = new Date(schedule.startDate);
  const endDateFromSchedule = new Date(schedule.endDate);
  const currentWeekIndex = schedule.currentWeekIndex;
  const hoursFromSchedule = Number(schedule.hours);
  const workDaysFromSchedule = schedule.workDays;

  // Calculate the number of weeks between start and end date
  const totalWeeks =
    differenceInWeeks(endDateFromSchedule, startDateFromSchedule) + 1;

  // Base start date should be the actual start date, not aligned to week start
  const currentWeekStart = addDays(startDateFromSchedule, currentWeekIndex * 7);

  // Filter days to only include workdays
  const validWorkDays: ValidWorkDay[] = Array.from({ length: 7 })
    .map((_, i) => {
      const date = addDays(currentWeekStart, i);
      const dayOfWeek = date.getDay();
      // Convert to 1-7 format (Monday = 1, Sunday = 7)
      const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek;
      return {
        dayIndex: i,
        date,
        isWorkDay: workDaysFromSchedule.includes(adjustedDay),
      };
    })
    .filter(
      ({ date, isWorkDay }) =>
        isWorkDay &&
        date >= startDateFromSchedule &&
        date <= endDateFromSchedule
    );

  const calculateTotalHours = (taskId: number) => {
    const task = schedule.tasks.find((t) => t.id === taskId);
    if (!task) return 0;

    const weekManpower =
      task.manpower[currentWeekIndex] || Array(validWorkDays.length).fill(0);
    const totalManpower = weekManpower.reduce((sum, mp) => sum + mp, 0);
    return totalManpower * hoursFromSchedule;
  };

  // Navigation state
  const isPrevDisabled = currentWeekIndex <= 0;
  const isNextDisabled = currentWeekIndex >= totalWeeks - 1;

  return {
    // Schedule data
    schedule,
    totalWeeks,
    validWorkDays,
    currentWeekIndex,

    // Task operations
    addTask,
    removeTask,
    updateTask,
    updateManpower,

    // Navigation
    setCurrentWeekIndex,
    isPrevDisabled,
    isNextDisabled,

    // Calculations
    calculateTotalHours,
  };
};
