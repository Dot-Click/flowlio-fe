import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/configs/axios.config";
import { toast } from "sonner";

export interface UpdateCalendarEventRequest {
  title?: string;
  description?: string;
  date?: string; // ISO date string
  startHour?: number;
  endHour?: number;
  calendarType?: "work" | "education" | "personal";
  platform?: "google_meet" | "whatsapp" | "outlook" | "none";
  meetLink?: string;
  whatsappNumber?: string;
  outlookEvent?: string;
}

export interface UpdateCalendarEventResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    title: string;
    description?: string;
    date: string;
    startHour: number;
    endHour: number;
    calendarType: "work" | "education" | "personal";
    platform: "google_meet" | "whatsapp" | "outlook" | "none";
    meetLink?: string;
    whatsappNumber?: string;
    outlookEvent?: string;
    organizationId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const useUpdateCalendarEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateCalendarEventRequest;
    }): Promise<UpdateCalendarEventResponse> => {
      const response = await axios.put(`/calendar-events/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Invalidate and refetch calendar events!", data);
      // Invalidate and refetch calendar events
      queryClient.invalidateQueries({ queryKey: ["calendar-events"] });

      toast.success("Calendar event updated successfully!");
    },
    onError: (error: any) => {
      console.error("Error updating calendar event:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update calendar event";
      toast.error(errorMessage);
    },
  });
};
