import { PageWrapper } from "@/components/common/pagewrapper";
import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useNotifications,
  useDeleteNotification,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
  useDeleteAllNotifications,
  type Notification,
} from "@/hooks/useNotifications";
import { format } from "date-fns";
import { Bell, Trash2, Check, CheckCheck, X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NotificationsPage = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const limit = 20;

  const { data, isLoading, error, refetch } = useNotifications({
    page,
    limit,
    unreadOnly: filter === "unread",
  });

  const deleteNotificationMutation = useDeleteNotification();
  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();
  const deleteAllMutation = useDeleteAllNotifications();

  const notifications = data?.data?.notifications || [];
  const pagination = data?.data?.pagination;

  const handleDelete = async (id: string) => {
    try {
      await deleteNotificationMutation.mutateAsync(id);
      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete notification: " + error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsReadMutation.mutateAsync(id);
    } catch (error) {
      toast.error("Failed to mark notification as read: " + error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsReadMutation.mutateAsync();
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all as read: " + error);
    }
  };

  const handleDeleteAll = async () => {
    if (
      !confirm(
        "Are you sure you want to delete all notifications? This cannot be undone."
      )
    ) {
      return;
    }
    try {
      await deleteAllMutation.mutateAsync();
      toast.success("All notifications deleted");
    } catch (error) {
      toast.error("Failed to delete all notifications: " + error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "user_subscribed":
      case "new_company_registered":
        return "🏢";
      case "project_completed":
        return "✅";
      case "new_user_signed_up":
        return "👤";
      default:
        return "🔔";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "user_subscribed":
        return "bg-blue-100 text-blue-800";
      case "new_company_registered":
        return "bg-green-100 text-green-800";
      case "project_completed":
        return "bg-purple-100 text-purple-800";
      case "new_user_signed_up":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <PageWrapper className="mt-6 px-4">
        <Box className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading notifications...</p>
          </div>
        </Box>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper className="mt-6 px-4">
        <Box className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">Error loading notifications</p>
            <Button onClick={() => refetch()} className="mt-4">
              Retry
            </Button>
          </div>
        </Box>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="mt-6 px-4">
      <Flex className="justify-between items-center mb-6">
        <Flex className="items-center gap-3 mt-4">
          <Bell className="w-6 h-6 text-gray-700" />
          <h1 className="text-2xl font-semibold text-gray-900">
            Notifications
          </h1>
          {pagination && pagination.totalNotifications > 0 && (
            <Badge className="bg-blue-100 text-blue-800">
              {pagination.totalNotifications}
            </Badge>
          )}
        </Flex>

        <Flex className="gap-2">
          <Select
            value={filter}
            onValueChange={(v: "all" | "unread") => setFilter(v)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
            </SelectContent>
          </Select>

          {notifications.length > 0 && (
            <>
              <Button
                variant="outline"
                onClick={handleMarkAllAsRead}
                disabled={markAllAsReadMutation.isPending}
                className="flex items-center gap-2"
              >
                <CheckCheck className="w-4 h-4" />
                Mark All Read
              </Button>
              <Button
                variant="outline"
                onClick={handleDeleteAll}
                disabled={deleteAllMutation.isPending}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Delete All
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      <ComponentWrapper className="bg-white border border-gray-200 shadow-none">
        {notifications.length === 0 ? (
          <Box className="flex flex-col items-center justify-center py-16">
            <Bell className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-medium">
              {filter === "unread"
                ? "No unread notifications"
                : "No notifications yet"}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              You'll see notifications here when there are updates
            </p>
          </Box>
        ) : (
          <Stack className="gap-0 divide-y divide-gray-200">
            {notifications.map((notification: Notification) => (
              <Box
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  !notification.read ? "bg-blue-50/30" : ""
                }`}
              >
                <Flex className="justify-between items-start gap-4">
                  <Flex className="gap-3 flex-1">
                    <Box
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${getNotificationColor(
                        notification.type
                      )}`}
                    >
                      {getNotificationIcon(notification.type)}
                    </Box>
                    <Box className="flex-1">
                      <Flex className="items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <Badge className="bg-blue-600 text-white text-xs">
                            New
                          </Badge>
                        )}
                      </Flex>
                      <p className="text-gray-700 text-sm mb-2">
                        {notification.message}
                      </p>
                      {notification.data &&
                        Object.keys(notification.data).length > 0 && (
                          <Box className="bg-gray-50 rounded-lg p-3 mt-2 text-xs">
                            {Object.entries(notification.data).map(
                              ([key, value]) => (
                                <Flex
                                  key={key}
                                  className="justify-between mb-1 last:mb-0"
                                >
                                  <span className="font-medium text-gray-600">
                                    {key}:
                                  </span>
                                  <span className="text-gray-700">
                                    {String(value)}
                                  </span>
                                </Flex>
                              )
                            )}
                          </Box>
                        )}
                      <p className="text-gray-400 text-xs mt-2">
                        {format(
                          new Date(notification.createdAt),
                          "MMM dd, yyyy 'at' h:mm a"
                        )}
                      </p>
                    </Box>
                  </Flex>

                  <Flex className="gap-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                        disabled={markAsReadMutation.isPending}
                        className="h-8 w-8 p-0"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(notification.id)}
                      disabled={deleteNotificationMutation.isPending}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      title="Delete notification"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Stack>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <Flex className="justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages} (
              {pagination.totalNotifications} total)
            </p>
            <Flex className="gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!pagination.hasPrevPage || isLoading}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={!pagination.hasNextPage || isLoading}
              >
                Next
              </Button>
            </Flex>
          </Flex>
        )}
      </ComponentWrapper>
    </PageWrapper>
  );
};

export default NotificationsPage;
