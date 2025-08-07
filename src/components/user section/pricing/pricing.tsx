import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Checkbox } from "@/components/ui/checkbox";
import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import { useFetchPublicPlans } from "@/hooks/usefetchplans";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { FC } from "react";
import { useNavigate, useLocation } from "react-router";

interface PricingProps {
  selectedPlan: number | null;
  setSelectedPlan: (plan: number | null) => void;
}

const pricingText = [
  "Choose from multiple secure payment options tailored to your needs.",
  "Easily manage and update your preferred pricing methods anytime.",
  "Set default payment modes for faster transactions.",
  "View detailed breakdowns of charges before confirming payments.",
  "Enjoy transparent pricing with no hidden fees or surprises.",
];

export const Pricing: FC<PricingProps> = ({
  selectedPlan,
  setSelectedPlan,
}) => {
  const { data: plansResponse } = useFetchPublicPlans();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user came from signup
  const fromSignup = location.state?.fromSignup;

  // Compute planDetails inside the component using the fetched data
  const planDetails = [
    {
      title: "Basic Plan (Free)",
      price: plansResponse?.data?.[0]?.price,
      description: plansResponse?.data?.[0]?.description,
      duration: "7-Days Trial",
      features: Array.isArray(plansResponse?.data?.[0]?.features)
        ? plansResponse?.data?.[0]?.features
        : ["Access to basic features", "Single user", "Email support"],
    },
    {
      title: "Pro Plan",
      price: plansResponse?.data?.[1]?.price,
      description: plansResponse?.data?.[1]?.description,
      duration: "month",
      features: Array.isArray(plansResponse?.data?.[1]?.features)
        ? plansResponse?.data?.[1]?.features
        : [
            "All Basic features",
            "Up to 10 users",
            "Priority email support",
            "Advanced analytics",
          ],
    },
    {
      title: "Enterprise Plan",
      price: plansResponse?.data?.[2]?.price,
      description: plansResponse?.data?.[2]?.description,
      duration: "6 months",
      features: Array.isArray(plansResponse?.data?.[2]?.features)
        ? plansResponse?.data?.[2]?.features
        : [
            "All Pro features",
            "Unlimited users",
            "Dedicated account manager",
            "Custom integrations",
          ],
    },
  ];

  const handleGetStarted = (planIndex: number) => {
    if (fromSignup) {
      // If user came from signup, redirect to checkout with organization creation
      navigate("/checkout", {
        state: {
          selectedPlan: planIndex,
          fromSignup: true,
          createOrganization: true,
        },
      });
    } else {
      // Regular flow - just select the plan
      setSelectedPlan(selectedPlan === planIndex ? null : planIndex);
    }
  };

  return (
    <Center className="flex-col max-md:pb-10 ">
      <Stack className="text-center justify-center items-center px-4 max-sm:mt-5">
        <Flex className="text-center text-black font-[100] max-w-2xl max-sm:w-full text-4xl max-sm:text-3xl">
          Choose
          <Box className=" text-[#F98618] font-semibold"> The Ideal Plan</Box>
        </Flex>

        <Box className="w-lg max-sm:w-full font-[200] text-black text-[15px]">
          Get access to premium features designed to boost productivity and
          simplify your workflow with seamless performance.
        </Box>
      </Stack>

      <Flex className="p-2 gap-6 max-lg:flex-col mt-5">
        <Stack className="justify-center items-start border-2 py-12 px-10 border-gray-100 rounded-xl max-w-[28rem] max-sm:w-full bg-gradient-to-r from-indigo-50 to-white gap-3 relative z-0">
          {pricingText.map((text, index) => (
            <Flex key={index} className="gap-4">
              <Box>
                <Check className="size-4" />
              </Box>

              <h1 className="text-black text-[15px]">{text}</h1>
            </Flex>
          ))}
        </Stack>

        <Stack className="gap-4 relative z-10">
          {planDetails.map((plan, index) => (
            <Flex
              onClick={() => handleGetStarted(index)}
              key={index}
              className={`flex-col justify-between items-center px-6 py-8 rounded-xl gap-5 max-sm:p-5 transition-all duration-300 cursor-pointer ${
                selectedPlan === index
                  ? "bg-gradient-to-r from-indigo-300 to-indigo-300 shadow-lg shadow-blue-500/25 transform scale-105"
                  : "bg-gradient-to-r from-red-50 to-indigo-100 hover:shadow-md hover:shadow-gray-300/50"
              }`}
            >
              <Flex className="justify-between items-center w-full">
                <Flex className="items-start gap-2">
                  <Flex className="items-center gap-2">
                    <Checkbox
                      className="rounded-full size-4.5 cursor-pointer mb-6"
                      checked={selectedPlan === index}
                      onChange={() => handleGetStarted(index)}
                    />
                    <Flex className="flex-col items-start gap-0">
                      <Box
                        className={`text-[18px] font-semibold ${
                          selectedPlan === index
                            ? "text-white"
                            : "text-[#353333]"
                        }`}
                      >
                        {plan.title}
                      </Box>
                      <Box
                        className={`text-[15px] font-light ${
                          selectedPlan === index
                            ? "text-white/90"
                            : "text-[#353333]"
                        }`}
                      >
                        {plan.description}
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  className={
                    selectedPlan === index ? "text-white" : "text-black"
                  }
                >
                  <h1 className="font-semibold">$ {plan.price}</h1>
                  <h1 className="font-light">/{plan.duration}</h1>
                </Flex>
              </Flex>

              <Button
                variant="ghost"
                className={cn(
                  "bg-gradient-to-r from-white to-indigo-300 cursor-pointer border border-gray-200 px-4 py-2 rounded-lg hidden hover:border-white font-Outfit text-sm text-gray-800",
                  selectedPlan === index && "max-sm:flex"
                )}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent onClick
                  handleGetStarted(index);
                }}
              >
                {fromSignup ? "Continue to Setup" : "Get Started"}
              </Button>
            </Flex>
          ))}
        </Stack>
      </Flex>
    </Center>
  );
};
