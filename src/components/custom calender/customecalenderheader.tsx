import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Center } from "../ui/center";
import { cn } from "@/lib/utils";
import { EventModal } from "./calendareventmodal";
// import ReactDOM from "react-dom";
import { useGeneralModalDisclosure } from "../common/generalmodal";

const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23 (24 hours)
function formatHour(hour: number) {
  const h = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour < 12 ? "AM" : "PM";
  return `${h} ${ampm}`;
}
const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type CustomEvent = {
  title: string;
  // img: string;
  date: string; // ISO date string
  day: number;
  startHour: number;
  endHour: number;
  weekStart: string;
  calendarType: "work" | "education" | "personal";
  platform?: "google_meet" | "whatsapp" | "outlook" | "none";
  meetLink?: string;
};

const initialEvents: CustomEvent[] = [];

function getStartOfWeek(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function getWeekDates(start: Date) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

// Helper for platform colors
const platformColors = {
  google_meet: { bg: "#E6F4D6", text: "#92AB74" },
  whatsapp: { bg: "#E8EBFF", text: "#6D7EF3" },
  outlook: { bg: "#FFF4EB", text: "#F39F5A" },
  none: { bg: "#f0f0f0", text: "#323334" },
};

export const CustomCalendarHeader = () => {
  const [events, setEvents] = useState<CustomEvent[]>(initialEvents);
  //          const [showModal, setShowModal] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(getStartOfWeek(new Date()));
  const [miniCalRange, setMiniCalRange] = useState<{ from?: Date }>({});
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null);
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const [editEvent, setEditEvent] = useState<CustomEvent | null>(null);

  const weekDates = getWeekDates(currentWeek);

  // Event Details Popup
  const EventDetailsPopup = ({
    event,
    onClose,
  }: {
    event: CustomEvent;
    onClose: () => void;
  }) => (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1001,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          minWidth: 320,
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginBottom: 12 }}>{event.title}</h3>

        <div
          style={{
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* Calendar type dot */}
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background:
                event.calendarType === "work"
                  ? "#6ee7b7"
                  : event.calendarType === "education"
                  ? "#818cf8"
                  : "#f472b6",
              display: "inline-block",
            }}
          ></span>
          <span style={{ fontWeight: 500 }}>
            {event.calendarType.charAt(0).toUpperCase() +
              event.calendarType.slice(1)}
          </span>
        </div>
        <div
          style={{
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* Platform icon */}
          {event.platform === "google_meet" && (
            <img
              src="/dashboard/camera.svg"
              alt="Google Meet"
              style={{ width: 20, height: 20 }}
            />
          )}
          {event.platform === "whatsapp" && (
            <img
              src="/sidebar/ai assist.svg"
              alt="WhatsApp"
              style={{ width: 20, height: 20 }}
            />
          )}
          {event.platform === "outlook" && (
            <img
              src="/dashboard/stat.svg"
              alt="Outlook"
              style={{ width: 20, height: 20 }}
            />
          )}
          <span style={{ fontWeight: 500 }}>
            {event.platform && event.platform !== "none"
              ? event.platform
                  .replace("_", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())
              : "No Platform"}
          </span>
        </div>
        <div style={{ marginBottom: 8 }}>
          <b>Date:</b>{" "}
          {event.date ? new Date(event.date).toLocaleDateString() : ""}
          <br />
          <b>Day:</b> {daysShort[event.day]}
          <br />
          <b>Time:</b> {formatHour(event.startHour)} -{" "}
          {formatHour(event.endHour)}
        </div>
        {event.platform === "google_meet" && event.meetLink && (
          <div style={{ marginBottom: 8 }}>
            <img
              src="/dashboard/camera.svg"
              alt="Google Meet"
              style={{
                width: 24,
                height: 24,
                verticalAlign: "middle",
                marginRight: 6,
              }}
            />
            <a
              href={event.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "underline" }}
            >
              Join with Google Meet
            </a>
          </div>
        )}
        <button onClick={onClose} style={{ padding: "6px 12px", marginTop: 8 }}>
          Close
        </button>
      </div>
    </div>
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
  const modalProps = useGeneralModalDisclosure();

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
                // onClick={() => setShowModal(true)}
                onClick={() => modalProps.onOpenChange(true)}
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
                <span style={{ fontWeight: 600 }}>My Calendars</span>
                <Flex className="items-center gap-2">
                  <Plus className="size-4 cursor-pointer text-gray-500" />
                  <ChevronDown className="size-4 cursor-pointer text-gray-500" />
                </Flex>
              </Flex>
              <Flex className="flex-col items-start gap-4">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      background: "#6ee7b7",
                      display: "inline-block",
                    }}
                  ></span>
                  <span>Work</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      background: "#818cf8",
                      display: "inline-block",
                    }}
                  ></span>
                  <span>Education</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      background: "#f472b6",
                      display: "inline-block",
                    }}
                  ></span>
                  <span>Personal</span>
                </div>
              </Flex>
            </Stack>
            {/* Platforms */}
            <Stack className="w-full p-3">
              <Flex className="items-center justify-between">
                <div style={{ fontWeight: 600, marginBottom: 8 }}>
                  Platforms
                </div>

                <Flex className="items-center">
                  <Plus className="size-4 cursor-pointer text-gray-500" />
                  <ChevronDown className="size-4 cursor-pointer text-gray-500" />
                </Flex>
              </Flex>

              <Flex className="flex-col gap-4 items-start">
                <Center className="gap-2 cursor-pointer">
                  <img
                    src="/dashboard/checkbox.svg"
                    alt="CheckBox"
                    style={{ width: 17, height: 17 }}
                  />
                  <img
                    src="/dashboard/google-meet.svg"
                    alt="Google Meet"
                    style={{ width: 20, height: 20 }}
                  />
                </Center>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="/dashboard/checkbox.svg"
                    alt="CheckBox"
                    style={{ width: 17, height: 17 }}
                  />
                  <img
                    src="/dashboard/whatsapp-icon.svg"
                    alt="WhatsApp"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="/dashboard/checkbox.svg"
                    alt="CheckBox"
                    style={{ width: 17, height: 17 }}
                  />
                  <img
                    src="/dashboard/google-drive.svg"
                    alt="Outlook"
                    style={{ width: 20, height: 20 }}
                  />
                </div>
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
                      <div
                        key={dayIdx}
                        style={{
                          textAlign: "center",
                          border: "0.5px solid #eee",
                          minHeight: 80,
                          minWidth: 80,
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
                          <div
                            className="bg-red-500"
                            style={{
                              position: "absolute",
                              top: 5,
                              left: 5,
                              right: 5,
                              height:
                                40 * (event.endHour - event.startHour) - 12,
                              background:
                                platformColors[event.platform || "none"].bg,
                              color:
                                platformColors[event.platform || "none"].text,
                              borderRadius: 12,
                              padding: 2,
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                              gap: 8,
                              zIndex: 2,
                              border: "1.5px solid #b2ebf2",
                              boxShadow:
                                hoveredEventId === eventId
                                  ? "0 4px 16px rgba(23,151,185,0.12)"
                                  : undefined,
                              transition: "box-shadow 0.2s, transform 0.2s",
                              cursor: "pointer",
                            }}
                            onClick={() => setSelectedEvent(event)}
                          >
                            {/* Platform icon */}
                            {event.platform === "google_meet" && (
                              <img
                                src="/dashboard/camera.svg"
                                alt="Google Meet"
                                style={{ width: 20, height: 20 }}
                              />
                            )}
                            {event.platform === "whatsapp" && (
                              <img
                                src="/sidebar/ai assist.svg"
                                alt="WhatsApp"
                                style={{ width: 20, height: 20 }}
                              />
                            )}
                            {event.platform === "outlook" && (
                              <img
                                src="/dashboard/stat.svg"
                                alt="Outlook"
                                style={{ width: 20, height: 20 }}
                              />
                            )}
                            {/* Calendar type dot */}
                            <span
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                background:
                                  event.calendarType === "work"
                                    ? "#6ee7b7"
                                    : event.calendarType === "education"
                                    ? "#818cf8"
                                    : "#f472b6",
                                display: "inline-block",
                                marginRight: 4,
                              }}
                            ></span>
                            <span style={{ flex: 1 }}>{event.title}</span>
                            <span
                              style={{
                                fontSize: 12,
                                color:
                                  platformColors[event.platform || "none"].text,
                                marginLeft: 8,
                              }}
                            >
                              {formatHour(event.startHour)} -{" "}
                              {formatHour(event.endHour)}
                            </span>
                            {/* Edit icon on hover */}
                            {hoveredEventId === eventId && (
                              <button
                                style={{
                                  position: "absolute",
                                  top: 6,
                                  right: 6,
                                  background: "rgba(23,151,185,0.12)",
                                  border: "none",
                                  borderRadius: "50%",
                                  padding: 4,
                                  cursor: "pointer",
                                  zIndex: 3,
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditEvent(event);
                                }}
                                title="Edit"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  fill="#1797B9"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M12.146 2.854a.5.5 0 0 1 .708 0l.292.292a.5.5 0 0 1 0 .708l-8.5 8.5a.5.5 0 0 1-.168.11l-3 1a.5.5 0 0 1-.637-.637l1-3a.5.5 0 0 1 .11-.168l8.5-8.5zM11.207 3.5 3 11.707V13h1.293L12.5 4.793 11.207 3.5zm1.586-1.586a1.5 1.5 0 0 0-2.121 0l-.793.793 2.121 2.121.793-.793a1.5 1.5 0 0 0 0-2.121z" />
                                </svg>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Flex>
      </Box>

      {/* New Event Modal */}
      {/* {showModal &&
        ReactDOM.createPortal( */}
      <EventModal
        modalProps={modalProps}
        onSave={(newEvent: CustomEvent) => {
          setEvents([...events, newEvent]);
          modalProps.onOpenChange(false);
        }}
        onClose={() => modalProps.onOpenChange(false)}
      />
      {/* )} */}

      {/* Event Details Popup */}
      {selectedEvent && (
        <EventDetailsPopup
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Edit Event Modal */}
      <EventModal
        modalProps={modalProps}
        eventToEdit={editEvent}
        onSave={(updatedEvent: CustomEvent) => {
          setEvents(
            events.map((ev) =>
              ev.date && ev.startHour ? { ...updatedEvent } : ev
            )
          );
          modalProps.onOpenChange(false);
        }}
        onClose={() => {
          modalProps.onOpenChange(false);
        }}
      />
    </>
  );
};
