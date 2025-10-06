import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Stack } from "@/components/ui/stack";
import { Center } from "@/components/ui/center";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";
import { IoMdLock, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Box } from "@/components/ui/box";
import { Switch } from "@/components/ui/switch";
import React, { useRef, useState, useEffect } from "react";
import { useUser } from "@/providers/user.provider";
import { useUpdateUserProfile } from "@/hooks/useupdateuserprofile";
import { useUpdateProfileImage } from "@/hooks/useupdateprofileimage";
import { toast } from "sonner";
import { TwoFAModal } from "./TwoFAModal";
import {
  useVerifyOTP,
  useGenerateOTP,
  useDisable2FA,
  useEnable2FA,
} from "@/hooks/useBetterAuthTwoFA";
import { useQueryClient } from "@tanstack/react-query";
import { axios } from "@/configs/axios.config";

const settingsSchema = z
  .object({
    avatar: z.any().optional(),
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    currentpassword: z.string().optional(),
    newpassword: z.string().optional(),
    confirmpassword: z.string().optional(),
    paymentAlertNotifications: z.boolean(),
    invoiceRemindersNotifications: z.boolean(),
    projectActivityUpdatesNotifications: z.boolean(),
  })
  .refine(
    (data) => {
      // If any password field is filled, all must be filled and valid
      if (data.currentpassword || data.newpassword || data.confirmpassword) {
        return data.currentpassword && data.newpassword && data.confirmpassword;
      }
      return true;
    },
    {
      message: "If changing password, all password fields must be filled.",
      path: ["currentpassword"],
    }
  )
  .refine(
    (data) => {
      // If password fields are filled, validate their lengths
      if (data.currentpassword) {
        return (
          data.currentpassword.length >= 8 && data.currentpassword.length <= 12
        );
      }
      return true;
    },
    {
      message: "Current password must be 8-12 characters long.",
      path: ["currentpassword"],
    }
  )
  .refine(
    (data) => {
      // If password fields are filled, validate their lengths
      if (data.newpassword) {
        return data.newpassword.length >= 8 && data.newpassword.length <= 12;
      }
      return true;
    },
    {
      message: "New password must be 8-12 characters long.",
      path: ["newpassword"],
    }
  )
  .refine(
    (data) => {
      // If password fields are filled, validate their lengths
      if (data.confirmpassword) {
        return (
          data.confirmpassword.length >= 8 && data.confirmpassword.length <= 12
        );
      }
      return true;
    },
    {
      message: "Confirm password must be 8-12 characters long.",
      path: ["confirmpassword"],
    }
  )
  .refine(
    (data) => {
      // If password fields are filled, new and confirm must match
      if (data.newpassword && data.confirmpassword) {
        return data.newpassword === data.confirmpassword;
      }
      return true;
    },
    {
      message: "New password and confirm password must match.",
      path: ["confirmpassword"],
    }
  );

