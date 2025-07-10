import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useGlobalNotifications } from "@/providers/notifications.provider";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { Bell, InboxIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Center } from "../../ui/center";
import { Badge } from "../../ui/badge";
import { Flex } from "../../ui/flex";
import { Box } from "../../ui/box";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const NotificationsDropdown: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { notifications, markAsRead } = useGlobalNotifications();
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "message":
        return <IoChatboxEllipsesOutline className="h-4 w-4" />;
      default:
        return <InboxIcon className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "message":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
    navigate("/dashboard/support");
  };

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className={cn(
                  "p-5 relative bg-white text-black hover:bg-white border border-gray-300 rounded-full cursor-pointer",
                  className
                )}
              >
                <Bell className="font-extralight" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-2 left-5.5 size-6 rounded-full bg-red-500 text-white text-[9px] font-medium border-2 border-gray-100">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent className="mt-2">
            <p>Notifications</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent align="end" className="max-w-[25rem] p-2">
        <DropdownMenuLabel className="mb-2">
          <Flex className="justify-between items-center">
            <span className="text-lg font-medium">Notifications</span>
            <Link
              to="/dashboard/support"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View All
            </Link>
          </Flex>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <Box className="space-y-1 max-h-[400px] overflow-y-auto">
          {notifications.slice(0, 5).map((notification) => (
            <Flex
              key={notification.id}
              className={cn(
                "gap-3 items-start p-2 rounded-lg cursor-pointer hover:bg-gray-50",
                !notification.isRead && "bg-blue-50"
              )}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <Center
                className={cn(
                  "h-8 w-8 rounded-full text-white",
                  getTypeColor(notification.type)
                )}
              >
                {getTypeIcon(notification.type)}
              </Center>
              <Box className="flex-1 space-y-1">
                <p
                  className={cn(
                    "text-sm font-medium",
                    !notification.isRead && "text-blue-600"
                  )}
                >
                  {notification.title}
                </p>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400">
                  {format(notification.timestamp, "PPp")}
                </p>
              </Box>
            </Flex>
          ))}
          {notifications.length === 0 && (
            <Box className="text-center py-4 text-gray-500">
              No notifications
            </Box>
          )}
        </Box>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
