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
import { ArrowLeft } from "lucide-react";

const formSchema = z.object({
  code: z.string().min(1, { message: "Required field" }),
});

export const VerifyCodeForm: FC = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    navigate("/reset-password");
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
        description="We sent a password reset link to your email, please check your inbox."
        logoSource="/logo/logowithtext.png"
        label="Check Your Email"
      >
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="mt-8">
                  <FormLabel className="font-normal">
                    Verification Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      size="lg"
                      placeholder="Code"
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
            <Flex className="justify-center flex-wrap max-sm:justify-center max-sm:flex-col">
              <h2>
                Didn't receive the email?
                <span className="underline text-[#F48E2D] hover:text-[#F48E2D]/80 hover:underline cursor-pointer ml-1">
                  Resend
                </span>
              </h2>
            </Flex>
          </form>
        </Form>
      </FormWrapper>
    </Flex>
  );
};
