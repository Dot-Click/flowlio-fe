import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { PageWrapper } from "../common/pagewrapper";
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

      <PageWrapper>
        <Flex className="justify-between max-md:flex-col max-md:items-start">
          <Box>
            <h1 className="text-2xl font-medium capitalize">Support Center</h1>
            <p className="text-gray-500 mt-1 max-md:text-sm">
              Need Help? We’ve Got You Covered.
            </p>
          </Box>
        </Flex>
      </PageWrapper>
    </ComponentWrapper>
  );
};

export default SupportHeader;
