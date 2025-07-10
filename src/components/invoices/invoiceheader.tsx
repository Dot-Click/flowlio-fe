import { FC } from "react";
import { PageWrapper } from "../common/pagewrapper";
import { Center } from "../ui/center";
import { Stack } from "../ui/stack";
import { InvoiceTable } from "./invoicetable";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export const InvoiceHeader: FC = () => {
  return (
    <PageWrapper className="mt-6">
      <Center className="justify-between px-4 py-6 max-sm:flex-col max-sm:items-start gap-2">
        <Stack className="gap-1">
          <h1 className="text-black text-2xl max-sm:text-xl font-medium">
            Invoices
          </h1>
          <h1 className={`max-sm:text-sm max-w-[600px] text-gray-500`}>
            View and Download All Generated Invoices with Ease
          </h1>
        </Stack>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Center className="bg-black text-white cursor-pointer hover:bg-black/80 hover:text-white rounded-full w-36 h-10 justify-between items-center">
              <h1 className="text-[14px] px-4">Export</h1>
              <Center className="bg-[#3e3e3f] rounded-tr-full rounded-br-full h-10 w-10">
                <ChevronDown className="size-4" />
              </Center>
            </Center>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="p-1">
            <DropdownMenuCheckboxItem className="p-2 cursor-pointer">
              Export Selected
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="p-2 cursor-pointer">
              Export Current Page
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Center>

      <InvoiceTable />
    </PageWrapper>
  );
};
