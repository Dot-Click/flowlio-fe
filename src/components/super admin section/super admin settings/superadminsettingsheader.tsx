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
import {
  GeneralModal,
  useGeneralModalDisclosure,
} from "@/components/common/generalmodal";
// import { SettingsDelectAccount } from "./settingsdelectaccount";
import { SettingsNotification } from "./settingsnotification";
import { SettingsPasswordSecurity } from "./settingspasswordsecurity";
import { SettingsTwoFactor } from "./settingstwofactor";
import { UpdateProfileImageContent } from "./updateprofileimagecontent";

export const SuperAdminSettingsHeader = ({ user }: { user: any }) => {
  const modalProps = useGeneralModalDisclosure();

  const handleChangeLogo = () => {
    modalProps.onOpenChange(true);
  };

  const handleCloseImageModal = () => {
    modalProps.onOpenChange(false);
  };

  // Add null check for user
  if (!user) {
    return (
      <ComponentWrapper className="mt-8 px-10 py-4 max-md:px-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="mt-4 text-gray-500">Loading user data...</div>
      </ComponentWrapper>
    );
  }

  return (
    <ComponentWrapper className="mt-8 px-10 py-4 max-md:px-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <Stack className="gap-8">
        <Stack className="gap-0 min-h-4 w-md max-md:w-full border border-gray-200 rounded-md overflow-hidden mt-4">
          <Flex className="justify-between bg-white p-4 border-b border-gray-200">
            <h1>{user.name || "User"}</h1>
            <Center className="text-green-600 gap-2 font-semibold text-sm">
              <span className="bg-green-600 rounded-full min-h-2 w-2 animate-pulse"></span>
              {user.role === "superadmin"
                ? "Super Admin"
                : user.role === "subadmin"
                ? "Sub Admin"
                : user.role === "user"
                ? "User"
                : "Unknown"}
            </Center>
          </Flex>

          <Flex className="justify-between bg-[#F8F8F8] p-6">
            <Avatar className="relative hover:z-1 border-2 border-white size-18">
              <AvatarImage
                src={user.image || "https://github.com/shadcn.png"}
                alt={user.name || "User"}
              />
              <AvatarFallback>
                {(user.name || "User")?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <Flex className="gap-2 flex-col">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="hover:bg-gray-400/50 cursor-pointer bg-gray-200 text-gray-600 border-gray-300 border"
                      size={"lg"}
                      onClick={handleChangeLogo}
                    >
                      Change Logo
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="mb-1.5">
                    <p>Change Profile Picture</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="hover:bg-gray-800/50 cursor-pointer"
                      size={"lg"}
                    >
                      Remove User
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="mb-1.5">
                    <p>Remove User Account Permanently</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Flex>
          </Flex>
        </Stack>

        <SettingsNotification />
        <SettingsTwoFactor />
        <SettingsPasswordSecurity />
        {/* <SettingsDelectAccount /> */}
      </Stack>

      {/* Profile Image Update Modal */}
      <GeneralModal {...modalProps}>
        <UpdateProfileImageContent
          onClose={handleCloseImageModal}
          currentImage={user.image}
          userName={user.name || "User"}
        />
      </GeneralModal>
    </ComponentWrapper>
  );
};
