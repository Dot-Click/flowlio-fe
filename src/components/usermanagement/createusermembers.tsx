import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Center } from "../ui/center";
import { Input } from "../ui/input";
import "./phonenumberstyle.css";
import { Box } from "../ui/box";
import { z } from "zod";
import { PageWrapper } from "../common/pagewrapper";
import { useNavigate } from "react-router";
import { IoArrowBack } from "react-icons/io5";
import { Stack } from "../ui/stack";

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Must be Email Address.",
  }),
  phonenumber: z.string().refine((val) => !Number.isNaN(parseInt(val, 8)), {
    message: "Must be proper phone number",
  }),
});

export const CreateUserMembers = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  console.log(uploadedFile);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type) {
      setUploadedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPdfPreview(fileUrl);
    }
  }, []);

  const { getInputProps, open } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
      "image/svg": [".svg"],
      "image/bmp": [".bmp"],
    },
    onDrop,
  });

  const navigate = useNavigate();
  return (
    <PageWrapper className="mt-6 p-6">
      <Box
        className="flex items-center gap-2 w-20 cursor-pointer transition-all duration-300  hover:bg-gray-200 rounded-full hover:p-2 "
        onClick={() => navigate(-1)}
      >
        <IoArrowBack />
        <p className="text-black">Back</p>
      </Box>

      <Center className="justify-between mt-4">
        <Stack className="gap-0">
          <h1 className="text-black text-xl font-medium">Add Members</h1>
          <h1 className="text-gray-500">
            Fill in the details to create a new project
          </h1>
        </Stack>

        <Button
          variant="outline"
          className="bg-black text-white border border-gray-200 rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("#")}
        >
          Save Member
        </Button>
      </Center>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          <Box className="bg-white/80 rounded-xl border border-gray-200 p-6 gap-6 grid grid-cols-1">
            <Stack className="gap-0">
              <h1 className="text-gray-500">Step 1</h1>
              <h1 className="text-black text-xl font-medium">
                Personal Information
              </h1>
            </Stack>

            {!pdfPreview ? (
              <Box className="grid grid-cols-1">
                <p className="text-md mb-2 font-normal">
                  Upload Profile Picture
                </p>
                <Center
                  className="flex-col border-dashed border-2 border-[#62A1C0] bg-gray-100/50 rounded-lg min-h-40 w-44 max-md:w-full cursor-pointer"
                  onClick={open}
                >
                  <img
                    src="/dashboard/camera.svg"
                    alt="task-image"
                    className="size-14"
                  />
                  <Stack className="text-center gap-0 mt-4">
                    <p className="text-gray-800 text-sm font-medium">
                      Image must be
                    </p>
                    <p className="text-gray-800 text-sm font-medium">
                      500px by 500px
                    </p>
                  </Stack>
                </Center>
                <input {...getInputProps()} />
              </Box>
            ) : (
              <Box className="border-2 border-[#62A1C0] rounded-lg p-4 relative w-50 h-50">
                <Stack className="gap-2">
                  <Box className="flex w-full absolute top-0 right-0 p-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setUploadedFile(null);
                        setPdfPreview(null);
                      }}
                    >
                      X
                    </Button>
                  </Box>
                  {pdfPreview && (
                    <Box className="w-40 h-40 border-dashed border-gray-200 rounded">
                      <img
                        src={pdfPreview}
                        title="PDF Preview"
                        className="  object-contain w-full h-full    "
                        style={{ border: "none" }}
                        onError={(e) => {
                          console.error("PDF preview failed to load:", e);
                        }}
                      />
                    </Box>
                  )}
                </Stack>
              </Box>
            )}

            <Box className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name:</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="xl"
                        type="text"
                        placeholder="Enter First Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name:</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-md placeholder:text-gray-400"
                        size="xl"
                        type="text"
                        placeholder="Enter Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address:</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="xl"
                        type="email"
                        placeholder="Enter Email Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phonenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneInput
                        specialLabel="Phone Number"
                        country={"us"}
                        placeholder="Phone Number:"
                        enableSearch={true}
                        inputClass="mt-2 w-full h-14 bg-white border border-gray-300 rounded-full px-4 text-black focus:ring-0 focus:outline-none"
                        buttonClass="border-r h-12 border-gray-300 bg-transparent"
                        dropdownClass="bg-white border border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>
          </Box>
        </form>
      </Form>
    </PageWrapper>
  );
};