export const SettingsHeader = () => {
  const { data: userData, isLoading } = useUser();
  const queryClient = useQueryClient();
  const updateProfileMutation = useUpdateUserProfile();
  const updateProfileImageMutation = useUpdateProfileImage();
  const verifyOTPMutation = useVerifyOTP();
  const generateOTPMutation = useGenerateOTP();
  const disable2FAMutation = useDisable2FA();
  const enable2FAMutation = useEnable2FA();

  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get 2FA status from user data
  const is2FAEnabled = userData?.user?.twoFactorEnabled || false;

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      avatar: undefined,
      fullName: "",
      email: "",
      currentpassword: "",
      newpassword: "",
      confirmpassword: "",
      paymentAlertNotifications: true,
      invoiceRemindersNotifications: true,
      projectActivityUpdatesNotifications: true,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  // Update form with user data when available
  useEffect(() => {
    if (userData?.user) {
      setValue("fullName", userData.user.name || "");
      setValue("email", userData.user.email || "");
      if (userData.user.image) {
        setAvatarPreview(userData.user.image);
      }

      // Initialize notification preferences from database
      const prefs = userData.user.notificationPreferences || {
        paymentAlerts: true,
        invoiceReminders: true,
        projectActivityUpdates: true,
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: true,
      };
      setValue("paymentAlertNotifications", prefs.paymentAlerts ?? true);
      setValue("invoiceRemindersNotifications", prefs.invoiceReminders ?? true);
      setValue(
        "projectActivityUpdatesNotifications",
        prefs.projectActivityUpdates ?? true
      );
    }
  }, [userData, setValue]);

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function onSubmit(values: z.infer<typeof settingsSchema>) {
    try {
      // Update profile image if a new one was selected
      if (values.avatar && values.avatar instanceof File) {
        await updateProfileImageMutation.mutateAsync({ image: values.avatar });
        toast.success("Profile image updated successfully!");
      }

      // Update profile information (name and email)
      await updateProfileMutation.mutateAsync({
        name: values.fullName,
        email: values.email,
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  }

  // Handle file selection
  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setAvatarPreview(undefined);
    setValue("avatar", undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 2FA handlers
  const handleToggle2FA = async (enabled: boolean, password?: string) => {
    console.log("🚨🚨🚨 handleToggle2FA FUNCTION CALLED! 🚨🚨🚨");
    console.log("🚨 Arguments:", {
      enabled,
      password: password ? "***" : undefined,
    });

    try {
      console.log(
        `🔄 handleToggle2FA called: enabled=${enabled}, hasPassword=${!!password}`
      );
      console.log(`🔄 handleToggle2FA function type:`, typeof handleToggle2FA);
      console.log(`🔄 generateOTPMutation:`, generateOTPMutation);

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
      console.error("❌ Failed to toggle 2FA:", error);
      console.error("❌ Error details:", error);
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
      console.log("🔄 Resending OTP...");
      await generateOTPMutation.mutateAsync();
      console.log("✅ OTP resent successfully");
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

  // Notification toggle handlers with toast messages
  const handlePaymentAlertsToggle = async (enabled: boolean) => {
    try {
      setValue("paymentAlertNotifications", enabled);

      // Get current preferences and update paymentAlerts
      const currentPrefs = userData?.user?.notificationPreferences || {};
      const updatedPrefs = {
        ...currentPrefs,
        paymentAlerts: enabled,
      };

      // Save to database
      await axios.patch("/user/profile", {
        notificationPreferences: updatedPrefs,
      });

      // Refresh user data to reflect the new notification preferences
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });

      if (enabled) {
        toast.success(
          "🔔 Payment alerts enabled! You'll receive notifications for transactions and overdue payments."
        );
      } else {
        toast.info(
          "🔕 Payment alerts disabled. You won't receive payment notifications."
        );
      }
    } catch (error) {
      console.error("Failed to update payment alerts:", error);
      // Revert the toggle on error
      setValue("paymentAlertNotifications", !enabled);
      toast.error(
        "Failed to update payment alert preferences. Please try again."
      );
    }
  };

  const handleInvoiceRemindersToggle = async (enabled: boolean) => {
    try {
      setValue("invoiceRemindersNotifications", enabled);

      // Get current preferences and update invoiceReminders
      const currentPrefs = userData?.user?.notificationPreferences || {};
      const updatedPrefs = {
        ...currentPrefs,
        invoiceReminders: enabled,
      };

      // Save to database
      await axios.patch("/user/profile", {
        notificationPreferences: updatedPrefs,
      });

      // Refresh user data to reflect the new notification preferences
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });

      if (enabled) {
        toast.success(
          "📧 Invoice reminders enabled! You'll be notified about upcoming due dates and pending payments."
        );
      } else {
        toast.info(
          "🔕 Invoice reminders disabled. You won't receive invoice notifications."
        );
      }
    } catch (error) {
      console.error("Failed to update invoice reminders:", error);
      // Revert the toggle on error
      setValue("invoiceRemindersNotifications", !enabled);
      toast.error(
        "Failed to update invoice reminder preferences. Please try again."
      );
    }
  };

  const handleProjectUpdatesToggle = async (enabled: boolean) => {
    try {
      setValue("projectActivityUpdatesNotifications", enabled);

      // Get current preferences and update projectActivityUpdates
      const currentPrefs = userData?.user?.notificationPreferences || {};
      const updatedPrefs = {
        ...currentPrefs,
        projectActivityUpdates: enabled,
      };

      // Save to database
      await axios.patch("/user/profile", {
        notificationPreferences: updatedPrefs,
      });

      // Refresh user data to reflect the new notification preferences
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });

      if (enabled) {
        toast.success(
          "🚀 Project activity updates enabled! You'll receive alerts on project changes and task assignments."
        );
      } else {
        toast.info(
          "🔕 Project activity updates disabled. You won't receive project notifications."
        );
      }
    } catch (error) {
      console.error("Failed to update project updates:", error);
      // Revert the toggle on error
      setValue("projectActivityUpdatesNotifications", !enabled);
      toast.error(
        "Failed to update project activity preferences. Please try again."
      );
    }
  };

  // Show loading state while user data is being fetched
  if (isLoading || !userData?.user) {
    return (
      <ComponentWrapper className="mt-8 px-6 py-5 max-md:px-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading settings...</p>
          </div>
        </div>
      </ComponentWrapper>
    );
  }

  return (
    <ComponentWrapper className="mt-8 px-6 py-5 max-md:px-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center className="justify-between max-sm:flex-col max-sm:items-start gap-2">
          <Stack className="gap-0">
            <h1 className="text-2xl font-medium">Setting</h1>
            <h1 className="text-gray-500 font-normal">
              Need Help? We've Got You Covered.
            </h1>
          </Stack>
          <Button
            type="submit"
            variant="outline"
            className="bg-black text-white border border-gray-200 rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer h-11"
            disabled={
              updateProfileMutation.isPending ||
              updateProfileImageMutation.isPending
            }
          >
            {updateProfileMutation.isPending ||
            updateProfileImageMutation.isPending
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </Center>

        <Stack className="gap-8 mt-4">
          <Stack className="w-full bg-white border-1 border-gray-200 p-8 rounded-xl max-md:px-3 ">
            <h1 className="text-xl font-medium">User Profile</h1>

            <Flex className="justify-between w-xs max-sm:w-full">
              <img
                src={
                  avatarPreview || userData?.user?.image || "/dashboard/1.svg"
                }
                alt="Profile"
                className="rounded-full bg-cover bg-center w-26 h-26 border-2 border-dashed border-gray-600"
              />

              <Flex className="flex-col gap-2">
                <Button
                  type="button"
                  className="bg-black text-white rounded-full flex items-center gap-2 cursor-pointer h-10 w-30 hover:bg-black/80"
                  onClick={handleChooseFile}
                  disabled={updateProfileImageMutation.isPending}
                >
                  {updateProfileImageMutation.isPending
                    ? "Uploading..."
                    : "Choose File"}
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  className="bg-[#DDDDDD] text-black rounded-full flex items-center gap-2 cursor-pointer h-10 w-30 hover:bg-[#DDDDDD]/80 hover:text-white"
                  onClick={handleRemove}
                  disabled={
                    !avatarPreview || updateProfileImageMutation.isPending
                  }
                >
                  Remove
                </Button>
              </Flex>
            </Flex>

            <Flex className="mt-4 w-3xl max-sm:w-full flex-col gap-4">
              <Input
                className="bg-white rounded-full"
                size="lg"
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
              />
              {errors.fullName && (
                <span className="text-red-500 text-xs">
                  {errors.fullName.message as string}
                </span>
              )}

              <Flex className="w-full relative border border-gray-200 rounded-full">
                <Input
                  className="bg-white rounded-full relative"
                  size="lg"
                  disabled
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                <IoMdLock className="size-6 text-gray-500 absolute right-4 top-3 " />
              </Flex>
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message as string}
                </span>
              )}
            </Flex>
          </Stack>

          <Stack className="w-full bg-white border-1 border-gray-200 p-8 rounded-xl max-md:px-3">
            <h1 className="text-2xl font-semibold">Security Settings</h1>

            <Box className=" bg-[#f6fcfe] border border-white mt-4 min-h-6 w-3xl p-4 rounded-md max-md:w-full max-md:text-xs">
              <p className="text-sm text-gray-600">
                <strong>Profile Updates:</strong> You can update your name and
                email without entering a password.
                <br />
                <strong>Password Changes:</strong> Password changes require
                additional verification for security.
              </p>
            </Box>

            {/* Password Change Section - Optional */}
            <Box className="mt-8">
              <h2 className="text-lg font-medium text-gray-700 mb-4">
                Change Password
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Leave password fields empty if you don't want to change your
                password.
              </p>

              <Stack className="gap-6 w-3xl max-md:w-full">
                {/* Current Password Field with Eye Icon */}
                <Box className="relative">
                  <Input
                    className="bg-white rounded-full pr-12"
                    size="lg"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter Current Password"
                    {...register("currentpassword")}
                  />
                  <Button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none cursor-pointer bg-transparent hover:bg-transparent shadow-none"
                    onClick={() => setShowCurrentPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {showCurrentPassword ? (
                      <IoMdEye size={22} />
                    ) : (
                      <IoMdEyeOff size={22} />
                    )}
                  </Button>
                </Box>
                {errors.currentpassword && (
                  <span className="text-red-500 text-xs">
                    {errors.currentpassword.message as string}
                  </span>
                )}
                {/* New Password Field with Eye Icon */}
                <Box className="relative">
                  <Input
                    className="bg-white rounded-full pr-12"
                    placeholder="Enter New Password"
                    type={showNewPassword ? "text" : "password"}
                    size="lg"
                    {...register("newpassword")}
                  />
                  <Button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none cursor-pointer bg-transparent hover:bg-transparent shadow-none"
                    onClick={() => setShowNewPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {showNewPassword ? (
                      <IoMdEye size={22} />
                    ) : (
                      <IoMdEyeOff size={22} />
                    )}
                  </Button>
                </Box>
                {errors.newpassword && (
                  <span className="text-red-500 text-xs">
                    {errors.newpassword.message as string}
                  </span>
                )}
                {/* Confirm Password Field with Eye Icon */}
                <Box className="relative">
                  <Input
                    className="bg-white rounded-full pr-12"
                    placeholder="Confirm New Password"
                    type={showConfirmPassword ? "text" : "password"}
                    size="lg"
                    {...register("confirmpassword")}
                  />
                  <Button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none cursor-pointer bg-transparent hover:bg-transparent shadow-none"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <IoMdEye size={22} />
                    ) : (
                      <IoMdEyeOff size={22} />
                    )}
                  </Button>
                </Box>
                {errors.confirmpassword && (
                  <span className="text-red-500 text-xs">
                    {errors.confirmpassword.message as string}
                  </span>
                )}
              </Stack>
            </Box>

            <Box className="mt-12">
              <h1 className="text-xl font-semibold">
                Notification Preferences
              </h1>

              <Stack className="gap-6 mt-8 w-3xl max-sm:w-full">
                <Flex className="justify-between w-full rounded-md max-md:px-3">
                  <Stack className="gap-0">
                    <span className="text-[#7184B4]">Payment Alerts</span>
                    <h1 className="text-md max-md:text-sm">
                      Get notified when a client completes a transaction or a
                      payment is overdue.
                    </h1>
                  </Stack>
                  <Switch
                    checked={watch("paymentAlertNotifications")}
                    className="cursor-pointer"
                    color="red"
                    onCheckedChange={handlePaymentAlertsToggle}
                  />
                </Flex>
                <Flex className="justify-between w-full rounded-md max-md:px-3">
                  <Stack className="gap-0">
                    <span className="text-[#7184B4]">Invoice Reminders</span>
                    <h1 className="text-md max-md:text-sm">
                      Stay updated about upcoming invoice due dates, pending
                      payments, or cancellations.
                    </h1>
                  </Stack>
                  <Switch
                    className="cursor-pointer"
                    checked={watch("invoiceRemindersNotifications")}
                    onCheckedChange={handleInvoiceRemindersToggle}
                  />
                </Flex>
                <Flex className="justify-between w-full rounded-md max-md:px-3">
                  <Stack className="gap-0">
                    <span className="text-[#7184B4]">
                      Project Activity Updates
                    </span>
                    <h1 className="text-md max-md:text-sm">
                      Receive alerts on project status changes, task
                      assignments, and client interactions.
                    </h1>
                  </Stack>
                  <Switch
                    className="cursor-pointer"
                    checked={watch("projectActivityUpdatesNotifications")}
                    onCheckedChange={handleProjectUpdatesToggle}
                  />
                </Flex>

                {/* 2FA Section */}
                <TwoFAModal
                  isEnabled={is2FAEnabled}
                  onToggle={handleToggle2FA}
                  onVerifyOTP={handleVerifyOTP}
                  onResendOTP={handleResendOTP}
                  onDisable2FA={handleDisable2FA}
                  userEmail={userData?.user?.email || ""}
                />
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </form>
    </ComponentWrapper>
  );
};
