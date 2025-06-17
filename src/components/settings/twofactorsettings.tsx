import { Switch } from "../ui/switch";
import { Stack } from "../ui/stack";
import { Flex } from "../ui/flex";

export const TwoFactorSettings = () => {
  return (
    <Flex className="justify-between w-full bg-white border border-gray-400/50  p-8 rounded-md max-md:px-3">
      <Stack>
        <h1 className="text-3xl font-semibold max-sm:text-xl">
          Two-Factor Authentication (2FA)
        </h1>
        <h1 className="max-md:text-xs">
          Choose Two-Factor Authentication (2FA) option for smart security
        </h1>
      </Stack>

      <Switch defaultChecked />
    </Flex>
  );
};
