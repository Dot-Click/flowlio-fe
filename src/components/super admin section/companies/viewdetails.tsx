import { ComponentWrapper } from "@/components/common/componentwrapper";
import { PageWrapper } from "@/components/common/pagewrapper";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router";
import { ViewTable } from "./viewtable";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export const ViewDetails = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper className="mt-6 px-4 sm:px-6">
      <Box
        className="flex items-center gap-2 w-fit cursor-pointer transition-all duration-300 hover:bg-gray-200 rounded-full hover:p-2 mt-4"
        onClick={() => navigate(-1)}
      >
        <IoArrowBack />
        <p className="text-black">Back</p>
      </Box>

      <h1 className="text-black text-xl font-medium mt-2">Company Details</h1>

      <Flex className="gap-3 items-start flex-col lg:flex-row w-full mt-4">
        {/* Company Info Card */}
        <ComponentWrapper className="bg-white w-full lg:w-72 xl:w-72 border border-gray-200 shadow-none flex flex-col min-h-[600px] lg:min-h-screen ">
          <Box className="flex-1">
            <h1 className="p-4 pb-2 text-lg font-medium">Company Info</h1>
            <Stack className="justify-center items-center mt-4">
              <img
                src="/super admin/viewdetailsimg.png"
                alt="company"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
              />
              <h1 className="text-lg font-semibold mt-2">Innovate Labs</h1>
              <p className="text-gray-600 text-sm">ID: DOTV-001</p>
              <Flex className="capitalize w-28 h-10 gap-2 border justify-center items-center text-white bg-white border-[#00A400] rounded-full mt-2">
                <Center className="gap-2">
                  <Flex className="w-2 h-2 items-start rounded-full bg-[#00A400]" />
                  <h1 className="text-[#00A400] text-sm font-medium">Active</h1>
                </Center>
              </Flex>
            </Stack>
            <hr className="border border-gray-200 mt-6" />
            <Stack className="mt-6 px-4 gap-6 ml-6">
              <Flex className="gap-3 items-center">
                <Phone className="font-light size-4 text-gray-500" />
                <h1 className="text-gray-600 text-sm">+92 300 1234567</h1>
              </Flex>
              <Flex className="gap-3 items-center">
                <Mail className="font-light size-4 text-gray-500" />
                <h1 className="text-gray-600 text-sm break-all">
                  contact@innovatelabs.com
                </h1>
              </Flex>
              <Flex className="gap-3 items-center">
                <MapPin className="font-light size-4 text-gray-500" />
                <h1 className="text-gray-600 text-sm">XYZ Building, NY</h1>
              </Flex>
            </Stack>
          </Box>
          <Center className="w-full p-4 pt-0">
            <Button className="bg-[#B92323] text-white rounded-full w-full h-12 hover:bg-[#B92323]/80 cursor-pointer">
              Delete Company
            </Button>
          </Center>
        </ComponentWrapper>

        {/* Right Section */}
        <Flex className="items-start gap-3  flex-1 w-full flex-col">
          {/* Top Cards Row */}
          <Flex className="flex-1 flex-col lg:flex-row w-full gap-3">
            {/* Additional Info Card */}
            <ComponentWrapper className="w-full lg:flex-1 bg-white px-4 py-4 border border-gray-200 shadow-none h-44 max-sm:h-full">
              <h1 className="font-medium text-lg mb-4">Additional Info</h1>

              <Flex className="justify-between items-center gap-3 flex-col sm:flex-row">
                <Center className="gap-3 bg-[#f8fafb] rounded-lg p-4 w-full sm:w-auto flex-1 max-sm:justify-between">
                  <img
                    src="/super admin/viewdetailicon.svg"
                    className="size-10 sm:size-11"
                    alt="super admin"
                  />
                  <Flex className="gap-1 flex-col items-start">
                    <h2 className="font-medium text-sm ">Total Employees</h2>
                    <h2 className="font-semibold text-xl sm:text-2xl">46</h2>
                  </Flex>
                </Center>

                <Center className="gap-3 bg-[#f8fafb] rounded-lg p-4 w-full sm:w-auto flex-1 max-sm:justify-between">
                  <img
                    src="/super admin/viewdetailicon.svg"
                    className="size-10 sm:size-11"
                    alt="super admin"
                  />
                  <Flex className="gap-1 flex-col items-start">
                    <h2 className="font-medium text-sm">Active Projects</h2>
                    <h2 className="font-semibold text-xl sm:text-2xl">24</h2>
                  </Flex>
                </Center>
              </Flex>
            </ComponentWrapper>

            {/* Subscription Plan Card */}
            <ComponentWrapper className="w-full lg:w-74 bg-white px-4 py-4 border border-gray-200 shadow-none h-44">
              <Flex className="justify-between items-center mb-6">
                <h1 className="font-medium text-lg">Subscription Plan</h1>
                <Flex className="capitalize w-18 h-7 gap-2 border justify-center items-center text-white bg-white border-[#00A400] rounded-full">
                  <Center className="gap-2">
                    <Flex className="w-1.5 h-1.5 items-start rounded-full bg-[#00A400]" />
                    <h1 className="text-[#00A400] text-xs">Active</h1>
                  </Center>
                </Flex>
              </Flex>
              <Center className="justify-between gap-3 py-4 w-full">
                <Stack className="gap-1">
                  <img
                    src="/super admin/plan.svg"
                    className="size-5"
                    alt="super admin"
                  />
                  <h1 className="font-medium text-sm">Premium Plan</h1>
                </Stack>
                <Flex className="gap-0 items-baseline">
                  <h2 className="font-bold text-4xl sm:text-5xl lg:text-5xl">
                    $59
                  </h2>
                  <span className="text-gray-600 text-sm">/mo</span>
                </Flex>
              </Center>
            </ComponentWrapper>
          </Flex>

          {/* ViewTable Component */}
          <ComponentWrapper className="w-full bg-white border border-gray-200 shadow-none">
            <ViewTable />
          </ComponentWrapper>
        </Flex>
      </Flex>
    </PageWrapper>
  );
};
