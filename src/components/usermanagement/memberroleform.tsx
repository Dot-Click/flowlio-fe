import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "../ui/form";
import {
  User,
  Hammer,
  ArrowLeft,
  UserRoundPen,
  UserRoundSearch,
} from "lucide-react";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectTrigger,
  SelectContent,
} from "../ui/select";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";
import { Box } from "../ui/box";
import { UserManagementHeaderProps } from "./usermanagementheader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "../ui/checkbox";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Center } from "../ui/center";
import { Input } from "../ui/input";
import { Flex } from "../ui/flex";
import { FC } from "react";
import { z } from "zod";

const formSchema = z.object({
  jobtitle: z.string().min(2, {
    message: "Job Title must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  department: z.string().min(2, {
    message: "Department must be at least 2 characters.",
  }),
  projects: z.string().min(2, {
    message: "Must select a project.",
  }),
  role: z.array(z.string()).nonempty({
    message: "At least one role must be selected.",
  }),
});

export const MemberRoleForm: FC<UserManagementHeaderProps> = ({
  goToStep,
  previous,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobtitle: "",
      company: "",
      department: "",
      projects: "",
      role: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    goToStep("user management");
  }

  const dropDownValur = [
    "Roof Repair Project 1",
    "Roof Repair Project 2",
    "Roof Repair Project 3",
    "Roof Repair Project 4",
    "Roof Repair Project 5",
  ];

  const role = [
    {
      title: "Admin",
      Icon: UserRoundPen,
      role: "Admin has full access to manage projects, teams, and system settings.",
    },
    {
      title: "Project Manager",
      Icon: UserRoundSearch,
      role: "Project Manager oversees project execution, scheduling, and team coordination.",
    },
    {
      title: "Site Supervisor",
      Icon: User,
      role: "Site Supervisor monitors on-site work progress and reports updates.",
    },
    {
      title: "Subcontractor",
      Icon: Hammer,
      role: "Subcontractor handles assigned field tasks with limited system access.",
    },
  ];

  return (
    <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          <Box className="bg-white/80 rounded-xl border border-gray-300 p-6 gap-6 grid grid-cols-1">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roles</FormLabel>
                  <FormControl>
                    <Box className="grid grid-cols-4 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
                      {role.map((item, index) => {
                        const selectedRoles = field.value || [];
                        const isActive = selectedRoles.includes(item.title);

                        return (
                          <Tooltip key={index}>
                            <TooltipTrigger asChild>
                              <Flex
                                className={`justify-between border p-5 rounded-lg cursor-pointer transition-all 
                                  ${
                                    isActive
                                      ? "border-b-2 border-black text-black"
                                      : "border-gray-400 text-gray-400"
                                  }`}
                              >
                                <Flex className="gap-2 items-center">
                                  {item.Icon && (
                                    <item.Icon className="size-6" />
                                  )}
                                  <span>{item.title}</span>
                                </Flex>
                                <Checkbox
                                  className={`rounded-full size-5 cursor-pointer border ${
                                    isActive
                                      ? "border-black"
                                      : "border-gray-400"
                                  }`}
                                  checked={isActive}
                                  onCheckedChange={(checked) => {
                                    const updatedRoles = checked
                                      ? [...selectedRoles, item.title]
                                      : selectedRoles.filter(
                                          (role) => role !== item.title
                                        );
                                    field.onChange(updatedRoles);
                                  }}
                                />
                              </Flex>
                            </TooltipTrigger>
                            <TooltipContent className="mb-2 w-[12rem]">
                              <Center className="flex-col text-center">
                                {item.role}
                              </Center>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </Box>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Box className="grid grid-cols-2 gap-6 max-md:grid-cols-1 mt-8 mb-8">
              <FormField
                control={form.control}
                name="jobtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        size="lg"
                        type="text"
                        placeholder="Enter Job Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Enter Company Name"
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
                name="projects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Projects</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full min-h-12">
                          <SelectValue placeholder="Select a Project" />
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
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Enter Department Name"
                        type="text"
                        size="lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>
          </Box>

          <Flex className="gap-4 justify-end mt-4">
            <Button
              onClick={previous}
              className="w-24 h-10 bg-white text-black border border-black cursor-pointer hover:bg-white hover:text-black"
            >
              <ArrowLeft />
            </Button>
            <Button className="w-36 h-10 cursor-pointer" type="submit">
              Submit
            </Button>
          </Flex>
        </form>
      </Form>
    </TooltipProvider>
  );
};
