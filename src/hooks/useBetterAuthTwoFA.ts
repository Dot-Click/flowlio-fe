import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { useUser } from "@/providers/user.provider";

// Generate OTP for sign-in (no user context required)
export const useGenerateSignInOTP = () => {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      console.log(`🚀 Generating sign-in OTP for: ${email}`);

      const result = await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "email-verification",
      });

      console.log(`📧 Sign-in OTP generation result:`, result);

      if (result.error) {
        console.error(`❌ Sign-in OTP generation failed:`, result.error);
        throw new Error(result.error.message || "Failed to send OTP");
      }

      console.log(`✅ Sign-in OTP generated successfully for ${email}`);
      return result.data;
    },
    onError: (error: any) => {
      console.error("Failed to generate sign-in OTP:", error);
      throw error;
    },
  });
};

// Verify OTP for sign-in (no user context required)
export const useVerifySignInOTP = () => {
  return useMutation({
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      console.log(`🔍 Verifying sign-in OTP for: ${email}, OTP: ${otp}`);

      // For sign-in with OTP, we need to use the correct Better Auth flow
      try {
        // First verify the OTP
        const verifyResult = await authClient.emailOtp.verifyEmail({
          email: email,
          otp: otp,
        });

        console.log(`🔍 Verify OTP result:`, verifyResult);

        if (verifyResult.error) {
          console.error(`❌ OTP verification failed:`, verifyResult.error);
          throw new Error(
            verifyResult.error.message || "Invalid or expired OTP"
          );
        }

        console.log(`✅ OTP verified successfully for ${email}`);

        // After successful OTP verification, we need to establish a session
        // The backend should handle session creation after OTP verification
        // Let's wait a moment and then check for session
        await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
          const sessionResult = await authClient.getSession();
          console.log(
            `🔍 Current session after OTP verification:`,
            sessionResult
          );

          if (sessionResult.data) {
            console.log(`✅ Session found after OTP verification for ${email}`);
            return sessionResult.data;
          } else {
            console.log(`⚠️ No session found after OTP verification`);

            // Try to manually sign in the user after OTP verification
            console.log(
              "🔍 Attempting to sign in user after OTP verification..."
            );

            // Try to use the regular sign-in method with OTP as password
            try {
              const signInResult = await authClient.signIn.email({
                email: email,
                password: otp, // Use OTP as password
              });

              console.log(
                `🔍 SignIn with OTP as password result:`,
                signInResult
              );

              if (signInResult.data) {
                console.log(`✅ Sign-in with OTP successful for ${email}`);
                return signInResult.data;
              } else {
                console.log(
                  `⚠️ Sign-in with OTP failed, trying session refresh...`
                );

                // Fallback: try to refresh the session
                const refreshResult = await authClient.getSession();
                console.log(`🔍 Session refresh result:`, refreshResult);

                if (refreshResult.data) {
                  console.log(`✅ Session refreshed successfully for ${email}`);
                  return refreshResult.data;
                } else {
                  console.log(
                    `⚠️ Session refresh failed, returning verification result`
                  );
                  return verifyResult.data;
                }
              }
            } catch (signInError) {
              console.error(`❌ Sign-in with OTP failed:`, signInError);

              // Fallback: try to refresh the session
              const refreshResult = await authClient.getSession();
              console.log(`🔍 Session refresh result:`, refreshResult);

              if (refreshResult.data) {
                console.log(`✅ Session refreshed successfully for ${email}`);
                return refreshResult.data;
              } else {
                console.log(
                  `⚠️ Session refresh failed, returning verification result`
                );
                return verifyResult.data;
              }
            }
          }
        } catch (sessionError) {
          console.error(`❌ Session handling failed:`, sessionError);
          return verifyResult.data;
        }
      } catch (error) {
        console.error(`❌ Sign-in OTP verification error:`, error);
        throw error;
      }
    },
    onError: (error: any) => {
      console.error("Failed to verify sign-in OTP:", error);
      throw error;
    },
  });
};

