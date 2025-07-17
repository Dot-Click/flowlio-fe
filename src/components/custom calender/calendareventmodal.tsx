import React, { useEffect } from "react";
import { CustomEvent } from "./calendarUtils";
import { GeneralModalReturnTypeProps } from "../common/generalmodal";
import { Input } from "../ui/input";
import { Flex } from "../ui/flex";
import { ArrowRight, Clock } from "lucide-react";
import { Center } from "../ui/center";
import GoogleMeetIcon from "../../../public/dashboard/google-meet.svg";
import WhatsappIcon from "../../../public/dashboard/whatsapp-icon.svg";
import OutlookIcon from "../../../public/dashboard/google-drive.svg";
import { Box } from "../ui/box";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import WhatsAppCheckBoxIcon from "../../../public/dashboard/whatsappcheckbox.svg";
import EducationCheckBoxIcon from "../../../public/dashboard/educationcheckbox.svg";
import PersolCheckBoxIcon from "../../../public/dashboard/personalicon.svg";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { getStartOfWeek } from "./calendarUtils";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "../customeIcons";

interface EventModalProps {
  modalProps: GeneralModalReturnTypeProps;
  onSave: (e: CustomEvent) => void;
  onClose: () => void;
  eventToEdit?: CustomEvent | null;
}

interface EventFormData {
  title: string;
  date: Date;
  startHour: number;
  endHour: number;
  calendarType: "work" | "education" | "personal";
  platform: "google_meet" | "whatsapp" | "outlook" | "none";
  meetLink: string;
}

const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23 (24 hours)
function formatHour(hour: number) {
  const h = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour < 12 ? "AM" : "PM";
  return `${h}:00 ${ampm}`;
}

function getDuration(startHour: number, endHour: number) {
  const duration = endHour - startHour;
  if (duration <= 0) return "";
  return `${duration} hour${duration > 1 ? "s" : ""}`;
}

