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
import React, { useRef, useState } from "react";

const settingsSchema = z
  .object({
    avatar: z.any().optional(),
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
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
    paymentAlertNotifications: z.boolean(),
    invoiceRemindersNotifications: z.boolean(),
    projectActivityUpdatesNotifications: z.boolean(),
  })
  .refine((data) => data.newpassword === data.confirmpassword, {
    message: "New password and confirm password must match.",
    path: ["confirmpassword"],
  });

export const SettingsHeader = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      avatar: undefined,
      fullName: "",
      email: "william@gmail.com",
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

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function onSubmit(values: z.infer<typeof settingsSchema>) {
    console.log(values);
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

  return (
    <ComponentWrapper className="mt-8 px-6 py-5 max-md:px-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center className="justify-between">
          <Stack className="gap-0">
            <h1 className="text-2xl font-medium">Setting</h1>
            <h1 className="text-gray-500 font-normal">
              Need Help? We've Got You Covered.
            </h1>
          </Stack>
          <Button
            type="submit"
            variant="outline"
            className="bg-black text-white border border-gray-200  rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer h-11"
          >
            Save Changes
          </Button>
        </Center>

        <Stack className="gap-8 mt-4">
          <Stack className="w-full bg-white border-1 border-gray-200 p-8 rounded-xl max-md:px-3 ">
            <h1 className="text-xl font-medium">User Profile</h1>

            <Flex className="justify-between w-xs max-sm:w-full">
              <img
                src={avatarPreview || "/dashboard/1.svg"}
                alt="Profile"
                className="rounded-full bg-cover bg-center w-26 h-26 border-2 border-dashed border-gray-600"
              />

              <Flex className="flex-col gap-2">
                <Button
                  type="button"
                  className="bg-black text-white rounded-full flex items-center gap-2 cursor-pointer h-10 w-30 hover:bg-black/80"
                  onClick={handleChooseFile}
                >
                  Choose File
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
                  disabled={!avatarPreview}
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
            <h1 className="text-2xl font-semibold">Password & Security</h1>

            <Box className=" bg-[#f6fcfe] border border-white mt-4 min-h-6 w-3xl p-4 rounded-md max-md:w-full max-md:text-xs">
              Your password must be at least 8 characters and should include a
              combination of numbers, letters and special characters (!$@%+).
            </Box>

            <Stack className="gap-6 mt-8 w-3xl max-md:w-full">
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
                  placeholder="Enter Confirm New Password"
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
                    onCheckedChange={(val) =>
                      setValue("paymentAlertNotifications", val)
                    }
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
                    onCheckedChange={(val) =>
                      setValue("invoiceRemindersNotifications", val)
                    }
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
                    onCheckedChange={(val) =>
                      setValue("projectActivityUpdatesNotifications", val)
                    }
                  />
                </Flex>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </form>
    </ComponentWrapper>
  );
};