// Generate OTP for 2FA using better-auth client
export const useGenerateOTP = () => {
  const { data: user } = useUser();

  return useMutation({
    mutationFn: async () => {
      if (!user?.user?.email) {
        throw new Error("User email not found");
      }

      console.log(`🚀 Generating OTP for user: ${user.user.email}`);

      const result = await authClient.emailOtp.sendVerificationOtp({
        email: user.user.email,
        type: "email-verification",
      });

      console.log(`📧 OTP generation result:`, result);

      if (result.error) {
        console.error(`❌ OTP generation failed:`, result.error);
        throw new Error(result.error.message || "Failed to send OTP");
      }

      console.log(`✅ OTP generated successfully for ${user.user.email}`);
      return result.data;
    },
    onError: (error: any) => {
      console.error("Failed to generate OTP:", error);
      throw error;
    },
  });
};

// Verify OTP for 2FA using better-auth client
export const useVerifyOTP = () => {
  const { data: user } = useUser();

  return useMutation({
    mutationFn: async ({ otp }: { otp: string }) => {
      if (!user?.user?.email) {
        throw new Error("User email not found");
      }

      console.log(`🔍 Verifying OTP for user: ${user.user.email}, OTP: ${otp}`);
      console.log(`🔍 OTP length: ${otp.length}, type: ${typeof otp}`);

      // Try different verification approaches
      try {
        const result = await authClient.emailOtp.verifyEmail({
          email: user.user.email,
          otp: otp,
        });

        console.log(`🔍 OTP verification result:`, result);

        if (result.error) {
          console.error(`❌ OTP verification failed:`, result.error);
          console.error(`❌ Error details:`, {
            code: result.error.code,
            message: result.error.message,
            status: result.error.status,
          });

          // Method 2: Try signInWithOTP as fallback
          console.log("🔍 Trying signInWithOTP method as fallback...");
          try {
            const signInResult = await authClient.signIn.emailOtp({
              email: user.user.email,
              otp: otp,
            });
            console.log(`🔍 SignIn OTP result:`, signInResult);

            if (signInResult.error) {
              throw new Error(
                signInResult.error.message || "Invalid or expired OTP"
              );
            }

            console.log(
              `✅ OTP verified successfully via signIn for ${user.user.email}`
            );
            return signInResult.data;
          } catch (signInError) {
            console.error(`❌ SignIn OTP also failed:`, signInError);
            throw new Error(result.error.message || "Invalid or expired OTP");
          }
        }

        console.log(`✅ OTP verified successfully for ${user.user.email}`);
        return result.data;
      } catch (error) {
        console.error(`❌ OTP verification error:`, error);
        throw error;
      }
    },
    onError: (error: any) => {
      console.error("Failed to verify OTP:", error);
      throw error;
    },
  });
};

// Enable 2FA after OTP verification
export const useEnable2FA = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Update the twoFactorEnabled field to true after successful OTP verification
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
        }/api/user/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            twoFactorEnabled: true,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to enable 2FA");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate user profile query to refresh 2FA status
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      console.error("Failed to enable 2FA:", error);
      throw error;
    },
  });
};

// Disable 2FA using email OTP approach
export const useDisable2FA = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      // For disabling email OTP 2FA, we need to update the database directly
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
        }/api/user/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            twoFactorEnabled: false,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to disable 2FA");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate user profile query to refresh 2FA status
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      console.error("Failed to disable 2FA:", error);
      throw error;
    },
  });
};

// Toggle 2FA on/off using Better Auth's email OTP methods
export const useToggle2FA = () => {
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  return useMutation({
    mutationFn: async ({
      enabled,
      password,
    }: {
      enabled: boolean;
      password?: string;
    }) => {
      if (!user?.user?.email) {
        throw new Error("User email not found");
      }

      if (enabled) {
        // For email OTP 2FA, we don't need to call enable/disable methods
        // The 2FA is enabled when the user verifies the OTP
        // This is just a placeholder to maintain the interface
        return {
          success: true,
          message:
            "2FA setup initiated. Please verify the OTP sent to your email.",
          data: { twoFactorEnabled: false }, // Will be true after OTP verification
        };
      } else {
        // For disabling email OTP 2FA, we need to update the database directly
        // Since Better Auth doesn't have a direct disable method for email OTP
        const response = await fetch("/api/user/profile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            twoFactorEnabled: false,
            password: password,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to disable 2FA");
        }

        return response.json();
      }
    },
    onSuccess: () => {
      // Invalidate user profile query to refresh 2FA status
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      console.error("Failed to toggle 2FA:", error);
      throw error;
    },
  });
};
