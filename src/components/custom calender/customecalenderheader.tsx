import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Plus,
} from "lucide-react";
import { Center } from "../ui/center";
import { cn } from "@/lib/utils";
import { EventModal } from "./calendareventmodal";
// import ReactDOM from "react-dom";
import { useGeneralModalDisclosure } from "../common/generalmodal";
import {
  getStartOfWeek,
  getWeekDates,
  platformColors,
  daysShort,
  formatHour,
  CustomEvent,
  initialEvents,
} from "./calendarUtils";
import GoogleMeetIcon from "../../../public/dashboard/google-meet.svg";
import WhatsappIcon from "../../../public/dashboard/whatsapp-icon.svg";
import OutlookIcon from "../../../public/dashboard/google-drive.svg";
import WhatsAppCheckBoxIcon from "../../../public/dashboard/whatsappcheckbox.svg";
import EducationCheckBoxIcon from "../../../public/dashboard/educationcheckbox.svg";
import PersolCheckBoxIcon from "../../../public/dashboard/personalicon.svg";

const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23 (24 hours)

export const CustomCalendarHeader = () => {
  const [events, setEvents] = useState<CustomEvent[]>(initialEvents);
  const [currentWeek, setCurrentWeek] = useState(getStartOfWeek(new Date()));
  const [miniCalRange, setMiniCalRange] = useState<{ from?: Date }>({});
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null);
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const [editEvent, setEditEvent] = useState<CustomEvent | null>(null);

  // Separate modal props for new and edit modals
  const newEventModalProps = useGeneralModalDisclosure();
  const editEventModalProps = useGeneralModalDisclosure();

  const weekDates = getWeekDates(currentWeek);

  // Event Details Popup
  const EventDetailsPopup = ({
    event,
    onClose,
  }: {
    event: CustomEvent;
    onClose: () => void;
  }) => (
    <Center
      className="fixed top-0 left-0 w-full h-full bg-black/30 z-[1001]"
      onClick={onClose}
    >
      <Box
        className="relative bg-white p-6 rounded-xl min-w-[340px] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-4 font-bold text-[20px]">{event.title}</h3>

        <Flex className="mb-4 gap-4 items-center">
          {/* Calendar type dot */}
          <span
            className={cn(
              "w-4 h-4 rounded-full",
              event.calendarType === "work"
                ? "bg-[#6ee7b7]"
                : event.calendarType === "education"
                ? "bg-[#818cf8]"
                : "bg-[#f472b6]"
            )}
          ></span>
          <span className="font-medium">
            {event.calendarType.charAt(0).toUpperCase() +
              event.calendarType.slice(1)}
          </span>
        </Flex>
        <Flex className="mb-4 gap-4 items-center">
          {/* Platform icon */}
          {event.platform === "google_meet" && (
            <img src={GoogleMeetIcon} alt="Google Meet" className="size-5" />
          )}
          {event.platform === "whatsapp" && (
            <img src={WhatsappIcon} alt="WhatsApp" className="size-5" />
          )}
          {event.platform === "outlook" && (
            <img src={OutlookIcon} alt="Outlook" className="size-5" />
          )}
          <span className="font-medium">
            {event.platform && event.platform !== "none"
              ? event.platform
                  .replace("_", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())
              : "No Platform"}
          </span>
        </Flex>
        <Box className="mb-4">
          <b>Date:</b>{" "}
          {event.date ? new Date(event.date).toLocaleDateString() : ""}
          <br />
          <b>Day:</b> {daysShort[event.day]}
          <br />
          <b>Time:</b> {formatHour(event.startHour)} -{" "}
          {formatHour(event.endHour)}
        </Box>
        {event.platform === "google_meet" && event.meetLink && (
          <Flex className="mb-4">
            <img src={GoogleMeetIcon} alt="Google Meet" className="size-6" />
            <a
              href={event.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "underline" }}
            >
              Join with Google Meet
            </a>
          </Flex>
        )}
        <Button onClick={onClose} className="mt-4">
          Close
        </Button>
      </Box>
    </Center>
  );

  // Navigation handlers
  const goToToday = () => setCurrentWeek(getStartOfWeek(new Date()));
  const goToPrev = () => {
    const prev = new Date(currentWeek);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeek(getStartOfWeek(prev));
  };
  const goToNext = () => {
    const next = new Date(currentWeek);
    next.setDate(next.getDate() + 7);
    setCurrentWeek(getStartOfWeek(next));
  };

  // Filter events for this week
  const weekKey = currentWeek.toISOString();
  const weekEvents = events.filter((e) => e.weekStart === weekKey);

  return (
    <>
      <Box className="mt-6 rounded-lg border border-gray-200">
        <Flex className="rounded-lg items-start overflow-hidden max-md:overflow-x-scroll gap-0">
          {/* Sidebar */}
          <Flex className="w-[290px] bg-white flex-col gap-6 items-start h-[127rem]">
            {/* Mini Calendar */}
            <Stack className="w-full p-3">
              <Button
                className="w-full bg-[#1797B9] hover:bg-[#1797B9]/80 hover:text-white text-white rounded-full h-11 cursor-pointer "
                size="lg"
                onClick={() => newEventModalProps.onOpenChange(true)}
              >
                New Event <Plus className="size-5 text-white" />
              </Button>
              <Calendar
                className="w-full p-0 overflow-hidden mt-4"
                mode="single"
                selected={miniCalRange.from}
                onSelect={(date) => setMiniCalRange({ from: date })}
              />
            </Stack>

            {/* My Calendars */}
            <Stack className="w-full p-3">
              <Flex className="items-center justify-between">
                <span className="font-semibold">My Calendars</span>
                <Flex className="items-center gap-2">
                  <Plus className="size-4 cursor-pointer text-gray-500" />
                  <ChevronDown className="size-4 cursor-pointer text-gray-500" />
                </Flex>
              </Flex>
              <Flex className="flex-col items-start gap-2">
                <Flex className="items-center gap-4">
                  <img
                    src={WhatsAppCheckBoxIcon}
                    alt="Work"
                    className="size-4"
                  />
                  <span>Work</span>
                </Flex>
                <Flex className="items-center gap-4">
                  <img
                    src={EducationCheckBoxIcon}
                    alt="Work"
                    className="size-4"
                  />
                  <span>Education</span>
                </Flex>
                <Flex className="items-center gap-4">
                  <img src={PersolCheckBoxIcon} alt="Work" className="size-4" />
                  <span>Personal</span>
                </Flex>
              </Flex>
            </Stack>

            {/* Platforms */}
            <Stack className="w-full p-3">
              <Flex className="items-center justify-between">
                <Box className="font-semibold mb-4">Platforms</Box>

                <Flex className="items-center">
                  <Plus className="size-4 cursor-pointer text-gray-500" />
                  <ChevronDown className="size-4 cursor-pointer text-gray-500" />
                </Flex>
              </Flex>

              <Flex className="flex-col gap-4 items-start">
                <Center className="gap-4 cursor-pointer">
                  <img
                    src="/dashboard/checkbox.svg"
                    alt="CheckBox"
                    className="size-4"
                  />
                  <img
                    src={GoogleMeetIcon}
                    alt="Google Meet"
                    className="size-5"
                  />
                </Center>
                <Flex className="items-center gap-4 cursor-pointer">
                  <img
                    src="/dashboard/checkbox.svg"
                    alt="CheckBox"
                    className="size-4"
                  />
                  <img src={WhatsappIcon} alt="WhatsApp" className="size-5" />
                </Flex>
                <Flex className="items-center gap-4 cursor-pointer">
                  <img
                    src="/dashboard/checkbox.svg"
                    alt="CheckBox"
                    className="size-4"
                  />
                  <img src={OutlookIcon} alt="Outlook" className="size-5" />
                </Flex>
              </Flex>
            </Stack>
          </Flex>

          {/* Main Calendar Area */}
          <Box className="flex-1 bg-[#F8FAFC]" style={{ flex: 1 }}>
            {/* Calendar Header */}
            <Flex className="items-center justify-between px-6 pt-6 pb-2">
              {/* Navigation */}
              <Flex className="items-center gap-2">
                <Button variant="ghost" size="icon" onClick={goToPrev}>
                  <ChevronLeft />
                </Button>

                <Box className="text-lg font-semibold">
                  {weekDates[0].toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </Box>

                <Button variant="ghost" size="icon" onClick={goToNext}>
                  <ChevronRight />
                </Button>
              </Flex>

              {/* Date Range Title */}
              <Button
                variant="ghost"
                size="icon"
                className="bg-white w-24 h-9 border"
                onClick={goToToday}
              >
                Today
              </Button>

              {/* View Mode Toggle */}
              <Flex className="gap-2 bg-[#F2F3F7] p-1 rounded-lg">
                {["day", "week", "month"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as typeof viewMode)}
                    className={`px-6 py-1.5 rounded-lg font-normal transition-colors duration-150
                    ${
                      viewMode === mode
                        ? "bg-white text-[#1797B9] font-semibold"
                        : "bg-transparent text-[#323334]/80 hover:text-[#1797B9] hover:bg-white"
                    }
                  `}
                    style={{
                      outline: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    type="button"
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </Flex>
            </Flex>
            {/* Date Row */}
            <Box className="grid grid-cols-[80px_repeat(7,1fr)] bg-[#F8FAFC] border-b border-[#E5E7EB]">
              <Box></Box>
              {weekDates.map((d, i) => (
                <Center
                  key={i}
                  className={cn(
                    "gap-1 text-center text-sm font-normal text-[#323334] rounded-lg w-17 h-8 m-auto mb-3",
                    d.toDateString() === new Date().toDateString() &&
                      "text-white bg-[#1797B9]",
                    d.getDay() === 0 && "bg-[#FFE5E5] text-[#D32F2F]" // Sunday as day off
                  )}
                  style={{
                    padding: "12px 0 8px 0",
                  }}
                >
                  <Box>{daysShort[d.getDay()]}</Box>
                  <Box>{d.getDate()}</Box>
                </Center>
              ))}
            </Box>

            {/* Time grid */}
            <Box className="grid grid-cols-[80px_repeat(7,1fr)] ml-2 rounded-lg">
              {hours.map((hour) => (
                <React.Fragment key={hour}>
                  <Box className="text-right p-3 bg-white font-normal text-[#888] text-sm">
                    {formatHour(hour)}
                  </Box>
                  {weekDates.map((_, dayIdx) => {
                    // Find event that spans this hour slot
                    const event = weekEvents.find(
                      (e) =>
                        e.day === dayIdx &&
                        hour >= e.startHour &&
                        hour < e.endHour
                    );
                    // Only render the event block at the start hour
                    const isEventStart = event && event.startHour === hour;
                    // Unique event id for hover
                    const eventId = event
                      ? `${event.date}-${event.startHour}`
                      : undefined;
                    return (
                      <Box
                        key={dayIdx}
                        style={{
                          textAlign: "center",
                          border: "0.5px solid #eee",
                          minHeight: 79,
                          minWidth: 86,
                          position: "relative",
                          cursor: event ? "pointer" : "default",
                          background: "#fff",
                          padding: 0,
                        }}
                        onMouseEnter={() =>
                          eventId && setHoveredEventId(eventId)
                        }
                        onMouseLeave={() => setHoveredEventId(null)}
                      >
                        {event && isEventStart && (
                          <Flex
                            className={cn(
                              "absolute top-0.5 left-0.5 gap-0 bottom-0.5 right-0.5 rounded-md items-start flex-col z-[2] p-2 cursor-pointer border border-[#b2ebf2] transition-all duration-300"
                            )}
                            style={{
                              height: `${
                                (event.endHour - event.startHour) * 80 - 10
                              }px`,
                              background:
                                platformColors[event.platform || "none"].bg,
                              color:
                                platformColors[event.platform || "none"].text,
                              boxShadow:
                                hoveredEventId === eventId
                                  ? "0 4px 16px rgba(23,151,185,0.12)"
                                  : undefined,
                            }}
                            onClick={(e) => {
                              // Only show details if not clicking on edit button
                              const target = e.target as HTMLElement;
                              if (!target.closest("button")) {
                                setSelectedEvent(event);
                              }
                            }}
                          >
                            {/* Event header with platform icon and calendar type */}
                            <Flex className="items-start text-start gap-0 w-full flex-col">
                              {/* Platform icon */}
                              {event.platform === "google_meet" ? (
                                <img
                                  src={GoogleMeetIcon}
                                  alt="Google Meet"
                                  className="size-5"
                                />
                              ) : event.platform === "whatsapp" ? (
                                <img
                                  src={WhatsappIcon}
                                  alt="WhatsApp"
                                  className="size-5"
                                />
                              ) : (
                                <img
                                  src={OutlookIcon}
                                  alt="Outlook"
                                  className="size-5"
                                />
                              )}

                              {/* Event title */}
                              <Box className="text-sm font-medium w-full">
                                {event.title.length > 10
                                  ? event.title.slice(0, 10) + "..."
                                  : event.title}
                              </Box>
                            </Flex>

                            {/* Event time */}
                            <span className={cn("text-xs text-black/80")}>
                              {formatHour(event.startHour)} -{" "}
                              {formatHour(event.endHour)}
                            </span>

                            {/* Edit icon on hover */}
                            {hoveredEventId === eventId && (
                              <Button
                                className="absolute top-0 right-0 bg-transparent border-none rounded-full p-4 cursor-pointer z-30"
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log(
                                    "Edit button clicked for event:",
                                    event
                                  );
                                  setEditEvent(event);
                                  editEventModalProps.onOpenChange(true);
                                }}
                                title="Edit"
                              >
                                <Pencil />
                              </Button>
                            )}
                          </Flex>
                        )}
                      </Box>
                    );
                  })}
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Flex>
      </Box>

      {/* New Event Modal */}
      <EventModal
        modalProps={newEventModalProps}
        onSave={(newEvent: CustomEvent) => {
          setEvents([...events, newEvent]);
          newEventModalProps.onOpenChange(false);
        }}
        onClose={() => newEventModalProps.onOpenChange(false)}
      />

      {/* Event Details Popup */}
      {selectedEvent && (
        <EventDetailsPopup
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Edit Event Modal */}
      <EventModal
        modalProps={editEventModalProps}
        eventToEdit={editEvent}
        onSave={(updatedEvent: CustomEvent) => {
          setEvents(
            events.map((ev) => {
              // Find the event to update by matching date and startHour
              if (
                ev.date === editEvent?.date &&
                ev.startHour === editEvent?.startHour
              ) {
                return updatedEvent;
              }
              return ev;
            })
          );
          setEditEvent(null);
          editEventModalProps.onOpenChange(false);
        }}
        onClose={() => {
          setEditEvent(null);
          editEventModalProps.onOpenChange(false);
        }}
      />
    </>
  );
};
