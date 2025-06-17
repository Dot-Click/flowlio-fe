import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "../ui/form";
import { z } from "zod";
import { Box } from "../ui/box";
import { Stack } from "../ui/stack";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const formSchema = z
  .object({
    currentpassword: z
      .string()
      .min(8, {
        message: "Current password must be at least 8 characters long.",
      })
      .max(12, {
        message: "Current password must be at most 12 characters long.",
      }),

    newpassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters long." })
      .max(12, { message: "New password must be at most 12 characters long." }),

    confirmpassword: z
      .string()
      .min(8, {
        message: "Please confirm your password (minimum 8 characters).",
      })
      .max(12, {
        message: "Confirm password must be at most 12 characters long.",
      }),
  })
  .refine((data) => data.newpassword === data.confirmpassword, {
    message: "New password and confirm password must match.",
    path: ["confirmpassword"],
  });

export const PasswordSecuritySettings = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Stack className="w-full bg-white border border-gray-400/50  p-8 rounded-md max-md:px-3">
      <Stack>
        <h1 className="text-2xl font-semibold">Password & Security</h1>
        <h1>Manage your passwords, login preferences and recovery methods.</h1>
      </Stack>

      <Box className=" bg-gray-100/80 border border-gray-400/50 mt-4 min-h-6 w-2xl p-4 rounded-md max-md:w-full max-md:text-xs">
        Your password must be at least 8 characters and should include a
        combination of numbers, letters and special characters (!$@%+).
      </Box>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          <Stack className="gap-6">
            <FormField
              control={form.control}
              name="currentpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white w-md max-sm:w-full"
                      size="lg"
                      type="password"
                      placeholder="Enter Current Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white w-md max-sm:w-full"
                      placeholder="Enter New Password"
                      type="password"
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
              name="confirmpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white w-md max-sm:w-full"
                      placeholder="Enter Confirm New Password"
                      type="password"
                      size="lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Stack>
          <Button
            className="flex ml-auto mt-6 w-38 h-12 cursor-pointer"
            type="submit"
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </Stack>
  );
};
