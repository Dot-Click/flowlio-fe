import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RiSearch2Line } from "react-icons/ri";
import { Stack } from "@/components/ui/stack";
import { Input } from "@/components/ui/input";

export const SearchBox: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full h-[2.5rem] text-gray-500 hover:bg-white! hover:text-gray-500"
        >
          <span className="max-md:hidden">Search...</span>
          <RiSearch2Line />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] top-20" withoutCloseButton>
        <Stack className={className}>
          <Input placeholder="Search..." className="bg-white min-h-10" />
          {/* Search Results */}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
