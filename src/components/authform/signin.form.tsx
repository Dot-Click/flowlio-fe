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
import { useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { Anchor } from "../ui/anchor";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Flex } from "../ui/flex";
import { useState, useEffect } from "react";
import { authClient } from "@/providers/user.provider";
import { axios } from "@/configs/axios.config";
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
  useEffect(() => {
    scrollTo(0, 0);
    document.title = "Sign In - Flowlio";
  }, []);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Check for deactivation message in URL params
  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "deactivated") {
      toast.error(
        "Your account has been deactivated. Please contact the administrator for assistance."
      );
    }
  }, [searchParams]);

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
        onSuccess: async () => {
          setIsLoading(false);
          setError(null);

          try {
            // Wait a moment for Better Auth session to be fully established
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Fetch fresh user profile data directly
            const profileResponse = await axios.get("/user/profile");
            const userProfile = profileResponse.data.data;

            console.log("User profile:", userProfile);

            // Show success message
            toast.success("Login successful");

            // Redirect all users to dashboard - role-based navigation will handle the appropriate interface
            navigate("/dashboard");
          } catch (error) {
            console.error("Error fetching user profile:", error);
            // Still redirect but show warning
            toast.warning(
              "Login successful, but some data may not be available yet"
            );
            navigate("/dashboard");
          }
        },
        onError: (ctx) => {
          // Handle specific sub admin deactivation error
          if (
            ctx.error?.message?.includes("deactivated") ||
            ctx.error?.code === "SUBADMIN_DEACTIVATED"
          ) {
            toast.error(
              "Your account has been deactivated. Please contact the administrator for assistance."
            );
          } else {
            toast.error(ctx.error.message || "Login failed");
          }
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
            <Anchor to="/auth/signup" className="text-sm text-black">
              Don't have an account?
            </Anchor>
            <Anchor to="/auth/verify-email" className="text-sm text-[#F48E2D]">
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
