import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { DialogClose, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { X, Upload, FileVideo, ImageIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { Stack } from "../ui/stack";
import { Input } from "../ui/input";
import { Flex } from "../ui/flex";
import { Box } from "../ui/box";
import * as z from "zod";

const schema = z.object({
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  files: z
    .array(
      z.object({
        file: z.instanceof(File),
        preview: z.string(),
      })
    )
    .optional(),
});

type NotificationFormProps = {
  onClose: () => void;
  onSubmit: (values: z.infer<typeof schema>) => void;
};

export const NotificationForm = ({
  onClose,
  onSubmit,
}: NotificationFormProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: "",
      message: "",
      files: [],
    },
  });

  const handleSubmit = (values: z.infer<typeof schema>) => {
    onSubmit(values);
    form.reset();
    onClose();
  };

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;

      const files = Array.from(e.target.files).filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("video/")
      );

      const newFiles = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      const currentFiles = form.getValues("files") || [];
      form.setValue("files", [...currentFiles, ...newFiles]);

      // Reset input value to allow selecting the same file again
      e.target.value = "";
    },
    [form]
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const files = Array.from(e.dataTransfer.files).filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("video/")
      );

      const newFiles = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      const currentFiles = form.getValues("files") || [];
      form.setValue("files", [...currentFiles, ...newFiles]);
    },
    [form]
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <Stack className="gap-4">
      <DialogTitle>Send Mass Notification</DialogTitle>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Flex className="gap-6 max-lg:flex-col">
            {/* Left side - Form Fields */}
            <Box className="flex-1 min-w-[25vw] max-lg:w-full space-y-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter notification subject..."
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter your notification message..."
                        className="min-h-[200px] bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            {/* Right side - File Upload */}
            <Box className="w-[300px] max-lg:w-full">
              <Box
                onDrop={onDrop}
                onDragOver={onDragOver}
                className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 max-lg:p-3 text-center hover:border-gray-400 transition-colors cursor-pointer group"
              >
                <Input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <Upload className="w-7 h-7 mx-auto mb-3 text-gray-400 group-hover:text-gray-500 max-lg:hidden" />
                <Stack className="gap-1">
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 max-lg:hidden">
                    Images and videos
                  </p>
                </Stack>
              </Box>

              <FormField
                control={form.control}
                name="files"
                render={({ field }) => (
                  <FormItem>
                    {field.value && field.value.length > 0 && (
                      <Stack className="gap-3 mt-4">
                        <Flex className="items-center justify-between p-3 bg-slate-100 rounded-lg">
                          <Flex className="items-center gap-6">
                            <Flex className="items-center gap-2">
                              <Box className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center">
                                <ImageIcon className="w-4 h-4 text-slate-600" />
                              </Box>
                              <Box>
                                <span className="text-sm font-medium text-gray-700">
                                  {
                                    field.value.filter((f) =>
                                      f.file.type.startsWith("image/")
                                    ).length
                                  }{" "}
                                  Images
                                </span>
                              </Box>
                            </Flex>
                            <Flex className="items-center gap-2">
                              <Box className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center">
                                <FileVideo className="w-4 h-4 text-slate-600" />
                              </Box>
                              <Box>
                                <span className="text-sm font-medium text-slate-700">
                                  {
                                    field.value.filter((f) =>
                                      f.file.type.startsWith("video/")
                                    ).length
                                  }{" "}
                                  Videos
                                </span>
                              </Box>
                            </Flex>
                          </Flex>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500 hover:text-gray-700"
                            onClick={() => {
                              field.value?.forEach((file) => {
                                URL.revokeObjectURL(file.preview);
                              });
                              form.setValue("files", []);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </Flex>
                      </Stack>
                    )}
                  </FormItem>
                )}
              />
            </Box>
          </Flex>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Send Notification
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Stack>
  );
};
