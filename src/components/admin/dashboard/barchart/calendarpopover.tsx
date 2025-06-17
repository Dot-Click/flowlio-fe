import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { CalendarArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { addDays, format } from "date-fns";
import { useState } from "react";

export const CalendarPopOver = () => {
  const [selected, onSelect] = useState<DateRange>({
    from: addDays(new Date(), -2),
    to: addDays(new Date(), 2),
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="ml-auto hidden max-[950px]:flex"
        >
          <CalendarArrowDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left" className="min-w-fit min-[950px]:hidden">
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
