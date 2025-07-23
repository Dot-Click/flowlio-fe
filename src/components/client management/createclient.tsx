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
import "../usermanagement/phonenumberstyle.css";
import { Box } from "../ui/box";
import { z } from "zod";
import { PageWrapper } from "../common/pagewrapper";
import { useNavigate } from "react-router";
import { IoArrowBack } from "react-icons/io5";
import { Stack } from "../ui/stack";

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Must be Email Address.",
  }),
  phonenumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Must be a valid international phone number",
  }),
  cpfcnpj: z.string().min(2, {
    message: "Must be a valid CPF/CNPJ",
  }),
  address: z.string().min(2, {
    message: "Must be a valid address",
  }),
  industry: z.string().min(2, {
    message: "Must be a valid industry",
  }),
});

export const CreateClient = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phonenumber: "",
      cpfcnpj: "",
      address: "",
      industry: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!uploadedFile) {
      setImageError("Please upload a profile image.");
      return;
    }
    setImageError("");
    console.log({ ...values, profileImage: uploadedFile });
    // Submit logic here
  }
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Only allow images and check size
      if (!file.type.startsWith("image/")) {
        setImageError("Only image files are allowed.");
        setUploadedFile(null);
        setPdfPreview(null);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setImageError("Image size must be less than 2MB.");
        setUploadedFile(null);
        setPdfPreview(null);
        return;
      }
      setUploadedFile(file);
      setImageError("");
      const fileUrl = URL.createObjectURL(file);
      setPdfPreview(fileUrl);
    }
  }, []);

  const { getInputProps, open } = useDropzone({
    maxFiles: 1,
    accept: {
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

  return (
    <PageWrapper className="mt-6 p-6 relative">
      <Box
        className="flex items-center gap-2 w-20 cursor-pointer transition-all duration-300  hover:bg-gray-200 rounded-full hover:p-2 "
        onClick={() => navigate(-1)}
      >
        <IoArrowBack />
        <p className="text-black">Back</p>
      </Box>

      <Center className="justify-between mt-4">
        <Stack className="gap-0">
          <h1 className="text-black text-xl font-medium">Add New Client</h1>
          <h1 className="text-gray-500">
            Fill in the details to create a new client
          </h1>
        </Stack>
      </Center>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          <Button
            variant="outline"
            className="bg-black text-white border border-gray-200 rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer mb-6 absolute top-15 right-5"
            type="submit"
          >
            Save Client
          </Button>
          <Box className="bg-white/80 rounded-xl border border-gray-200 p-6 gap-6 grid grid-cols-1">
            <Stack className="gap-0">
              <h1 className="text-black text-xl font-medium">Client Details</h1>
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
                {imageError && (
                  <p className="text-red-500 text-sm mt-2">{imageError}</p>
                )}
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
                        setImageError("");
                      }}
                    >
                      X
                    </Button>
                  </Box>
                  {pdfPreview && (
                    <Box className="w-40 h-40 border-dashed border-gray-200 rounded">
                      <img
                        src={pdfPreview}
                        title="Profile Preview"
                        className="object-contain w-full h-full"
                        style={{ border: "none" }}
                        onError={() => {
                          setImageError("Image preview failed to load.");
                        }}
                      />
                    </Box>
                  )}
                  {imageError && (
                    <p className="text-red-500 text-sm mt-2">{imageError}</p>
                  )}
                </Stack>
              </Box>
            )}

            <Box className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name:</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="xl"
                        type="text"
                        placeholder="Enter Full Name"
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
                        specialLabel="Phone Number:"
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

              <FormField
                control={form.control}
                name="cpfcnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF/CNPJ:</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="xl"
                        type="number"
                        placeholder="Enter CPF/CNPJ"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address:</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="xl"
                        type="text"
                        placeholder="Enter Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Industry:</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="xl"
                        type="text"
                        placeholder="Enter Industry"
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
