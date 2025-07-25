import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Checkbox } from "@/components/ui/checkbox";
import { Flex } from "@/components/ui/flex";
import { Stack } from "@/components/ui/stack";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router";

interface PricingProps {
  selectedPlan: number | null;
  setSelectedPlan: (plan: number | null) => void;
}

export const Pricing: FC<PricingProps> = ({
  selectedPlan,
  setSelectedPlan,
}) => {
  const pricingText = [
    "Choose from multiple secure payment options tailored to your needs.",
    "Easily manage and update your preferred pricing methods anytime.",
    "Set default payment modes for faster transactions.",
    "View detailed breakdowns of charges before confirming payments.",
    "Enjoy transparent pricing with no hidden fees or surprises.",
  ];

  const planDetails = [
    {
      title: "Basic Plan (Free)",
      price: "00",
      description: "For personal use and small projects",
      duration: "7-Days Trial",
    },
    {
      title: "Pro Plan",
      price: "50",
      description: "For small businesses and teams",
      duration: "month",
    },
    {
      title: "Enterprise Plan",
      price: "80",
      description: "For large businesses and enterprises",
      duration: "6 months",
    },
  ];

  const navigate = useNavigate();

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
              onClick={() =>
                setSelectedPlan(selectedPlan === index ? null : index)
              }
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
                      onChange={() =>
                        setSelectedPlan(selectedPlan === index ? null : index)
                      }
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
                onClick={() => {
                  if (selectedPlan === index) {
                    navigate("/checkout", { state: { selectedPlan } });
                  } else {
                    setSelectedPlan(index);
                  }
                }}
              >
                Get Started
              </Button>
            </Flex>
          ))}
        </Stack>
      </Flex>
    </Center>
  );
};
