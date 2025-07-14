import { FC } from "react";
import { PageWrapper } from "@/components/common/pagewrapper";
import { Center } from "@/components/ui/center";
import { Stack } from "@/components/ui/stack";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import {
  GeneralModal,
  useGeneralModalDisclosure,
} from "@/components/common/generalmodal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@/components/ui/box";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "@/components/ui/form"; // or "@/components/ui/form"
import { useForm } from "react-hook-form";
import { SupportTicketTable } from "./supportticketstable";
import { Flex } from "@/components/ui/flex";

const formSchema = z.object({
  agent: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  priority: z.string().min(2, {
    message: "Must be amount number.",
  }),
});

export const SupportTicketsHeader: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agent: "",
      priority: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const modalProps = useGeneralModalDisclosure();

  return (
    <PageWrapper className="mt-6">
      <Center className="justify-between px-4 py-6 max-sm:flex-col max-sm:items-start gap-2">
        <Stack className="gap-1">
          <h1 className="text-black text-2xl max-sm:text-xl font-medium">
            Support Tickets
          </h1>
          <h1 className={`max-sm:text-sm max-w-[600px] text-gray-500`}>
            Manage and resolve customer issues quickly and efficiently.
          </h1>
        </Stack>

        <Button
          onClick={() => modalProps.onOpenChange(true)}
          variant="outline"
          className="bg-black text-white border border-gray-200  rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer"
        >
          <CirclePlus className="fill-white text-black size-5" />
          Create New Ticket
        </Button>
      </Center>

      <SupportTicketTable />

      <GeneralModal {...modalProps}>
        <h2 className="text-lg font-normal mb-4">Assign Ticket</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Box className="bg-white/80 gap-6 grid grid-cols-1">
              <FormField
                control={form.control}
                name="agent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full h-12">
                        <SelectTrigger
                          size="lg"
                          className="bg-gray-100 border border-gray-200 rounded-full w-full h-12 placeholder:text-gray-100"
                        >
                          <SelectValue placeholder="Select Agent" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        <SelectItem value="agent1">Agent 1</SelectItem>
                        <SelectItem value="agent2">Agent 2</SelectItem>
                        <SelectItem value="agent3">Agent 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full h-12">
                        <SelectTrigger
                          size="lg"
                          className="bg-gray-100 border border-gray-200 rounded-full w-full h-12 placeholder:text-gray-100"
                        >
                          <SelectValue placeholder="Select Priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        <SelectItem value="priority1">Priority 1</SelectItem>
                        <SelectItem value="priority2">Priority 2</SelectItem>
                        <SelectItem value="priority3">Priority 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Flex className="justify-end ">
                <Button
                  variant="outline"
                  className="bg-[#1797b9]/30 hover:bg-[#1797b9]/80 hover:text-white text-black border border-gray-200 font-normal rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer"
                  type="submit"
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  className="bg-[#1797b9] hover:bg-[#1797b9]/80 hover:text-white text-white border border-gray-200 rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer"
                  type="submit"
                >
                  Assign
                </Button>
              </Flex>
            </Box>
          </form>
        </Form>
      </GeneralModal>
    </PageWrapper>
  );
};
