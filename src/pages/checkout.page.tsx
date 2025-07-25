import { useLocation, useNavigate } from "react-router";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Navbar } from "@/components/user section/navbar/navbar";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";

const planDetails = [
  {
    title: "Basic Plan (Free)",
    price: "00",
    description: "For personal use and small projects",
    duration: "7-Days Trial",
    features: ["Access to basic features", "Single user", "Email support"],
  },
  {
    title: "Pro Plan",
    price: "50",
    description: "For small businesses and teams",
    duration: "month",
    features: [
      "All Basic features",
      "Up to 10 users",
      "Priority email support",
      "Advanced analytics",
    ],
  },
  {
    title: "Enterprise Plan",
    price: "80",
    description: "For large businesses and enterprises",
    duration: "6 months",
    features: [
      "All Pro features",
      "Unlimited users",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
];

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlanIndex = location.state?.selectedPlan ?? null;
  const plan =
    selectedPlanIndex !== null ? planDetails[selectedPlanIndex] : null;

  useEffect(() => {
    if (!plan) {
      // If no plan, redirect back to pricing
      navigate("/pricing");
    }
    window.scrollTo(0, 0);
  }, [plan, navigate]);

  if (!plan) return null;

  return (
    <Box className="min-h-screen bg-gray-50 max-md:p-4">
      <Navbar />
      <Flex className="max-w-5xl mx-auto mt-3 items-start max-md:items-center flex-col md:flex-row gap-6">
        {/* Left: Plan Info */}
        <Box className="max-md:w-full flex-1 bg-gradient-to-r from-indigo-100 to-red-50 rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
          <p className="text-lg mb-1">
            ${plan.price} / {plan.duration}
          </p>
          <p className="mb-4">{plan.description}</p>
          <h3 className="font-semibold mb-2">Included Services:</h3>
          <ul className="mb-4 list-disc pl-5">
            {plan.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </Box>
        {/* Right: Payment Details */}
        <Box className="h-auto bg-gradient-to-r from-red-50 to-indigo-100 rounded-lg shadow p-8">
          <h2 className="text-xl font-semibold mb-4 font-Outfit">
            Personal Information
          </h2>
          <Flex className="gap-4 mb-4 max-md:flex-col">
            <Input
              className="border rounded-lg p-2 flex-1 bg-white h-12 "
              placeholder="Full Name"
            />
            <Input
              className="border rounded-lg p-2 flex-1 bg-white h-12"
              placeholder="Email"
            />
          </Flex>
          <h3 className="font-semibold mb-2">Payment Details</h3>
          <Flex className=" mb-4">
            <Button variant="outline" className="flex-1 cursor-pointer">
              <img
                src="/checkout/stripe.svg"
                alt="stripe"
                className="w-14 h-8 cursor-pointer hover:scale-110 transition-all duration-300"
              />
            </Button>
            <Button variant="outline" className="flex-1 cursor-pointer">
              <img
                src="/checkout/gpay.webp"
                alt="googlepay"
                className="w-10 h-5 cursor-pointer hover:scale-110 transition-all duration-300"
              />
            </Button>
          </Flex>
          <Input
            className="border rounded-lg p-2 mb-2 w-full bg-white h-12"
            placeholder="Cardholder Name"
          />
          <Input
            className="border rounded-lg p-2 mb-2 w-full bg-white h-12"
            placeholder="Card Number"
          />
          <Flex className="gap-2 mb-4">
            <Input
              className="border rounded-lg p-2 flex-1 bg-white h-12"
              placeholder="MM"
            />
            <Input
              className="border rounded-lg p-2 flex-1 bg-white h-12"
              placeholder="YYYY"
            />
            <Input
              className="border rounded-lg p-2 flex-1 bg-white h-12"
              placeholder="CVC/CVV"
            />
          </Flex>
          <div className="text-xs text-gray-500 mb-4">
            By clicking "Confirm Payment" I agree to the company's Terms of
            Service
          </div>
          <Button className="w-full">Confirm Payment</Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default CheckoutPage;
