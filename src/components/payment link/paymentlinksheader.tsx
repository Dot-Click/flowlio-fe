import { FC } from "react";
import { PageWrapper } from "../common/pagewrapper";
import { PaymentLinksTable } from "./paymentlinkstable";
import { Center } from "../ui/center";
import { Stack } from "../ui/stack";
import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";
import {
  GeneralModal,
  useGeneralModalDisclosure,
} from "../common/generalmodal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "../ui/box";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Form } from "../ui/form"; // or "@/components/ui/form"
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  clientname: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  projects: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  amount: z.string().min(2, {
    message: "Must be amount number.",
  }),
  description: z.string().min(2, {
    message: "Must be proper description",
  }),
});
const PaymentLinksHeader: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientname: "",
      projects: "",
      amount: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const modalProps = useGeneralModalDisclosure();

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
          onClick={() => modalProps.onOpenChange(true)}
          variant="outline"
          className="bg-black text-white border border-gray-200  rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer"
        >
          <CirclePlus className="fill-white text-black size-5" />
          Create Links
        </Button>
      </Center>

      <PaymentLinksTable />

      <GeneralModal {...modalProps}>
        <h2 className="text-lg font-normal mb-4">Create Payment Link</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Box className="bg-white/80 gap-4 grid grid-cols-1">
              <FormField
                control={form.control}
                name="clientname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full h-12">
                        <SelectTrigger
                          size="lg"
                          className="bg-gray-100 border border-gray-200 rounded-full w-full h-12 placeholder:text-gray-100"
                        >
                          <SelectValue placeholder="Select Client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        <SelectItem value="client1">Client 1</SelectItem>
                        <SelectItem value="client2">Client 2</SelectItem>
                        <SelectItem value="client3">Client 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full h-12">
                        <SelectTrigger
                          size="lg"
                          className="bg-gray-100 border border-gray-200 rounded-full w-full h-12 placeholder:text-gray-100"
                        >
                          <SelectValue placeholder="Select Project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        <SelectItem value="project1">Project 1</SelectItem>
                        <SelectItem value="project2">Project 2</SelectItem>
                        <SelectItem value="project3">Project 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="lg"
                        type="number"
                        placeholder="$ 0"
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
                        className="bg-white rounded-xl placeholder:text-gray-400 h-32"
                        rows={4}
                        cols={50}
                        placeholder="Briefly describe the purpose of this payment link"
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
                Save
              </Button>
            </Box>
          </form>
        </Form>
      </GeneralModal>
    </PageWrapper>
  );
};

export { PaymentLinksHeader };
