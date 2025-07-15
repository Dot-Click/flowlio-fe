import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { ChevronDown, Plus } from "lucide-react";
import { Center } from "../ui/center";

const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23 (24 hours)
function formatHour(hour: number) {
  const h = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour < 12 ? "AM" : "PM";
  return `${h} ${ampm}`;
}
const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type CustomEvent = {
  title: string;
  img: string;
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

export const CustomCalendarHeader = () => {
  const [events, setEvents] = useState<CustomEvent[]>(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(getStartOfWeek(new Date()));
  const [miniCalRange, setMiniCalRange] = useState<{ from?: Date }>({});
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null);

  const weekDates = getWeekDates(currentWeek);

  // Modal for new event
  const EventModal = ({
    onSave,
    onClose,
  }: {
    onSave: (e: CustomEvent) => void;
    onClose: () => void;
  }) => {
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");
    const [date, setDate] = useState<Date | null>(new Date());
    const [startHour, setStartHour] = useState(8); // Default 8AM
    const [endHour, setEndHour] = useState(9); // Default 9AM
    const [calendarType, setCalendarType] = useState<
      "work" | "education" | "personal"
    >("work");
    const [platform, setPlatform] = useState<
      "google_meet" | "whatsapp" | "outlook" | "none"
    >("none");
    const [meetLink, setMeetLink] = useState("");
    const isValid = startHour < endHour && !!date;
    return (
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
          zIndex: 1000,
        }}
      >
        <form
          style={{
            background: "#fff",
            padding: 24,
            borderRadius: 12,
            minWidth: 340,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            if (!isValid || !date) return;
            const weekStart = getStartOfWeek(date).toISOString();
            onSave({
              title,
              img,
              date: date.toISOString(),
              day: date.getDay(),
              startHour,
              endHour,
              weekStart,
              calendarType,
              platform,
              meetLink: platform === "google_meet" ? meetLink : undefined,
            });
          }}
        >
          <h3 style={{ marginBottom: 16, fontWeight: 700, fontSize: 20 }}>
            Create New Event
          </h3>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontWeight: 500, fontSize: 14 }}>Event Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder="Event Title"
              required
              style={{
                width: "100%",
                padding: 8,
                marginTop: 4,
                borderRadius: 6,
                border: "1px solid #eee",
              }}
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontWeight: 500, fontSize: 14 }}>
              Image URL (optional)
            </label>
            <input
              value={img}
              onChange={(e) => setImg(e.target.value)}
              name="img"
              placeholder="Image URL (optional)"
              style={{
                width: "100%",
                padding: 8,
                marginTop: 4,
                borderRadius: 6,
                border: "1px solid #eee",
              }}
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontWeight: 500, fontSize: 14 }}>Date</label>
            <Input
              type="date"
              value={date?.toISOString().split("T")[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontWeight: 500, fontSize: 14 }}>Calendar</label>
            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
              <button
                type="button"
                onClick={() => setCalendarType("work")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: calendarType === "work" ? "#e0f7fa" : "#f3f4f6",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    background: "#6ee7b7",
                    display: "inline-block",
                  }}
                ></span>{" "}
                Work
              </button>
              <button
                type="button"
                onClick={() => setCalendarType("education")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background:
                    calendarType === "education" ? "#e0e7ff" : "#f3f4f6",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    background: "#818cf8",
                    display: "inline-block",
                  }}
                ></span>{" "}
                Education
              </button>
              <button
                type="button"
                onClick={() => setCalendarType("personal")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background:
                    calendarType === "personal" ? "#fce7f3" : "#f3f4f6",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    background: "#f472b6",
                    display: "inline-block",
                  }}
                ></span>{" "}
                Personal
              </button>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontWeight: 500, fontSize: 14 }}>Time</label>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <select
                value={startHour}
                onChange={(e) => setStartHour(Number(e.target.value))}
                style={{
                  width: "50%",
                  padding: 8,
                  borderRadius: 6,
                  border: "1px solid #eee",
                }}
              >
                {hours.map((h) => (
                  <option value={h} key={h}>
                    {formatHour(h)}
                  </option>
                ))}
              </select>
              <select
                value={endHour}
                onChange={(e) => setEndHour(Number(e.target.value))}
                style={{
                  width: "50%",
                  padding: 8,
                  borderRadius: 6,
                  border: "1px solid #eee",
                }}
              >
                {hours.map((h) => (
                  <option value={h} key={h}>
                    {formatHour(h)}
                  </option>
                ))}
              </select>
            </div>
            {!isValid && (
              <div style={{ color: "red", marginTop: 4, fontSize: 13 }}>
                End time must be after start time.
              </div>
            )}
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontWeight: 500, fontSize: 14 }}>Platform</label>
            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
              <button
                type="button"
                onClick={() => setPlatform("google_meet")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background:
                    platform === "google_meet" ? "#e0f7fa" : "#f3f4f6",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                <img
                  src="/dashboard/camera.svg"
                  alt="Google Meet"
                  style={{ width: 18, height: 18 }}
                />{" "}
                Google Meet
              </button>
              <button
                type="button"
                onClick={() => setPlatform("whatsapp")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: platform === "whatsapp" ? "#e0f7fa" : "#f3f4f6",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                <img
                  src="/sidebar/ai assist.svg"
                  alt="WhatsApp"
                  style={{ width: 18, height: 18 }}
                />{" "}
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setPlatform("outlook")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: platform === "outlook" ? "#e0f7fa" : "#f3f4f6",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                <img
                  src="/dashboard/stat.svg"
                  alt="Outlook"
                  style={{ width: 18, height: 18 }}
                />{" "}
                Outlook
              </button>
            </div>
            {platform === "google_meet" && (
              <div style={{ marginTop: 8 }}>
                <input
                  value={meetLink}
                  onChange={(e) => setMeetLink(e.target.value)}
                  name="meetLink"
                  placeholder="Google Meet Link"
                  required={platform === "google_meet"}
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 6,
                    border: "1px solid #eee",
                  }}
                />
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 18,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                border: "1px solid #eee",
                background: "#f3f4f6",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                background: isValid ? "#007bff" : "#aaa",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontWeight: 600,
                cursor: isValid ? "pointer" : "not-allowed",
              }}
              disabled={!isValid}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    );
  };

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
        {event.img && (
          <img
            src={event.img}
            alt="event"
            style={{ width: 40, height: 40, marginBottom: 8 }}
          />
        )}
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

  return (
    <Box className="mt-6 rounded-lg border border-gray-200">
      <Flex className="rounded-lg items-start overflow-hidden max-md:overflow-x-scroll gap-0">
        {/* Sidebar */}
        <Flex className="w-[290px] bg-white flex-col gap-6 items-start h-[70rem]">
          {/* Mini Calendar */}
          <Stack className="w-full p-3">
            <Button
              className="w-full bg-[#1797B9] hover:bg-[#1797B9]/80 hover:text-white text-white rounded-full h-11 cursor-pointer "
              size="lg"
              onClick={() => setShowModal(true)}
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
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Platforms</div>

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
        <div style={{ flex: 1 }}>
          {/* Calendar Header */}
          <Flex className="items-center justify-between px-6 pt-6 pb-2">
            {/* Navigation */}
            <Flex className="items-center gap-2">
              <Button variant="ghost" size="icon" onClick={goToPrev}>
                <span style={{ fontSize: 20 }}>{"<"}</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={goToToday}>
                Today
              </Button>
              <Button variant="ghost" size="icon" onClick={goToNext}>
                <span style={{ fontSize: 20 }}>{">"}</span>
              </Button>
            </Flex>
            {/* Date Range Title */}
            <div className="text-lg font-semibold">
              {weekDates[0].toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </div>
            {/* View Mode Toggle */}
            <Flex className="gap-2">
              <Button
                variant={viewMode === "day" ? "default" : "outline"}
                onClick={() => setViewMode("day")}
              >
                Day
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "outline"}
                onClick={() => setViewMode("week")}
              >
                Week
              </Button>
              <Button
                variant={viewMode === "month" ? "default" : "outline"}
                onClick={() => setViewMode("month")}
              >
                Month
              </Button>
            </Flex>
          </Flex>
          {/* Date Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "80px repeat(7, 1fr)",
              background: "#f8fafc",
              borderBottom: "1px solid #e5e7eb",
              padding: "0 24px",
            }}
          >
            <div></div>
            {weekDates.map((d, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  padding: "12px 0 8px 0",
                  color: "#222",
                  fontSize: 15,
                }}
              >
                <div style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>
                  {daysShort[d.getDay()]}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>
                  {d.getDate()}
                </div>
              </div>
            ))}
          </div>
          {/* Time grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "80px repeat(7, 1fr)",
            }}
          >
            {hours.map((hour) => (
              <React.Fragment key={hour}>
                <div
                  style={{
                    textAlign: "right",
                    padding: 4,
                    background: "#f8fafc",
                    fontWeight: 500,
                    color: "#888",
                    fontSize: 14,
                  }}
                >
                  {formatHour(hour)}
                </div>
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
                  return (
                    <div
                      key={dayIdx}
                      style={{
                        border: "1px solid #eee",
                        minHeight: 40,
                        position: "relative",
                        cursor: event ? "pointer" : "default",
                        background: "#fff",
                        padding: 0,
                      }}
                      onClick={() =>
                        event && isEventStart && setSelectedEvent(event)
                      }
                    >
                      {event && isEventStart && (
                        <div
                          style={{
                            position: "absolute",
                            top: 2,
                            left: 2,
                            right: 2,
                            height: 38 * (event.endHour - event.startHour) - 4,
                            background:
                              event.platform === "google_meet"
                                ? "#e0f7fa"
                                : event.platform === "whatsapp"
                                ? "#e0ffe0"
                                : event.platform === "outlook"
                                ? "#e3e7fa"
                                : "#f0f0f0",
                            borderRadius: 8,
                            padding: 4,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            zIndex: 2,
                            border: "1px solid #b2ebf2",
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
                          <span>{event.title}</span>
                          <span
                            style={{
                              fontSize: 12,
                              color: "#888",
                              marginLeft: 8,
                            }}
                          >
                            {formatHour(event.startHour)} -{" "}
                            {formatHour(event.endHour)}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Flex>

      {showModal && (
        <EventModal
          onSave={(newEvent: CustomEvent) => {
            setEvents([...events, newEvent]);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}

      {selectedEvent && (
        <EventDetailsPopup
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </Box>
  );
};
