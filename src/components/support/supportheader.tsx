import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";

const SupportHeader = () => {
  return (
    <ComponentWrapper className="mt-6 p-5 shadow-none">
      <Flex className="justify-between max-md:flex-col max-md:items-start">
        <Box>
          <h1 className="text-2xl font-medium capitalize">Support Center</h1>
          <p className="text-gray-500 mt-1 max-md:text-sm">
            Need Help? We’ve Got You Covered.
          </p>
        </Box>
      </Flex>

      <Flex className="justify-between max-md:flex-col max-md:items-start bg-white p-5 rounded-lg border border-gray-200 mt-5">
        <Box>
          <h1 className="text-md font-medium capitalize">Your Ticket</h1>
          <p className="text-gray-500 mt-1 max-md:text-sm">
            You have no ticket yet! Create one by hitting the
            <span className="underline text-blue-500"> Create Button</span>
          </p>
        </Box>

        <p>herebutton</p>
      </Flex>
    </ComponentWrapper>
  );
};

export default SupportHeader;
