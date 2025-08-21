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
import { ArrowLeft } from "lucide-react";
import { Anchor } from "../ui/anchor";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { FC } from "react";
import { z } from "zod";
import { Flex } from "../ui/flex";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid Email" })
    .min(1, { message: "Required field" })
    .max(50, { message: "Maximum 50 characters are allowed" }),
});

export const VerifyEmailForm: FC = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    navigate("/verify-code");
  };

  return (
    <Flex className="flex flex-col text-start justify-start items-start max-md:py-8  w-[30rem] max-sm:w-full">
      <Anchor
        to="/auth/signin"
        className="flex text-center justify-center items-center gap-1 w-fit text-sm text-[#1797B9] hover:text-[#1797B9]/80 mb-16 max-sm:m-0 underline px-2"
      >
        <ArrowLeft className="size-4" />
        Back to login
      </Anchor>

      <FormWrapper
        description="Enter your email below and we'll send you a link to reset your password."
        logoSource="/logo/logowithtext.png"
        label="Forgot your password?"
        className="pb-30"
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
                      placeholder="Email"
                      className="bg-white rounded-full border border-gray-100 placeholder:text-gray-400 focus:border-gray-400 placeholder:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size="xl"
              className="bg-[#1797B9] text-white rounded-full cursor-pointer hover:bg-[#1797B9]/80"
            >
              Submit
            </Button>
          </form>
        </Form>
      </FormWrapper>
    </Flex>
  );
};
