import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { MyTaskHeaderProps } from "./mttaskheader";
import { Center } from "@/components/ui/center";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { Flex } from "@/components/ui/flex";
import { useForm } from "react-hook-form";
import { Box } from "@/components/ui/box";
import { ArrowLeft } from "lucide-react";
import { FC, useCallback } from "react";
import { z } from "zod";

const formSchema = z.object({
  taskname: z.string().min(2, {
    message: "task name must be at least 2 characters.",
  }),
  date: z.string().min(2, {
    message: "date must be insert.",
  }),
  issueDescription: z.string().min(1, {
    message: "issue descriptionn must be at least 20 characters.",
  }),
  resolvedby: z.string().min(1, {
    message: "resolved by date must be inserted.",
  }),
});

export const CreateIssue: FC<MyTaskHeaderProps> = ({ previous }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskname: "",
      date: "",
      resolvedby: "",
      issueDescription: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);

  const { getInputProps, open } = useDropzone({
    maxFiles: 1,
    onDrop,
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          <Box className="bg-white/80 rounded-xl border border-gray-300 p-6 gap-6 grid grid-cols-1">
            <Box className="gap-6 grid grid-cols-2 max-md:grid-cols-1 ">
              <FormField
                control={form.control}
                name="taskname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white w-full"
                        size="lg"
                        type="text"
                        placeholder="Enter Task Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white w-full"
                        size="lg"
                        type="date"
                        placeholder="Enter Issue Date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            <FormField
              control={form.control}
              name="issueDescription"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Issue Description </FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-white w-full"
                      placeholder="Enter Issue Description."
                      id="message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Box className="grid grid-cols-2 max-sm:grid-cols-1">
              <FormField
                control={form.control}
                name="resolvedby"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resolved by</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        size="lg"
                        type="date"
                        placeholder="Enter Resolved by Date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            <Box className="grid grid-cols-2 max-sm:grid-cols-1" onClick={open}>
              <Center className="border-dashed border-2 border-black bg-gray-300/50 rounded-lg min-h-60 w-full ">
                <Box className="text-center">
                  <Flex>
                    <p className="underline">
                      Click to upload <strong>PDF</strong>
                    </p>
                    <span>of</span>
                    <br />
                  </Flex>
                  Overall Project Schedule
                </Box>
              </Center>
              <input {...getInputProps()} />
            </Box>
          </Box>

          <Center className="justify-end mt-6 gap-4">
            <Button
              onClick={previous}
              className="w-24 h-10 bg-white text-black cursor-pointer"
              variant={"outline"}
              type="button"
            >
              <ArrowLeft />
            </Button>
            <Button className="w-36 h-10" type="submit">
              Create Projects
            </Button>
          </Center>
        </form>
      </Form>
    </>
  );
};
