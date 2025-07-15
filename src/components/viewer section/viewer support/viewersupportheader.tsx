import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Stack } from "@/components/ui/stack";
import {
  GeneralModal,
  useGeneralModalDisclosure,
} from "@/components/common/generalmodal";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Form } from "@/components/ui/form"; // or "@/components/ui/form"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  clientname: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Must be proper description",
  }),
});

export const ViewerSupportHeader = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientname: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const modalProps = useGeneralModalDisclosure();

  return (
    <ComponentWrapper className="mt-6 p-5 shadow-none">
      <Flex className="justify-between max-md:flex-col max-md:items-start">
        <Box>
          <h1 className="text-2xl font-medium capitalize">
            Support & Create Your Ticket
          </h1>
          <p className="text-gray-500 mt-1 max-md:text-sm">
            Need assistance? Create support ticket and our teams will get back
            to you promptly.
          </p>
        </Box>
      </Flex>

      <Flex className="justify-between max-md:flex-col max-md:items-start bg-white rounded-none bg-transparent border-b-2 border-gray-200 py-8 mt-10">
        <Box>
          <h1 className="text-md font-medium capitalize">Your Ticket</h1>
          <p className="text-gray-500 mt-0 max-md:text-sm">
            You have no ticket yet! Create one by hitting the
            <span className="underline text-[#1797b9]"> Create Button</span>
          </p>
        </Box>

        <Button
          variant="outline"
          className="bg-black text-white border border-gray-200  rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer h-11"
          onClick={() => modalProps.onOpenChange(true)}
        >
          Create Ticket
        </Button>
      </Flex>

      <Flex className="justify-between max-md:flex-col max-md:items-start bg-transparent py-8">
        <Box>
          <h1 className="text-md font-medium capitalize">
            Your Ticket Notification
          </h1>
          <p className="text-gray-500 max-md:text-sm">
            Oops sorry. There are notification to show
          </p>
        </Box>

        <p className="text-red-500 max-md:text-sm underline">
          Clear All Notifications
        </p>
      </Flex>

      <Flex className="flex-col items-start bg-transparent w-full mt-5">
        <Box>
          <h1 className="text-lg font-medium capitalize">Recent Tickets</h1>
        </Box>

        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-0"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="cursor-pointer">
              <Stack>
                <h1 className="font-normal hover:underline text-[18px]">
                  Issue with project visibility for client XYZ
                </h1>
                <p className="text-[#797979] text-sm font-normal">
                  Posted on 24 June 2026
                </p>
              </Stack>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </p>
              <p>
                Key features include advanced processing capabilities, and an
                intuitive user interface designed for both beginners and
                experts.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="cursor-pointer">
              <Stack>
                <h1 className="font-normal hover:underline text-[18px]">
                  Issue with project visibility for client XYZ
                </h1>
                <p className="text-[#797979] text-sm font-normal">
                  Posted on 24 June 2026
                </p>
              </Stack>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </p>
              <p>
                Key features include advanced processing capabilities, and an
                intuitive user interface designed for both beginners and
                experts.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="cursor-pointer">
              <Stack>
                <h1 className="font-normal hover:underline text-[18px]">
                  Issue with project visibility for client XYZ
                </h1>
                <p className="text-[#797979] text-sm font-normal">
                  Posted on 24 June 2026
                </p>
              </Stack>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </p>
              <p>
                Key features include advanced processing capabilities, and an
                intuitive user interface designed for both beginners and
                experts.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Flex>

      <GeneralModal {...modalProps}>
        <h2 className="text-lg font-normal mb-4">Create Ticket</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Box className="bg-white/80 gap-4 grid grid-cols-1">
              <FormField
                control={form.control}
                name="clientname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="lg"
                        type="text"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        className="bg-white rounded-md placeholder:text-gray-400"
                        maxLength={100}
                        placeholder="Enter your description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="outline"
                className="bg-[#1797b9] hover:bg-[#1797b9]/80 hover:text-white text-white border border-gray-200 rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer"
                type="submit"
              >
                Create
              </Button>
            </Box>
          </form>
        </Form>
      </GeneralModal>
    </ComponentWrapper>
  );
};
