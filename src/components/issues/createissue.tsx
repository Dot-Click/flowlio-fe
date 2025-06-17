import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";
import { FC, useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { IssuesHeaderProps } from "./issuesheader";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { Flex } from "@/components/ui/flex";
import { useForm } from "react-hook-form";
import { Box } from "@/components/ui/box";
import { ArrowLeft } from "lucide-react";
import { Stack } from "../ui/stack";
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

export const CreateIssue: FC<IssuesHeaderProps> = ({ previous }) => {
  const [preview, setPreview] = useState<string | null>(null);

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
    console.log(values, { image: preview });
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      console.log(file);
    }
  }, []);

  const { getInputProps, open } = useDropzone({
    maxFiles: 1,
    accept: { "image/*": [] }, // Accept only image files
    onDrop,
  });

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          <Box className="bg-white/80 rounded-xl border border-gray-300 p-6 gap-6 grid grid-cols-1">
            <Box className="gap-6 grid grid-cols-2 max-md:grid-cols-1">
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
                  <FormLabel>Issue Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-white w-full"
                      placeholder="Enter Description."
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
                    <FormLabel>Resolve By</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        size="lg"
                        type="date"
                        placeholder="Enter Resolve By Date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            <Box className="grid grid-cols-2 max-sm:grid-cols-1" onClick={open}>
              <Center className="border-dashed border-2 border-black bg-gray-300/50 rounded-lg min-h-60 w-full">
                {preview ? (
                  <img
                    src={preview}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover rounded-lg p-2"
                  />
                ) : (
                  <Stack className="justify-center items-center text-center gap-0">
                    <img src="/general/imgicon.png" alt="Image" />
                    <Flex>
                      <p className="underline font-bold">Click to upload</p>
                      image
                      <br />
                    </Flex>
                    of your task
                  </Stack>
                )}
              </Center>
              <input {...getInputProps()} />
            </Box>
          </Box>

          <Center className="justify-end mt-6 gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={previous}
                    className="w-24 h-10 bg-white text-black cursor-pointer"
                    variant={"outline"}
                    type="button"
                  >
                    <ArrowLeft />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="mb-2">
                  <p>Go Back to Issues Table</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button className="w-36 h-10" type="submit">
              Submit
            </Button>
          </Center>
        </form>
      </Form>
    </>
  );
};
