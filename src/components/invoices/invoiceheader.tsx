import { FC } from "react";
import { PageWrapper } from "../common/pagewrapper";
import { Center } from "../ui/center";
import { Stack } from "../ui/stack";
import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";

export const InvoiceHeader: FC = () => {
  return (
    <PageWrapper className="mt-6">
      <Center className="justify-between px-4 py-6">
        <Stack className="gap-1">
          <h1 className="text-black text-2xl max-sm:text-xl font-medium">
            Payment Links
          </h1>
          <h1 className={`max-sm:text-sm max-w-[600px] text-gray-500`}>
            Simplify Transactions with Instant Payment Links
          </h1>
        </Stack>

        <Button
          variant="outline"
          className="bg-black text-white border border-gray-200  rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer"
        >
          <CirclePlus className="fill-white text-black size-5" />
          Create Links
        </Button>
      </Center>

      <h1>table here</h1>
    </PageWrapper>
  );
};
