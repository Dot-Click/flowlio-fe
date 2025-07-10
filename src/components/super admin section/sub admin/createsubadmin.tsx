import { IoArrowBack } from "react-icons/io5";
import { PageWrapper } from "@/components/common/pagewrapper";
import { Box } from "@/components/ui/box";
import { useNavigate } from "react-router";
import { Center } from "@/components/ui/center";
import { Stack } from "@/components/ui/stack";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project Name must be at least 2 characters.",
  }),
  projectNumber: z.string().min(1, {
    message: "Project Number is required.",
  }),
  clientName: z.string().min(2, {
    message: "Client Name must be at least 2 characters.",
  }),

  assignedProject: z.string().min(1, {
    message: "Please select a project to assign.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
});

export const CreateSubAdmin = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectNumber: "",
      clientName: "",
      assignedProject: "",
      address: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <PageWrapper className="mt-6 p-6">
      <Box
        className="flex items-center gap-2 w-20 cursor-pointer transition-all duration-300  hover:bg-gray-200 rounded-full hover:p-2 "
        onClick={() => navigate(-1)}
      >
        <IoArrowBack />
        <p className="text-black">Back</p>
      </Box>

      <Center className="justify-between mt-6 max-sm:flex-col max-sm:items-start gap-2">
        <Stack className="gap-0">
          <h1 className="text-black text-xl font-medium">Create Sub Admin</h1>
          <h1 className="text-gray-500">
            Create Sub Admin and allow permissions to keep your team aligned and
            productive.
          </h1>
        </Stack>

        <Button
          variant="outline"
          className="bg-black text-white border border-gray-200  rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/superadmin/sub-admin")}
        >
          Add & Save
        </Button>
      </Center>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          <Box className="bg-white/80 rounded-xl border border-gray-200 p-6 gap-4 grid grid-cols-1">
            <Box className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name:</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="lg"
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
                name="projectNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name:</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        placeholder="Enter Last Name"
                        type="number"
                        size="lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            <Box className="grid grid-cols-2 gap-6 max-md:grid-cols-1 mt-2">
              <FormField
                control={form.control}
                name="projectNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        placeholder="Enter Email"
                        type="email"
                        size="lg"
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
                    <FormLabel>Contact Number:</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="lg"
                        type="number"
                        placeholder="Enter Contact Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            <Box className="grid grid-cols-2 gap-6 max-md:grid-cols-1 mt-2">
              <FormField
                control={form.control}
                name="assignedProject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permission:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full h-11">
                        <SelectTrigger
                          size="lg"
                          className="bg-gray-100 border border-gray-300 rounded-full w-full h-12"
                        >
                          <SelectValue placeholder="Select Permission" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Sub Admin">Sub Admin</SelectItem>
                        <SelectItem value="User">User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            <h1 className="text-gray-500 font-medium mt-4">Set Password</h1>
            <Box className="grid grid-cols-2 gap-6 max-md:grid-cols-1 mt-2">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password:</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="lg"
                        type="text"
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password:</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white rounded-full placeholder:text-gray-400"
                        size="lg"
                        type="text"
                        placeholder="Enter Confirm Password"
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
