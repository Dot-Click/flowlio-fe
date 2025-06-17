import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Center } from "../ui/center";
import { Stack } from "../ui/stack";
import { Flex } from "../ui/flex";

export const ProfilePhoto = () => {
  return (
    <Stack className="gap-0 min-h-4 w-md max-md:w-full border border-gray-300 rounded-md overflow-hidden mt-4">
      <Flex className="justify-between bg-white/50 p-4 border-b border-gray-300">
        <h1>William Smith</h1>
        <Center className="text-green-700 gap-2 font-semibold text-sm">
          <span className="bg-green-700 rounded-full min-h-2 w-2"></span>
          Super Admin
        </Center>
      </Flex>

      <Flex className="justify-between bg-accent p-6">
        <Avatar className="relative hover:z-1 border-2 border-white size-18">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button className="hover:bg-gray-800/50 cursor-pointer" size={"lg"}>
          Remove
        </Button>
      </Flex>
    </Stack>
  );
};
