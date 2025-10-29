import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import { TwoFAModal } from "@/components/settings/TwoFAModal";
import {
  useVerifyOTP,
  useGenerateOTP,
  useDisable2FA,
  useEnable2FA,
} from "@/hooks/useBetterAuthTwoFA";
import { useUser } from "@/providers/user.provider";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const SettingsTwoFactor = () => {
  const { data: userData } = useUser();
  const queryClient = useQueryClient();
  const verifyOTPMutation = useVerifyOTP();
  const generateOTPMutation = useGenerateOTP();
  const disable2FAMutation = useDisable2FA();
  const enable2FAMutation = useEnable2FA();

  // Get 2FA status from user data
  const is2FAEnabled = userData?.user?.twoFactorEnabled || false;

  // 2FA handlers
  const handleToggle2FA = async (enabled: boolean, password?: string) => {
    try {
      console.log(
        `🔄 Super Admin handleToggle2FA called: enabled=${enabled}, hasPassword=${!!password}`
      );

      if (enabled) {
        if (password) {
          // Password provided - verify it and generate OTP
          console.log("🔐 Password provided, generating OTP...");
          await generateOTPMutation.mutateAsync();
          console.log("✅ OTP generation completed");
        } else {
          // Generate OTP when enabling 2FA
          console.log("📧 No password provided, generating OTP directly...");
          await generateOTPMutation.mutateAsync();
          console.log("✅ OTP generation completed");
        }
      } else {
        // Disable 2FA directly
        console.log("❌ Disabling 2FA...");
        await disable2FAMutation.mutateAsync({ password: password || "" });
        console.log("✅ 2FA disabled");
      }
    } catch (error) {
      console.error("Failed to toggle 2FA:", error);
      toast.error("Failed to update 2FA settings. Please try again.");
      throw error;
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    try {
      await verifyOTPMutation.mutateAsync({ otp });
      // After successful OTP verification, enable 2FA by updating the database
      await enable2FAMutation.mutateAsync();
      // Refresh user data to reflect the new 2FA status
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    } catch (error) {
      console.error("OTP verification failed:", error);
      throw error;
    }
  };

  const handleResendOTP = async () => {
    try {
      await generateOTPMutation.mutateAsync();
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      throw error;
    }
  };

  const handleDisable2FA = async (password: string) => {
    try {
      await disable2FAMutation.mutateAsync({ password });
      // Refresh user data to reflect the new 2FA status
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    } catch (error) {
      console.error("Failed to disable 2FA:", error);
      throw error;
    }
  };

  return (
    <Flex className="justify-between w-full bg-white border border-gray-400/50 p-8 rounded-md max-md:px-3">
      <Stack className="w-full">
        <h1 className="text-3xl font-semibold max-sm:text-xl">
          Two-Factor Authentication (2FA)
        </h1>
        <h1 className="max-md:text-xs">
          Choose Two-Factor Authentication (2FA) option for smart security
        </h1>
      </Stack>

      <TwoFAModal
        open={false} // Super admin settings doesn't use modal state
        isEnabled={is2FAEnabled}
        onToggle={handleToggle2FA}
        onVerifyOTP={handleVerifyOTP}
        onResendOTP={handleResendOTP}
        onDisable2FA={handleDisable2FA}
        onClose={() => {}} // Empty function for super admin
        userEmail={userData?.user?.email || ""}
      />
    </Flex>
  );
};
