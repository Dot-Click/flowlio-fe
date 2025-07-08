import { PageWrapper } from "@/components/common/pagewrapper";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";

export const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  return (
    <PageWrapper className="mt-6 p-6">
      <Box
        className="flex items-center gap-2 w-20 cursor-pointer transition-all duration-300  hover:bg-gray-200 rounded-full hover:p-2 "
        onClick={() => navigate(-1)}
      >
        <IoArrowBack />
        <p className="text-black">Back</p>
      </Box>

      <h1 className="text-black text-2xl font-normal mt-2">Company Details</h1>
      <Flex className="gap-0">
        <Box className="min-w-56 h-full border-1 border-gray-200 rounded-md">
          <h1>Company Info</h1>
          <Stack>
            <img
              src="/logo/logo.png"
              alt="company"
              className="w-32 h-32 rounded-full"
            />
            <h1>Company Name</h1>
            <p>Company Name</p>
            <h1>Company Name</h1>
          </Stack>
          <hr className="border-1 border-gray-200" />
          <Stack>
            <h1>Company Name</h1>
            <p>Company Name</p>
            <h1>Company Name</h1>
          </Stack>
        </Box>
      </Flex>
    </PageWrapper>
  );
};
