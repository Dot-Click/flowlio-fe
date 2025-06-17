import { NotificationsDropdown } from "./notificationsdropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserProfile } from "../../common/userprofile";
import { ProjectSelector } from "./projectselector";
import { FaqDropdown } from "./faqdropdown";
import { Box } from "@/components/ui/box";
import { SearchBox } from "./searchbox";

export const HorizontalNavbar = () => {
  return (
    <Box className="pt-5 items-center grid max-md:grid-cols-[auto_auto_1fr_auto_auto_auto] grid-cols-[1fr_auto_auto_auto_auto] max-md:gap-1 gap-2">
      <SidebarTrigger className="min-md:hidden" />
      <UserProfile
        label="Hey, will"
        avatarClassName="size-12"
        src="https://github.com/shadcn.png"
        description="Monday, June 14, 2025"
      />
      <ProjectSelector selectTriggerClassname="min-w-[18rem] justify-self-center max-md:min-w-full" />
      <SearchBox />
      <NotificationsDropdown />
      <FaqDropdown className="max-md:hidden" />
    </Box>
  );
};
