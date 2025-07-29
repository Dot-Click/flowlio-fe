import { useLocation, useNavigate } from "react-router";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/user section/navbar/navbar";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUser } from "@/providers/user.provider";

const planDetails = [
  {
    title: "Basic Plan (Free)",
    price: "00",
    description: "For personal use and small projects",
    duration: "7-Days Trial",
    planId: "basic",
    features: ["Access to basic features", "Single user", "Email support"],
  },
  {
    title: "Pro Plan",
    price: "50",
    description: "For small businesses and teams",
    duration: "month",
    planId: "pro",
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
    planId: "enterprise",
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
  const { data: userData, isLoading: userLoading } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cardholderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });

  const selectedPlanIndex = location.state?.selectedPlan ?? null;
  const plan =
    selectedPlanIndex !== null ? planDetails[selectedPlanIndex] : null;

  useEffect(() => {
    if (!plan) {
      // If no plan, redirect back to pricing
      navigate("/pricing");
      return;
    }

    // Wait for user loading to complete before checking authentication
    if (userLoading) {
      return; // Still loading, wait
    }

    // If user is not authenticated after loading is complete, redirect to signup with plan info
    if (!userData?.user) {
      toast.info("Please sign up or login to complete your purchase");
      navigate("/signup", {
        state: {
          selectedPlan: selectedPlanIndex,
          redirectTo: "checkout",
        },
      });
      return;
    }

    // Pre-fill form with user data if available
    if (userData?.user) {
      setFormData((prev) => ({
        ...prev,
        fullName: userData.user.name || "",
        email: userData.user.email || "",
      }));
    }

    window.scrollTo(0, 0);
  }, [plan, navigate, userData, userLoading, selectedPlanIndex]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePayment = async () => {
    // Validate form
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.cardholderName ||
      !formData.cardNumber ||
      !formData.expiryMonth ||
      !formData.expiryYear ||
      !formData.cvc
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For now, just show success message since backend API is not implemented yet
      console.log("Payment simulation completed for plan:", plan?.title);

      setIsProcessing(false);
      toast.success(
        `Payment simulation successful! Your ${plan?.title} subscription would be active.`
      );

      // Redirect to dashboard after successful payment simulation
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setIsProcessing(false);
      toast.error("Payment failed. Please try again.");
      console.error("Payment error:", error);
    }
  };

  if (!plan || userLoading) {
    return (
      <Box className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {userLoading ? "Checking authentication..." : "Loading..."}
          </p>
        </div>
      </Box>
    );
  }

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

          {/* User Info Display */}
          {userData?.user && (
            <Box className="mt-4 p-4 bg-white rounded-lg">
              <h4 className="font-semibold mb-2">Purchasing for:</h4>
              <p className="text-sm text-gray-600">{userData.user.name}</p>
              <p className="text-sm text-gray-600">{userData.user.email}</p>
            </Box>
          )}
        </Box>

        {/* Right: Payment Details */}
        <Box className="h-auto bg-gradient-to-r from-red-50 to-indigo-100 rounded-lg shadow p-8">
          <h2 className="text-xl font-semibold mb-4 font-Outfit">
            Personal Information
          </h2>
          <Flex className="gap-4 mb-4 max-md:flex-col">
            <Input
              className="border rounded-lg p-2 flex-1 bg-white h-12"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
            />
            <Input
              className="border rounded-lg p-2 flex-1 bg-white h-12"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
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
            value={formData.cardholderName}
            onChange={(e) =>
              handleInputChange("cardholderName", e.target.value)
            }
          />
          <Input
            className="border rounded-lg p-2 mb-2 w-full bg-white h-12"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
          />
          <Flex className="gap-2 mb-4">
            <Input
              className="border rounded-lg p-2 flex-1 bg-white h-12"
              placeholder="MM"
              value={formData.expiryMonth}
              onChange={(e) => handleInputChange("expiryMonth", e.target.value)}
            />
            <Input
              className="border rounded-lg p-2 flex-1 bg-white h-12"
              placeholder="YYYY"
              value={formData.expiryYear}
              onChange={(e) => handleInputChange("expiryYear", e.target.value)}
            />
            <Input
              className="border rounded-lg p-2 flex-1 bg-white h-12"
              placeholder="CVC/CVV"
              value={formData.cvc}
              onChange={(e) => handleInputChange("cvc", e.target.value)}
            />
          </Flex>
          <div className="text-xs text-gray-500 mb-4">
            By clicking "Confirm Payment" I agree to the company's Terms of
            Service
          </div>
          <Button
            className="w-full"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing Payment..." : "Confirm Payment"}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default CheckoutPage;
