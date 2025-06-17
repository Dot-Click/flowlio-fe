import { Box } from "../ui/box";
import { Flex } from "../ui/flex";
import { Stack } from "../ui/stack";
import { Switch } from "../ui/switch";

export const NotificationSettings = () => {
  const notifications = [
    "Project Notifications",
    "Task Notifications",
    "Schedule Notifications",
    "Cost Codes Notifications",
  ];

  return (
    <Box>
      <h1 className="text-xl font-semibold">Notification Perferences</h1>
      <h4 className="max-md:text-sm">
        Customize alerts for applications, reviews, and updates to suit your
        needs.
      </h4>

      <Stack className="gap-6 mt-8">
        {notifications.map((n, i) => (
          <Flex
            key={i}
            className="justify-between w-full bg-accent border border-gray-400/50  py-3 px-8 rounded-md max-md:px-3"
          >
            <h1 className="text-lg max-md:text-sm">{n}</h1>
            <Switch defaultChecked />
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};
