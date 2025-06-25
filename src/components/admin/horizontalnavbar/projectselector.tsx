import {
  Select,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const ProjectSelector: React.FC<{
  selectTriggerClassname?: string;
}> = ({ selectTriggerClassname }) => {
  return (
    <Select>
      <SelectTrigger
        className={cn(
          "rounded-full min-h-10 border border-gray-200",
          selectTriggerClassname
        )}
      >
        <SelectValue placeholder="Select Project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Project</SelectLabel>
          {[
            "project 1",
            "project 2",
            "project 3",
            "project 4",
            "project 5",
          ].map((p, key) => (
            <SelectItem key={key} value={p}>
              {p}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
