import React, { useState } from "react";
import { getStartOfWeek, CustomEvent } from "./calendarUtils";
import {
  GeneralModal,
  GeneralModalReturnTypeProps,
} from "../common/generalmodal";

interface EventModalProps {
  modalProps: GeneralModalReturnTypeProps;
  onSave: (e: CustomEvent) => void;
  onClose: () => void;
  eventToEdit?: CustomEvent | null;
}

const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23 (24 hours)
function formatHour(hour: number) {
  const h = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour < 12 ? "AM" : "PM";
  return `${h} ${ampm}`;
}

export const EventModal: React.FC<EventModalProps> = ({
  onSave,
  onClose,
  eventToEdit,
  modalProps,
}) => {
  const [title, setTitle] = useState(eventToEdit?.title || "");
  const [date, setDate] = useState<Date | null>(
    eventToEdit ? new Date(eventToEdit.date) : new Date()
  );
  const [startHour, setStartHour] = useState(eventToEdit?.startHour ?? 8);
  const [endHour, setEndHour] = useState(eventToEdit?.endHour ?? 9);
  const [calendarType, setCalendarType] = useState<
    "work" | "education" | "personal"
  >(eventToEdit?.calendarType || "work");
  const [platform, setPlatform] = useState<
    "google_meet" | "whatsapp" | "outlook" | "none"
  >(eventToEdit?.platform || "none");
  const [meetLink, setMeetLink] = useState(eventToEdit?.meetLink || "");
  const isValid = startHour < endHour && !!date;

  return (
    // <GeneralModal className="fixed top-0 left-0 w-screen h-screen bg-transparent bg-opacity-10 flex
    // items-center justify-center z-50">
    <GeneralModal {...modalProps} contentProps={{ className: "p-0" }}>
      <form
        className="bg-white p-6 rounded-xl min-w-[340px] shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          if (!isValid || !date) return;
          const weekStart = getStartOfWeek(date).toISOString();
          onSave({
            title,
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
        <h3 className="mb-4 font-bold text-[20px]">
          {eventToEdit ? "Edit Event" : "Create New Event"}
        </h3>
        <div className="mb-3.5">
          <label className="font-medium text-sm">Event Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder="Event Title"
            required
            className="w-full p-2 mt-1 rounded-md border border-gray-200"
          />
        </div>
        <div className="mb-3.5">
          <label className="font-medium text-sm">Date</label>
          <input
            type="date"
            value={date?.toISOString().split("T")[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            className="w-full p-2 mt-1 rounded-md border border-gray-200"
          />
        </div>
        <div className="mb-3.5">
          <label className="font-medium text-sm">Calendar</label>
          <div className="flex gap-3 mt-1">
            <button
              type="button"
              onClick={() => setCalendarType("work")}
              className={`flex items-center gap-1.5 border-none rounded-md px-3 py-1.5 cursor-pointer font-medium ${
                calendarType === "work" ? "bg-cyan-100" : "bg-gray-100"
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-green-300 inline-block"></span>{" "}
              Work
            </button>
            <button
              type="button"
              onClick={() => setCalendarType("education")}
              className={`flex items-center gap-1.5 border-none rounded-md px-3 py-1.5 cursor-pointer font-medium ${
                calendarType === "education" ? "bg-indigo-100" : "bg-gray-100"
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-indigo-400 inline-block"></span>{" "}
              Education
            </button>
            <button
              type="button"
              onClick={() => setCalendarType("personal")}
              className={`flex items-center gap-1.5 border-none rounded-md px-3 py-1.5 cursor-pointer font-medium ${
                calendarType === "personal" ? "bg-pink-100" : "bg-gray-100"
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-pink-400 inline-block"></span>{" "}
              Personal
            </button>
          </div>
        </div>
        <div className="mb-3.5">
          <label className="font-medium text-sm">Time</label>
          <div className="flex gap-2 mt-1">
            <select
              value={startHour}
              onChange={(e) => setStartHour(Number(e.target.value))}
              className="w-1/2 p-2 rounded-md border border-gray-200"
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
              className="w-1/2 p-2 rounded-md border border-gray-200"
            >
              {hours.map((h) => (
                <option value={h} key={h}>
                  {formatHour(h)}
                </option>
              ))}
            </select>
          </div>
          {!isValid && (
            <div className="text-red-500 mt-1 text-xs">
              End time must be after start time.
            </div>
          )}
        </div>
        <div className="mb-3.5">
          <label className="font-medium text-sm">Platform</label>
          <div className="flex gap-3 mt-1">
            <button
              type="button"
              onClick={() => setPlatform("google_meet")}
              className={`flex items-center gap-1.5 border-none rounded-md px-3 py-1.5 cursor-pointer font-medium ${
                platform === "google_meet" ? "bg-cyan-100" : "bg-gray-100"
              }`}
            >
              <img
                src="/dashboard/camera.svg"
                alt="Google Meet"
                className="w-[18px] h-[18px]"
              />{" "}
              Google Meet
            </button>
            <button
              type="button"
              onClick={() => setPlatform("whatsapp")}
              className={`flex items-center gap-1.5 border-none rounded-md px-3 py-1.5 cursor-pointer font-medium ${
                platform === "whatsapp" ? "bg-cyan-100" : "bg-gray-100"
              }`}
            >
              <img
                src="/sidebar/ai assist.svg"
                alt="WhatsApp"
                className="w-[18px] h-[18px]"
              />{" "}
              WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setPlatform("outlook")}
              className={`flex items-center gap-1.5 border-none rounded-md px-3 py-1.5 cursor-pointer font-medium ${
                platform === "outlook" ? "bg-cyan-100" : "bg-gray-100"
              }`}
            >
              <img
                src="/dashboard/stat.svg"
                alt="Outlook"
                className="w-[18px] h-[18px]"
              />{" "}
              Outlook
            </button>
          </div>
          {platform === "google_meet" && (
            <div className="mt-2">
              <input
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                name="meetLink"
                placeholder="Google Meet Link"
                required={platform === "google_meet"}
                className="w-full p-2 rounded-md border border-gray-200"
              />
            </div>
          )}
        </div>
        <div className="flex gap-2 justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-200 bg-gray-100 font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 rounded-md font-semibold text-white border-none ${
              isValid
                ? "bg-blue-600 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isValid}
          >
            {eventToEdit ? "Save" : "Create"}
          </button>
        </div>
      </form>
    </GeneralModal>
  );
};
