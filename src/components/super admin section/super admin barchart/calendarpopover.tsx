import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { CalendarIcon } from "@/components/customeIcons";

export const SuperAdminCalendarPopOver = () => {
  const [selected, onSelect] = useState<DateRange>({
    from: addDays(new Date(), -2),
    to: addDays(new Date(), 2),
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="border border-gray-100 max-md:ml-auto"
        >
          <CalendarIcon className="fill-[#1797B9]" fill="#1797B9" />
          Yearly
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="max-w-full">
        <Calendar
          mode="range"
          selected={selected}
          onSelect={(r) => r && onSelect(r)}
        />
        <Flex className="mt-3 justify-center gap-2 bg-muted px-3 py-1 rounded-sm text-sm font-medium text-primary">
          <span className="text-muted-foreground">
            {format(selected.from!, "dd LLL")}
          </span>
          <span className="text-accent-foreground">/</span>
          <span className="text-muted-foreground">
            {format(selected.to!, "dd LLL")}
          </span>
        </Flex>
        <Flex>
          <Button className="flex-1 mt-5" variant="outline">
            Reset
          </Button>
          <Button className="flex-1 mt-5">Apply Filter</Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
};
