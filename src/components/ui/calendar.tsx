import type { CustomComponents, DayPickerProps } from "react-day-picker";
import { DayPicker, useDayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { format } from "date-fns";
import { type FC } from "react";
import { Flex } from "./flex";
import "../../calendar.css";

export type CalendarProps = CustomComponents["Nav"];

const Nav: CalendarProps = ({ onNextClick, onPreviousClick }) => {
  const { months } = useDayPicker();
  const year = format(months[0].date, "yyyy");
  const month = format(months[0].date, "LLL");

  return (
    <Flex className="justify-between w-full mb-5">
      <Button
        variant="outline"
        onClick={onPreviousClick}
        size="icon"
        className="size-8"
      >
        <ChevronLeft />
      </Button>
      <p className="space-x-1">
        <span>{month}</span>
        <span>{year}</span>
      </p>
      <Button
        variant="outline"
        onClick={onNextClick}
        size="icon"
        className="size-8"
      >
        <ChevronRight />
      </Button>
    </Flex>
  );
};

const Calendar: FC<DayPickerProps> = ({ ...props }) => {
  return (
    <>
      <DayPicker
        showOutsideDays
        components={{ Nav }}
        classNames={{
          outside: "text-primary/30",
          selected: "text-sm",
          day: "text-sm",
        }}
        {...props}
      />
    </>
  );
};

export { Calendar };
