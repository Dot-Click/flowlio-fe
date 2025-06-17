import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "../ui/select";
import { z } from "zod";
import { FC } from "react";
import { Box } from "../ui/box";
import { Flex } from "../ui/flex";
import { Input } from "../ui/input";
import { Stack } from "../ui/stack";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserManagementHeaderProps } from "./usermanagementheader";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Please inser email address.",
  }),
  role: z.string().min(2, {
    message: "must select a role.",
  }),
  firstname: z
    .string()
    .min(2, {
      message: "first name must be at least 2 characters.",
    })
    .optional(),
  lastname: z
    .string()
    .min(2, {
      message: "last name must be at least 2 characters.",
    })
    .optional(),
  department: z.string().min(2, {
    message: "must select a department.",
  }),
  assignproject: z.string().min(2, {
    message: "must select a assign project.",
  }),
});

export const AddBulkMember: FC<UserManagementHeaderProps> = ({ goToStep }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      department: "",
      assignproject: "",
      role: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const dropDownValur = [
    "Department 1",
    "Department 2",
    "Department 3",
    "Department 4",
    "Department 5",
  ];
  const assignproject = [
    "Project 1",
    "Project 2",
    "Project 3",
    "Project 4",
    "Project 5",
  ];

  const roleDownValur = [
    "Admin",
    "Manager",
    "Field Personnel",
    "Sub Contractor",
  ];

  const content = [
    {
      label: "John Walve",
      mail: "Johnwalve@gmail.com",
    },
    {
      label: "Marshal Vix",
      mail: "marshal@gmail.com",
    },
  ];

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          <Box className="bg-white/80 rounded-xl border border-gray-300 p-6 gap-6 grid grid-cols-1">
            <Box className="gap-4 grid grid-cols-1 w-68">
              {content.map((item) => (
                <Flex className="p-2 border border-gray-400 rounded-md bg-gray-200">
                  <Avatar className="relative hover:z-1 border-2 border-white size-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Stack className="line-clamp-2">
                    <p>{item.label}</p>
                    <p className="text-sm text-gray-400">{item.mail}</p>
                  </Stack>
                </Flex>
              ))}
            </Box>

            <Box className="grid grid-cols-2 gap-6 max-md:grid-cols-1 mt-8 mb-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        size="lg"
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full min-h-12">
                          <SelectValue placeholder="Select a Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup {...field}>
                            {roleDownValur.map((item, index, arr) => (
                              <SelectItem
                                value={item}
                                className={`border-b border-gray-200/50 rounded-none p-2 w-full ${
                                  arr.length - 1 === index && "border-b-0"
                                }`}
                                key={index}
                              >
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name
                      <span className="text-gray-300">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Enter First Name"
                        type="text"
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
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name
                      <span className="text-gray-300">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Enter Last Name"
                        type="text"
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
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full min-h-12">
                          <SelectValue placeholder="Select a Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup {...field}>
                            {dropDownValur.map((item, index, arr) => (
                              <SelectItem
                                value={item}
                                className={`border-b border-gray-200/50 rounded-none p-2 w-full ${
                                  arr.length - 1 === index && "border-b-0"
                                }`}
                                key={index}
                              >
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignproject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Assign</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full min-h-12">
                          <SelectValue placeholder="Select a Assign Project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup {...field}>
                            {assignproject.map((item, index, arr) => (
                              <SelectItem
                                value={item}
                                className={`border-b border-gray-200/50 rounded-none p-2 w-full ${
                                  arr.length - 1 === index && "border-b-0"
                                }`}
                                key={index}
                              >
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>
            <Button className="w-26 h-10 cursor-pointer" type="submit">
              Add
            </Button>
          </Box>

          <Flex className="gap-4 justify-end mt-4">
            <Button
              onClick={() => goToStep("user management")}
              className="w-24 h-10 bg-white text-black border border-black cursor-pointer hover:bg-white hover:text-black  "
            >
              <ArrowLeft />
            </Button>
            <Button className="w-36 h-10 cursor-pointer" type="button">
              Add All Members
            </Button>
          </Flex>
        </form>
      </Form>
    </>
  );
};
