import React, { useState } from "react";
import { PageWrapper } from "@/components/common/pagewrapper";

const hours = Array.from({ length: 14 }, (_, i) => i + 1); // 1AM to 2PM
const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type CustomEvent = {
  title: string;
  img: string;
  day: number; // 0=Sun, 1=Mon, ...
  hour: number; // 1-14 (1AM-2PM)
  weekStart: string; // ISO string of week start (for filtering)
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

const CustomCalendar = () => {
  const [events, setEvents] = useState<CustomEvent[]>(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(getStartOfWeek(new Date()));

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
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(8); // Default 8AM
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
            borderRadius: 8,
            minWidth: 320,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            onSave({
              title,
              img,
              day,
              hour,
              weekStart: currentWeek.toISOString(),
            });
          }}
        >
          <h3 style={{ marginBottom: 12 }}>Create New Event</h3>
          <div style={{ marginBottom: 8 }}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder="Event Title"
              required
              style={{ width: "100%", padding: 6 }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <input
              value={img}
              onChange={(e) => setImg(e.target.value)}
              name="img"
              placeholder="Image URL (optional)"
              style={{ width: "100%", padding: 6 }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              style={{ width: "100%", padding: 6 }}
            >
              {daysShort.map((d, i) => (
                <option value={i} key={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 8 }}>
            <select
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              style={{ width: "100%", padding: 6 }}
            >
              {hours.map((h) => (
                <option value={h} key={h}>
                  {h}:00
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: "6px 12px" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: "6px 12px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 4,
              }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    );
  };

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
    <PageWrapper className="mt-6 p-6">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2>Custom Image Calendar</h2>
        <div>
          <button onClick={goToPrev} style={{ marginRight: 8 }}>
            {"<"}
          </button>
          <button onClick={goToToday} style={{ marginRight: 8 }}>
            Today
          </button>
          <button onClick={goToNext}>{">"}</button>
          <button
            style={{
              marginLeft: 16,
              padding: "8px 16px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: 4,
            }}
            onClick={() => setShowModal(true)}
          >
            New Event +
          </button>
        </div>
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "80px repeat(7, 1fr)" }}
      >
        {/* Header */}
        <div></div>
        {weekDates.map((d, i) => (
          <div
            key={i}
            style={{ textAlign: "center", fontWeight: "bold", padding: 4 }}
          >
            {daysShort[d.getDay()]}
            <br />
            {d.getDate()}/{d.getMonth() + 1}
          </div>
        ))}
        {/* Time grid */}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div style={{ textAlign: "right", padding: 4 }}>{hour}:00</div>
            {weekDates.map((_, dayIdx) => {
              const event = weekEvents.find(
                (e) => e.day === dayIdx && e.hour === hour
              );
              return (
                <div
                  key={dayIdx}
                  style={{
                    border: "1px solid #eee",
                    minHeight: 50,
                    position: "relative",
                  }}
                >
                  {event && (
                    <div
                      style={{
                        background: "#e0f7fa",
                        borderRadius: 8,
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <img
                        src={event.img || "/dashboard/camera.svg"}
                        alt=""
                        style={{ width: 24, height: 24 }}
                      />
                      <span>{event.title}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      {showModal && (
        <EventModal
          onSave={(newEvent: CustomEvent) => {
            setEvents([...events, newEvent]);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </PageWrapper>
  );
};

export default CustomCalendar;
