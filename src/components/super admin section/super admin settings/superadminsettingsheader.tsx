import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { SettingsDelectAccount } from "./settingsdelectaccount";
import { SettingsNotification } from "./settingsnotification";
import { SettingsPasswordSecurity } from "./settingspasswordsecurity";
import { SettingsTwoFactor } from "./settingstwofactor";

export const SuperAdminSettingsHeader = () => {
  return (
    <ComponentWrapper className="mt-8 px-10 py-4 max-md:px-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <Stack className="gap-8">
        <Stack className="gap-0 min-h-4 w-md max-md:w-full border border-gray-200 rounded-md overflow-hidden mt-4">
          <Flex className="justify-between bg-white p-4 border-b border-gray-200">
            <h1>William Smith</h1>
            <Center className="text-green-600 gap-2 font-semibold text-sm">
              <span className="bg-green-600 rounded-full min-h-2 w-2"></span>
              Super Admin
            </Center>
          </Flex>

          <Flex className="justify-between bg-[#F8F8F8] p-6">
            <Avatar className="relative hover:z-1 border-2 border-white size-18">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="hover:bg-gray-800/50 cursor-pointer"
                    size={"lg"}
                  >
                    Remove
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="mb-1.5">
                  <p>Remove User</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Flex>
        </Stack>

        <SettingsNotification />
        <SettingsTwoFactor />
        <SettingsPasswordSecurity />
        {/* <SettingsDelectAccount /> */}
      </Stack>
    </ComponentWrapper>
  );
};
