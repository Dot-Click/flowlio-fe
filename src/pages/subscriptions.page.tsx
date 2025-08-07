import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import { useFetchUserSubscriptions } from "@/hooks/usecreateorganization";
import { toast } from "sonner";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ComponentWrapper } from "@/components/common/componentwrapper";

const SubscriptionsPage = () => {
  const navigate = useNavigate();
  const {
    data: subscriptionsResponse,
    isLoading,
    error,
  } = useFetchUserSubscriptions();

  useEffect(() => {
    if (error) {
      toast.error("Failed to load subscriptions");
    }
  }, [error]);

  if (isLoading) {
    return (
      <Box className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscriptions...</p>
        </div>
      </Box>
    );
  }

  const subscriptions = subscriptionsResponse?.data || [];

  return (
    <ComponentWrapper className=" bg-gray-50 p-8 mt-5">
      <Center className="flex-col max-md:pb-10">
        <Stack className="text-center justify-center items-center px-4 max-sm:mt-5">
          <Flex className="text-center text-black font-[100] max-w-2xl max-sm:w-full text-4xl max-sm:text-3xl">
            My
            <Box className=" text-[#F98618] font-semibold"> Subscriptions</Box>
          </Flex>

          <Box className="w-lg max-sm:w-full font-[200] text-black text-[15px]">
            Manage your active subscriptions and billing information.
          </Box>
        </Stack>

        {subscriptions.length === 0 ? (
          <Box className="mt-8 p-8 bg-white rounded-lg shadow text-center">
            <Box className="text-xl font-semibold mb-2">
              No Active Subscriptions
            </Box>
            <Box className="text-gray-600 mb-4">
              You don't have any active subscriptions yet.
            </Box>
            <Button
              onClick={() => (window.location.href = "/pricing")}
              className="bg-[#1797B9] text-white rounded-full hover:bg-[#1797B9]/80"
            >
              Browse Plans
            </Button>
          </Box>
        ) : (
          <Stack className="gap-6 mt-8 max-w-4xl w-full px-4">
            {subscriptions.map((subscription) => (
              <Box
                key={subscription.id}
                className="bg-white rounded-lg shadow p-6"
              >
                <Flex className="justify-between items-start mb-4">
                  <Box>
                    <Box className="text-xl font-semibold mb-1">
                      {subscription.organization.name}
                    </Box>
                    <Box className="text-sm text-gray-600">
                      {subscription.plan.name} Plan
                    </Box>
                  </Box>
                  <Box
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      subscription.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {subscription.status.charAt(0).toUpperCase() +
                      subscription.status.slice(1)}
                  </Box>
                </Flex>

                <Flex className="gap-8 mb-4">
                  <Box>
                    <Box className="text-sm text-gray-600">Plan Price</Box>
                    <Box className="font-semibold">
                      ${subscription.plan.price}/
                      {subscription.plan.billingCycle}
                    </Box>
                  </Box>
                  <Box>
                    <Box className="text-sm text-gray-600">Your Role</Box>
                    <Box className="font-semibold capitalize">
                      {subscription.userRole}
                    </Box>
                  </Box>
                  <Box>
                    <Box className="text-sm text-gray-600">Trial Ends</Box>
                    <Box className="font-semibold">
                      {new Date(subscription.trialEnd).toLocaleDateString()}
                    </Box>
                  </Box>
                  <Box>
                    <Box className="text-sm text-gray-600">Next Billing</Box>
                    <Box className="font-semibold">
                      {new Date(
                        subscription.currentPeriodEnd
                      ).toLocaleDateString()}
                    </Box>
                  </Box>
                </Flex>

                <Box className="text-sm text-gray-600 mb-4">
                  {subscription.plan.description}
                </Box>

                <Button
                  variant="outline"
                  className="flex-1 h-12"
                  onClick={() => navigate("/dashboard/settings")}
                >
                  Organization Settings
                </Button>
              </Box>
            ))}
          </Stack>
        )}
      </Center>
    </ComponentWrapper>
  );
};

export default SubscriptionsPage;
