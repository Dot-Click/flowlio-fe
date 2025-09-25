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
      console.log("🚀🚀🚀 UPDATE CALENDAR EVENT MUTATION CALLED 🚀🚀🚀");
      console.log("Event ID:", id);
      console.log("Update data:", data);
      console.log("API URL:", `/calendar-events/${id}`);
      console.log("Axios base URL:", axios.defaults.baseURL);
      console.log(
        "Full URL will be:",
        `${axios.defaults.baseURL}/calendar-events/${id}`
      );

      try {
        console.log("Making PUT request to update calendar event...");
        const response = await axios.put(`/calendar-events/${id}`, data);
        console.log(
          "✅ PUT request successful:",
          response.status,
          response.data
        );
        return response.data;
      } catch (error) {
        console.error("❌ PUT request failed:", error);
        console.error("Error details:", {
          message: error instanceof Error ? error.message : "Unknown error",
          status: (error as any)?.response?.status,
          statusText: (error as any)?.response?.statusText,
          data: (error as any)?.response?.data,
          url: (error as any)?.config?.url,
          method: (error as any)?.config?.method,
        });
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("🎉 UPDATE CALENDAR EVENT SUCCESS:", data);
      console.log("Invalidating and refetching calendar events...");
      // Invalidate and refetch calendar events
      queryClient.invalidateQueries({ queryKey: ["calendar-events"] });

      toast.success("Calendar event updated successfully!");
    },
    onError: (error: any) => {
      console.error("💥 UPDATE CALENDAR EVENT ERROR:", error);
      console.error("Error response:", error.response);
      console.error("Error config:", error.config);
      const errorMessage =
        error.response?.data?.message || "Failed to update calendar event";
      toast.error(errorMessage);
    },
  });
};