export const EventModal: React.FC<EventModalProps> = ({
  onSave,
  onClose,
  eventToEdit,
  modalProps,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    defaultValues: {
      title: eventToEdit?.title || "",
      date: eventToEdit ? new Date(eventToEdit.date) : new Date(),
      startHour: eventToEdit?.startHour ?? 8,
      endHour: eventToEdit?.endHour ?? 9,
      calendarType: eventToEdit?.calendarType || "work",
      platform: eventToEdit?.platform || "none",
      meetLink: eventToEdit?.meetLink || "",
    },
  });

  const title = watch("title");
  const date = watch("date");
  const startHour = watch("startHour");
  const endHour = watch("endHour");
  const calendarType = watch("calendarType");
  const platform = watch("platform");
  // const meetLink = watch("meetLink");
  const isValid = startHour < endHour && !!date && !!title;

  useEffect(() => {
    if (eventToEdit) {
      reset({
        title: eventToEdit.title,
        date: new Date(eventToEdit.date),
        startHour: eventToEdit.startHour,
        endHour: eventToEdit.endHour,
        calendarType: eventToEdit.calendarType,
        platform: eventToEdit.platform || "none",
        meetLink: eventToEdit.meetLink || "",
      });
    } else {
      reset({
        title: "",
        date: new Date(),
        startHour: 8,
        endHour: 9,
        calendarType: "work",
        platform: "none",
        meetLink: "",
      });
    }
    // eslint-disable-next-line
  }, [eventToEdit, reset]);

  if (!modalProps.open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#4D5B6259]"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div
        className={
          modalProps.contentProps?.className +
          " bg-white rounded-xl p-0 min-w-[340px] min-h-[100px] z-[1001] relative box-shadow-[0_4px_32px_rgba(0,0,0,0.12)]"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <form
          className="bg-white p-6 rounded-xl min-w-[340px] shadow-lg max-h-[620px] overflow-y-auto"
          onSubmit={handleSubmit((data) => {
            if (!(data.startHour < data.endHour && data.title && data.date))
              return;
            const localDate = new Date(data.date);
            localDate.setHours(0, 0, 0, 0);
            const weekStart = getStartOfWeek(localDate).toISOString();
            onSave({
              title: data.title,
              date: localDate.toISOString(),
              day: localDate.getDay(),
              startHour: Number(data.startHour),
              endHour: Number(data.endHour),
              weekStart,
              calendarType: data.calendarType,
              platform: data.platform,
              meetLink:
                data.platform === "google_meet" ? data.meetLink : undefined,
            });
            onClose();
          })}
        >
          <Button
            className="absolute top-4 right-4 text-black border-none font-normal shadow-none"
            onClick={onClose}
            variant="outline"
            size="icon"
            aria-label="Close"
            type="button"
          >
            X
          </Button>
          <h1 className="mb-4 font-normal text-[20px]">
            {eventToEdit ? "Edit Event" : "New Event"}
          </h1>
          <Flex className="flex-col gap-2 items-start">
            <label className="font-medium text-sm">Event Title:</label>
            <Input
              size="lg"
              {...register("title", { required: true })}
              placeholder="Enter Event Title"
              className="bg-white rounded-full placeholder:text-gray-400"
            />
            {errors.title && (
              <span className="text-red-500 text-xs">Title is required.</span>
            )}
          </Flex>
          <Flex className="relative mt-3 flex-col items-start">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-white rounded-full h-12 border border-gray-200 relative"
                  type="button"
                >
                  <CalendarIcon className="size-4.5 fill-[#1797B9] absolute left-3 top-1/2 -translate-y-1/2" />

                  <Box className="ml-8">
                    {date ? (
                      new Date(date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })
                    ) : (
                      <span className="text-gray-400">Pick a date</span>
                    )}
                  </Box>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-[9999] cursor-pointer">
                <Calendar
                  className="w-72 p-2"
                  mode="single"
                  selected={date ? new Date(date) : undefined}
                  onSelect={(d) => setValue("date", d ?? new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <span className="text-red-500 text-xs">Date is required.</span>
            )}
          </Flex>
          <Box className="my-3">
            <Center className="justify-between gap-2 mt-1">
              <Select
                value={String(startHour)}
                onValueChange={(value) => setValue("startHour", Number(value))}
              >
                <SelectTrigger className="w-40 p-3 rounded-full min-h-12 border border-gray-200">
                  <Flex className="gap-2">
                    <Clock className="size-4 text-[#1797B9]" />
                    <SelectValue placeholder="Start Time" />
                  </Flex>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Start Time</SelectLabel>
                    {hours.map((h) => (
                      <SelectItem value={h.toString()} key={h}>
                        {formatHour(h)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ArrowRight className="size-6 text-gray-400" />
              <Select
                value={String(endHour)}
                onValueChange={(value) => setValue("endHour", Number(value))}
              >
                <SelectTrigger className="w-40 p-3 rounded-full min-h-12 border border-gray-200">
                  <Flex className="gap-2">
                    <Clock className="size-4 text-[#1797B9]" />
                    <SelectValue placeholder="End Time" />
                  </Flex>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>End Time</SelectLabel>
                    {hours.map((h) => (
                      <SelectItem value={h.toString()} key={h}>
                        {formatHour(h)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Center>
            {Number(startHour) >= Number(endHour) && (
              <div className="text-red-500 mt-1 text-xs">
                End time must be after start time.
              </div>
            )}
            {Number(startHour) < Number(endHour) && (
              <div className="text-green-600 mt-1 text-xs font-medium">
                Duration: {getDuration(Number(startHour), Number(endHour))}
              </div>
            )}
          </Box>
          {date && (
            <Flex className="rounded-full bg-white text-center p-2 w-full h-12 border border-gray-200 mt-1 text-sm text-gray-600">
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </Flex>
          )}
          <Input
            size="lg"
            // {...register("description")}
            placeholder="Description"
            className="bg-white rounded-full placeholder:text-gray-400 mt-3 font-light"
          />
          <Box className="my-2">
            <label className="font-medium text-sm">
              Platform
              <span className="text-gray-400 text-xs ml-2">(Optional)</span>
            </label>
            <Flex>
              <button
                type="button"
                onClick={() => setValue("platform", "google_meet")}
                className={`flex items-center gap-1.5 text-sm border-none rounded-md px-3 py-1.5 cursor-pointer font-light ${
                  platform === "google_meet" ? "bg-cyan-100" : "bg-transparent"
                }`}
              >
                <img
                  src={GoogleMeetIcon}
                  alt="Google Meet"
                  className="size-3"
                />{" "}
                Google Meet
              </button>
              <button
                type="button"
                onClick={() => setValue("platform", "whatsapp")}
                className={`flex items-center gap-1.5 text-sm border-none rounded-md px-3 py-1.5 cursor-pointer font-light ${
                  platform === "whatsapp" ? "bg-cyan-100" : "bg-transparent"
                }`}
              >
                <img src={WhatsappIcon} alt="WhatsApp" className="size-3" />{" "}
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setValue("platform", "outlook")}
                className={`flex items-center gap-1.5 text-sm border-none rounded-md px-3 py-1.5 cursor-pointer font-light ${
                  platform === "outlook" ? "bg-cyan-100" : "bg-transparent"
                }`}
              >
                <img src={OutlookIcon} alt="Outlook" className="size-3" />{" "}
                Outlook
              </button>
            </Flex>
            {platform === "google_meet" ? (
              <div className="mt-2">
                <Input
                  {...register("meetLink")}
                  name="meetLink"
                  placeholder="Google Meet Link"
                  required={platform === "google_meet"}
                  className="w-full p-2 rounded-full border border-gray-200 placeholder:text-gray-400 bg-white h-12"
                />
              </div>
            ) : platform === "whatsapp" ? (
              <div className="mt-2">
                <input
                  {...register("meetLink")}
                  name="meetLink"
                  placeholder="WhatsApp Number"
                  required={platform === "whatsapp"}
                  className="w-full p-2 rounded-full border border-gray-200"
                />
              </div>
            ) : platform === "outlook" ? (
              <div className="mt-2">
                <input
                  {...register("meetLink")}
                  name="meetLink"
                  placeholder="Outlook Event"
                  required={platform === "outlook"}
                  className="w-full p-2 rounded-full border border-gray-200"
                />
              </div>
            ) : null}
          </Box>
          <Box className="mb-3.5">
            <label className="font-normal text-sm">Calendar</label>
            <Flex className="gap-1.5 mt-1">
              <Flex
                onClick={() => setValue("calendarType", "work")}
                className={`flex items-center gap-1 text-sm border-none rounded-md px-2 py-1.5 cursor-pointer font-light ${
                  calendarType === "work" ? "bg-cyan-100" : "bg-transparent"
                }`}
              >
                <img src={WhatsAppCheckBoxIcon} alt="Work" className="size-4" />{" "}
                Work
              </Flex>
              <button
                type="button"
                onClick={() => setValue("calendarType", "education")}
                className={`flex items-center gap-1.5 text-sm border-none rounded-md px-3 py-1.5 cursor-pointer font-light ${
                  calendarType === "education"
                    ? "bg-indigo-100"
                    : "bg-transparent"
                }`}
              >
                <img
                  src={EducationCheckBoxIcon}
                  alt="Education"
                  className="size-4"
                />{" "}
                Education
              </button>
              <button
                type="button"
                onClick={() => setValue("calendarType", "personal")}
                className={`flex items-center gap-1.5 text-sm border-none rounded-md px-3 py-1.5 cursor-pointer font-light ${
                  calendarType === "personal" ? "bg-pink-100" : "bg-transparent"
                }`}
              >
                <img
                  src={PersolCheckBoxIcon}
                  alt="Personal"
                  className="size-4"
                />{" "}
                Personal
              </button>
            </Flex>
          </Box>
          <Flex className="justify-end mt-4">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-gray-200 bg-[#1797B9]/30 font-normal cursor-pointer text-black hover:bg-[#1797B9]/40"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`px-4 py-2 rounded-full font-normal text-white border-none ${
                isValid
                  ? "bg-[#1797B9] hover:bg-[#1797B9]/80 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isValid}
            >
              {eventToEdit ? "Save" : "Create"}
            </Button>
          </Flex>
        </form>
      </div>
    </div>
  );
};
