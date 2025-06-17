import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormWrapper } from "./formwrapper";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Anchor } from "../ui/anchor";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Flex } from "../ui/flex";
import type { FC } from "react";
import { z } from "zod";

const formSchema = z.object({
  password: z
    .string()
    .min(8, "Invalid Password")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  email: z
    .string()
    .email({ message: "Invalid Email" })
    .min(1, { message: "Required field" })
    .max(50, { message: "Maximum 50 characters are allowed" }),
  rememberMe: z.boolean(),
});

export const SignInForm: FC = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rememberMe: true,
      password: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    navigate("/dashboard");
  };

  return (
    <FormWrapper
      description="Log In to access your account"
      logoSource="/logo/logowithtext.png"
      label="Log In. Take Control"
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-8">
                <FormLabel className="font-normal">Email</FormLabel>
                <FormControl>
                  <Input
                    size="lg"
                    placeholder="Enter email here"
                    {...field}
                    className="bg-white rounded-full border border-gray-100 placeholder:text-gray-400 focus:border-gray-400 placeholder:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">Password</FormLabel>
                <FormControl>
                  <Input
                    size="lg"
                    type="password"
                    placeholder="Enter Password"
                    className="bg-white rounded-full border border-gray-100 placeholder:text-gray-400 focus:border-gray-400 placeholder:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Flex className="justify-end mb-8">
            <Anchor to="/verify-email" className="text-sm text-[#F48E2D]">
              Forgot Password?
            </Anchor>
          </Flex>
          <Button
            size="xl"
            className="bg-[#1797B9] text-white rounded-full cursor-pointer hover:bg-[#1797B9]/80"
          >
            Sign In
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};
