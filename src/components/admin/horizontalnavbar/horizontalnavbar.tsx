import { NotificationsDropdown } from "./notificationsdropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserProfile } from "../../common/userprofile";
import { ProjectSelector } from "./projectselector";
// import { FaqDropdown } from "./faqdropdown";
import { Box } from "@/components/ui/box";
import { SearchBox } from "./searchbox";
import { useLocation } from "react-router";
import { cn } from "@/lib/utils";

export const HorizontalNavbar = () => {
  const { pathname } = useLocation();

  return (
    <Box
      className={cn(
        "pt-5 items-center grid max-md:grid-cols-[auto_auto_1fr_auto_auto_auto] grid-cols-[1fr_auto_auto_auto_auto] gap-2",
        pathname !== "/dashboard" && "gap-0.5",
        pathname === "/superadmin" && "gap-1"
      )}
    >
      <SidebarTrigger className="min-md:hidden" />
      <UserProfile
        label="Hey, will"
        avatarClassName="size-12"
        src="https://github.com/shadcn.png"
        description="Monday, June 14, 2025"
      />
      {pathname === "/dashboard" && (
        <>
          <ProjectSelector selectTriggerClassname="min-w-[12rem] justify-self-center max-md:min-w-full" />

          <SearchBox />
        </>
      )}
      {pathname === "/superadmin" && <SearchBox />}

      <NotificationsDropdown className="max-lg:ml-auto" />
      {/* <FaqDropdown className="max-md:hidden" /> */}
    </Box>
  );
};
