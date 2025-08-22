import { IoArrowBack } from "react-icons/io5";
import { PageWrapper } from "../common/pagewrapper";
import { Box } from "../ui/box";
import { useNavigate } from "react-router";
import { Center } from "../ui/center";
import { Stack } from "../ui/stack";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "../customeIcons";
import { useCreateProject } from "../../hooks/usecreateproject";
import { useFetchClients } from "../../hooks/usefetchclients";
import { useFetchOrganizationUsers } from "../../hooks/usefetchorganizationusers";
import { useFetchAllOrganizations } from "../../hooks/usefetchallorganizations";
import { useUser } from "../../providers/user.provider";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Project Name must be at least 2 characters.",
  }),
  projectNumber: z.string().min(1, {
    message: "Project Number is required.",
  }),
  clientId: z.string().min(1, {
    message: "Please select a client.",
  }),
  startDate: z.string().min(1, {
    message: "Start Date is required.",
  }),
  endDate: z.string().min(1, {
    message: "End Date is required.",
  }),
  assignedTo: z.string().min(1, {
    message: "Please select a team member to assign.",
  }),
  description: z.string().optional(),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  contractfile: z.string().optional(),
});

export const CreateProject = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);

  // Get user authentication data
  const { data: userData, isLoading: isLoadingUser } = useUser();

  // Get user's organization data
  const {
    data: userOrgData,
    isLoading: isLoadingUserOrg,
    error: userOrgError,
  } = useFetchAllOrganizations();

  // Use the custom hooks
  const {
    mutate: createProject,
    isPending: isLoading,
    error,
    isSuccess: success,
  } = useCreateProject();

  // Fetch clients and users for dropdowns
  const { data: clientsData, isLoading: isLoadingClients } = useFetchClients();

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useFetchOrganizationUsers();

  // Get organization ID from user organization data
  const organizationId = userOrgData?.data?.[0]?.id;

  // Fallback: Try to get organization ID from user profile or session
  const fallbackOrgId = userData?.user?.organizationId;

  // Use the first available organization ID
  const finalOrganizationId = organizationId || fallbackOrgId;

  // TEMPORARY: For testing, use a hardcoded organization ID if none is found
  const tempOrgId = finalOrganizationId || "temp-org-id-for-testing";

  // Debug logging
  console.log("🔍 User data:", userData);
  console.log("🔍 User object:", userData?.user);
  console.log("🔍 User organizationId:", userData?.user?.organizationId);
  console.log("🔍 User role:", userData?.user?.role);
  console.log("🔍 Is super admin:", userData?.user?.isSuperAdmin);
  console.log("🔍 All organizations data:", userOrgData);
  console.log("🔍 All organizations data.data:", userOrgData?.data);
  console.log("🔍 First organization:", userOrgData?.data?.[0]);
  console.log("🔍 Organization ID from all orgs:", organizationId);
  console.log("🔍 Fallback org ID:", fallbackOrgId);
  console.log("🔍 Final organization ID:", finalOrganizationId);
  console.log("🔍 Clients data:", clientsData);
  console.log("🔍 Users data:", usersData);
  console.log("🔍 Users error:", usersError);
  console.log("🔍 Is authenticated:", !!userData?.user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Test Project",
      projectNumber: "1234567890",
      clientId: "",
      startDate: new Date().toISOString(),
      endDate: "2025-12-28",
      assignedTo: "",
      description: "Test Description",
      address: "Test Address",
      contractfile: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Check if user has organization ID
      if (!finalOrganizationId) {
        console.error("No organization ID found for user");
        toast.error(
          "You need to be part of an organization to create projects"
        );
        return;
      }

      // Include file data if uploaded
      const projectData = {
        ...values,
        contractfile: uploadedFile
          ? await convertFileToBase64(uploadedFile)
          : undefined,
        organizationId: tempOrgId,
      };

      createProject(projectData);
    } catch (error) {
      console.error("Error preparing project data:", error);
      toast.error("Failed to prepare project data");
    }
  }

  // Convert file to base64 for upload
  const convertFileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Reset form on success
  useEffect(() => {
    if (success) {
      form.reset();
      setUploadedFile(null);
      setPdfPreview(null);
      navigate("/dashboard/projects");
    }
  }, [success, form]);

  const onDropPdf = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type) {
      const fileUrl = URL.createObjectURL(file);
      setPdfPreview(fileUrl);
    }
  }, []);

  const { getInputProps: getPdfInputProps, open: openPdf } = useDropzone({
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
    onDrop: onDropPdf,
  });

  return (
    <PageWrapper className="mt-6 p-6">
      <Box
        className="flex items-center gap-2 w-20 cursor-pointer transition-all duration-300  hover:bg-gray-200 rounded-full hover:p-2 "
        onClick={() => navigate(-1)}
      >
        <IoArrowBack />
        <p className="text-black">Back</p>
      </Box>

      <Center className="justify-between mt-6 max-sm:flex-col max-sm:items-start gap-2 relative">
        <Stack className="gap-0">
          <h1 className="text-black text-xl font-medium">Create Project</h1>
          <h1 className="text-gray-500">
            Fill the details to create a new project
          </h1>
        </Stack>
      </Center>

      {/* Error and Success Messages */}
      {error && (
        <Box className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600 text-sm">
            {error.response?.data?.message ||
              error.message ||
              "An error occurred"}
          </p>
        </Box>
      )}

      {success && (
        <Box className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-600 text-sm">
            Project created successfully!
          </p>
        </Box>
      )}

      {usersError && (
        <Box className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600 text-sm">
            Error loading users: {usersError.message}
          </p>
        </Box>
      )}

      {userOrgError && (
        <Box className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600 text-sm">
            Error loading organization: {userOrgError.message}
          </p>
        </Box>
      )}

      {isLoadingUserOrg && (
        <Box className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-600 text-sm">
            Loading your organization information...
          </p>
        </Box>
      )}

      {!isLoadingUserOrg && tempOrgId && (
        <Box className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-600 text-sm">
            Organization ID: {tempOrgId}{" "}
            {tempOrgId === "temp-org-id-for-testing"
              ? "(Temporary for testing)"
              : ""}
          </p>
        </Box>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 relative">
          <Button
            variant="outline"
            className="bg-black text-white border border-gray-200  rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer absolute -top-20 right-0"
            type="submit"
            disabled={isLoading || isLoadingUser || isLoadingUserOrg}
          >
            {isLoading ? "Creating..." : "Save Project"}
          </Button>
          <Box className="bg-white/80 rounded-xl border border-gray-200 p-6 gap-4 grid grid-cols-1">
            <Box className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <Stack className="flex-1 w-full gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Project Name:
                        <span className="text-red-500 text-sm">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white rounded-full placeholder:text-gray-400"
                          size="lg"
                          type="text"
                          placeholder="Enter Project Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Project Number:
                        <span className="text-red-500 text-sm">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white rounded-full placeholder:text-gray-400"
                          placeholder="Enter Project Number"
                          type="number"
                          size="lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Stack>

              <Box className="grid grid-cols-1 flex-1 w-full gap-4">
                {!pdfPreview ? (
                  <Center
                    className="flex-col border-2 border-[#62A1C0] border-dashed border-spacing-2 bg-[#f5fdfe] rounded-lg min-h-50 w-full cursor-pointer"
                    onClick={openPdf}
                  >
                    <img
                      src="/dashboard/upload.svg"
                      alt="pdf-upload"
                      className="size-12"
                    />
                    <p className="text-gray-800 text-lg font-medium underline">
                      Click to upload Project PDF
                    </p>
                    <p className="text-gray-600 text-sm font-medium">
                      PDF files only
                    </p>
                    <input {...getPdfInputProps()} />
                  </Center>
                ) : (
                  <Box className="border-2 border-[#62A1C0] rounded-lg p-4 relative">
                    <Stack className="gap-2">
                      <Box className="flex ml-auto w-full absolute top-0 right-0 p-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setPdfPreview(null);
                          }}
                        >
                          X
                        </Button>
                      </Box>
                      {pdfPreview && (
                        <Box className="w-full h-[150px] border-dashed border-gray-200 rounded">
                          <img
                            src={pdfPreview}
                            title="PDF Preview"
                            className="object-contain w-full h-full"
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
              </Box>
            </Box>

            <Box className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description:</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-white rounded-md placeholder:text-gray-400 h-32"
                        placeholder="Enter Project Description"
                        rows={6}
                        cols={18}
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
                    <FormLabel className="mt-4 -mb-4 max-md:mt-0 max-md:-mb-0">
                      Address:
                      <span className="text-red-500 text-sm">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="lg"
                        type="text"
                        placeholder="Enter Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            <Box className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="h-12">
                          <Button
                            size="lg"
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal rounded-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="size-5" fill="#62A1C0" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          className="max-w-70"
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="h-12">
                          <Button
                            size="lg"
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal rounded-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {/* <CalendarRange className="size-5" /> */}
                            <CalendarIcon className="size-5" fill="#62A1C0" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          className="max-w-70"
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            <Box className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Assign Client:
                      <span className="text-red-500 text-sm">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoadingClients}
                    >
                      <FormControl className="w-full h-11">
                        <SelectTrigger
                          size="lg"
                          className="bg-white border border-gray-300 rounded-full w-full h-12"
                        >
                          <SelectValue
                            placeholder={
                              isLoadingClients
                                ? "Loading clients..."
                                : "Select Client"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {clientsData?.data?.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        )) || []}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Assign Team Member:
                      <span className="text-red-500 text-sm">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoadingUsers}
                    >
                      <FormControl className="w-full h-11">
                        <SelectTrigger
                          size="lg"
                          className="bg-gray-100 border border-gray-100 rounded-full w-full h-11"
                        >
                          <SelectValue
                            placeholder={
                              isLoadingUsers
                                ? "Loading users..."
                                : "Select User"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {usersData?.data?.userMembers?.map((user) => (
                          <SelectItem
                            key={user.id}
                            value={user.user?.id || user.id}
                          >
                            {user.firstname} {user.lastname}
                          </SelectItem>
                        )) || []}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            <Box className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <FormField
                control={form.control}
                name="contractfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract File:</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="lg"
                        type="file"
                        placeholder="Enter Contract File"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploadedFile(file);
                          }
                          field.onChange(e);
                        }}
                        accept=".pdf,.png,.jpeg,.jpg,.gif,.webp,.svg,.bmp"
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
