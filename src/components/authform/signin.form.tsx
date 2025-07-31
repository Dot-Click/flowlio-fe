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
import { useState } from "react";
import { authClient } from "@/providers/user.provider";
import type { FC } from "react";
import { z } from "zod";
import { Box } from "../ui/box";
import { toast } from "sonner";
import { IoEye, IoEyeOff } from "react-icons/io5";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rememberMe: true,
      password: "Super@123",
      email: "superadmin@gmail.com",
    },
  });

  const onSubmit = async ({ email, password }: z.infer<typeof formSchema>) => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: (response) => {
          setIsLoading(false);
          setError(null);

          const user = response.data.user;

          // Debug: Log user data to console
          console.log("Login response user data:", user);

          if (!user.isSuperAdmin) {
            navigate("/superadmin");
            toast.success("Super Admin login successful");
          } else if (user.subadminId) {
            navigate("/superadmin");
            toast.success("Sub Admin login successful");
          } else {
            navigate("/dashboard");
            toast.success("User login successful");
          }
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setIsLoading(false);
        },
      }
    );
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
                  <Box className="relative">
                    <Input
                      size="lg"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      className="bg-white rounded-full border border-gray-100 placeholder:text-gray-400 focus:border-gray-400 placeholder:text-sm"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                    >
                      {showPassword ? (
                        <IoEyeOff size={20} />
                      ) : (
                        <IoEye size={20} />
                      )}
                    </button>
                  </Box>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Flex className="justify-between mb-8 gap-0">
            <Anchor to="/signup" className="text-sm text-black">
              Don't have an account?
            </Anchor>
            <Anchor to="/verify-email" className="text-sm text-[#F48E2D]">
              Forgot Password?
            </Anchor>
          </Flex>

          {error && (
            <Box className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </Box>
          )}

          <Button
            size="xl"
            disabled={isLoading}
            className="bg-[#1797B9] text-white rounded-full cursor-pointer hover:bg-[#1797B9]/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};
