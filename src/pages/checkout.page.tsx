import { useLocation, useNavigate } from "react-router";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/user section/navbar/navbar";
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUser } from "@/providers/user.provider";
import { useFetchPublicPlans } from "@/hooks/usefetchplans";
import { useCreateOrganizationWithPlan } from "@/hooks/usecreateorganization";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

// Function to convert database features to display format
const formatPlanFeatures = (planFeatures: any) => {
  if (!planFeatures) return [];

  const features = [];

  // Add custom features from database
  if (
    planFeatures.customFeatures &&
    Array.isArray(planFeatures.customFeatures)
  ) {
    features.push(...planFeatures.customFeatures);
  }

  return features;
};

const formSchema = z.object({
  organizationName: z
    .string()
    .min(1, { message: "Organization name is required" }),
  cardholderName: z.string().min(1, { message: "Cardholder name is required" }),
  cardNumber: z.string().min(13, { message: "Valid card number is required" }),
  expiryMonth: z.string().min(1, { message: "Expiry month is required" }),
  expiryYear: z.string().min(1, { message: "Expiry year is required" }),
  cvc: z.string().min(3, { message: "CVC is required" }),
});

const CheckoutPage = () => {
  useEffect(() => {
    scrollTo(0, 0);
    document.title = "Checkout - Flowlio";
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const { data: userData, isLoading: userLoading } = useUser();
  const { data: plansResponse } = useFetchPublicPlans();
  const createOrganizationMutation = useCreateOrganizationWithPlan();
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPlanIndex = location.state?.selectedPlan ?? null;
  const createOrganization = location.state?.createOrganization;

  // Fallback: check URL parameters if navigation state is lost
  const urlParams = new URLSearchParams(location.search);
  const fallbackPlanIndex = urlParams.get("plan");
  const finalPlanIndex =
    selectedPlanIndex ??
    (fallbackPlanIndex ? parseInt(fallbackPlanIndex) : null);

  // Get plan details with dynamic features from database
  const planDetails = [
    {
      title: plansResponse?.data?.[0]?.name || "Basic Plan (Free)",
      price: plansResponse?.data?.[0]?.price || "Free",
      description:
        plansResponse?.data?.[0]?.description ||
        "Personal use and small projects",
      duration: "7-Days Trial",
      features: formatPlanFeatures(plansResponse?.data?.[0]?.features),
    },
    {
      title: plansResponse?.data?.[1]?.name || "Pro Plan",
      price: plansResponse?.data?.[1]?.price || "$29",
      description:
        plansResponse?.data?.[1]?.description ||
        "Professional teams and growing businesses",
      duration: "month",
      features: formatPlanFeatures(plansResponse?.data?.[1]?.features),
    },
    {
      title: plansResponse?.data?.[2]?.name || "Enterprise Plan",
      price: plansResponse?.data?.[2]?.price || "$99",
      description:
        plansResponse?.data?.[2]?.description ||
        "Large organizations with complex needs",
      duration: "6 months",
      features: formatPlanFeatures(plansResponse?.data?.[2]?.features),
    },
  ];

  // Get the selected plan with better fallback logic
  const plan = finalPlanIndex !== null ? planDetails[finalPlanIndex] : null;
  const selectedPlan = plansResponse?.data?.find(
    (_, index) => index === finalPlanIndex
  );

  // Debug logging for plan selection
  console.log("🔍 Plan selection debug:", {
    selectedPlanIndex,
    locationState: location.state,
    plan,
    planDetails,
    plansResponse: plansResponse?.data,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: "",
      cardholderName: userData?.user?.name || "",
      cardNumber: "4444 4444 4444 4444",
      expiryMonth: "08",
      expiryYear: "2025",
      cvc: "123",
    },
  });

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

    // If user is not authenticated after loading is complete, redirect to signup
    if (!userData?.user) {
      toast.info("Please sign up or login to complete your purchase");
      // Redirect to signup with plan information
      navigate("/auth/signup", {
        state: {
          selectedPlan: finalPlanIndex,
          redirectTo: "checkout",
          planDetails: plan,
        },
      });
      return;
    }

    // Pre-fill form with user data if available
    if (userData?.user) {
      form.setValue("cardholderName", userData.user.name || "");
    }

    window.scrollTo(0, 0);
  }, [plan, navigate, userData, userLoading, finalPlanIndex, form]);

  // Add a separate effect to handle authentication state changes
  useEffect(() => {
    // If user becomes authenticated and we have a plan, we can proceed
    if (userData?.user && plan && !userLoading) {
      // User is authenticated and we have a plan, pre-fill the form
      form.setValue("cardholderName", userData.user.name || "");
    }
  }, [userData?.user, plan, userLoading, form]);

  // Add debug logging to understand the flow
  useEffect(() => {
    console.log("🔍 Checkout page state:", {
      hasPlan: !!plan,
      planIndex: finalPlanIndex,
      userLoading,
      hasUser: !!userData?.user,
      userId: userData?.user?.id,
      userEmail: userData?.user?.email,
      locationState: window.history.state?.usr,
    });
  }, [plan, finalPlanIndex, userLoading, userData]);

  // Log when the component mounts
  useEffect(() => {
    console.log("🚀 Checkout page mounted");
    console.log("📋 Location state:", window.history.state?.usr);
    console.log("📋 Current URL:", window.location.href);
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!userData?.user || !selectedPlan) {
      toast.error("User or plan information is missing");
      return;
    }

    setIsProcessing(true);

    try {
      // DEMO: Simulate payment processing instead of calling the API
      console.log("Demo: Simulating payment processing...");

      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate successful payment
      console.log("Demo: Payment processed successfully!");
      toast.success("Payment processed successfully! (Demo Mode)");

      // Then, create organization with plan
      if (createOrganization) {
        try {
          await createOrganizationMutation.mutateAsync({
            userId: userData.user.id,
            organizationName: data.organizationName,
            planId: selectedPlan.id,
          });

          toast.success("Organization created successfully!");
        } catch (orgError) {
          console.error("Organization creation error:", orgError);
          toast.error(
            "Payment successful but organization setup failed. Please contact support."
          );
          setIsProcessing(false);
          return;
        }
      }

      // Redirect to dashboard after successful setup
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsProcessing(false);
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

      {/* Demo Mode Indicator */}
      <Box className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
        <Flex className="items-center">
          <Box className="text-sm">
            <strong>Demo Mode:</strong> This is a demonstration. No actual
            payment will be processed.
          </Box>
        </Flex>
      </Box>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Flex className="max-w-5xl mx-auto mt-3 items-start max-md:items-center flex-col md:flex-row gap-6">
            {/* Left: Plan Info */}
            <Box className="max-md:w-full flex-1 bg-gradient-to-r from-indigo-100 to-red-50 rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold mb-2">
                {plan?.title || "Plan Details"}
              </h2>
              <p className="text-lg mb-1">
                {plan?.price ? `$${plan.price}` : "Free"} /{" "}
                {plan?.duration || "Trial"}
              </p>
              <p className="mb-4">
                {plan?.description || "Plan description not available"}
              </p>

              {plan?.features && plan.features.length > 0 ? (
                <>
                  <h3 className="font-semibold mb-2">Included Services:</h3>
                  <ul className="mb-4 list-disc pl-5">
                    {plan.features.map((feature: string, idx: number) => (
                      <li key={idx} className="text-sm">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Box className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-700 text-sm">
                    Features not available for this plan
                  </p>
                </Box>
              )}

              {/* User Info Display */}
              {userData?.user && (
                <Box className="mt-4 p-4 bg-white rounded-lg">
                  <h4 className="font-semibold mb-2">Purchasing for:</h4>
                  <p className="text-sm text-gray-600">{userData.user.name}</p>
                  <p className="text-sm text-gray-600">{userData.user.email}</p>
                </Box>
              )}

              {/* Debug Info (remove in production) */}
              {process.env.NODE_ENV === "development" && (
                <Box className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded text-xs">
                  <p>
                    <strong>Debug:</strong> Plan Index: {finalPlanIndex}
                  </p>
                  <p>
                    <strong>Plan Title:</strong> {plan?.title}
                  </p>
                  <p>
                    <strong>Plan Price:</strong> {plan?.price}
                  </p>
                </Box>
              )}
            </Box>

            {/* Right: Organization & Payment Details */}
            <Box className="h-auto bg-gradient-to-r from-red-50 to-indigo-100 rounded-lg shadow p-8">
              {createOrganization && (
                <>
                  <h2 className="text-xl font-semibold mb-4 font-Outfit">
                    Organization Details
                  </h2>
                  <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="font-normal">
                          Organization Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border rounded-lg p-2 w-full bg-white h-12"
                            placeholder="Enter your organization name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <h3 className="font-semibold mb-2">Payment Details</h3>
              <Flex className="mb-4">
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

              <FormField
                control={form.control}
                name="cardholderName"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="font-normal">
                      Cardholder Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border rounded-lg p-2 w-full bg-white h-12"
                        placeholder="Name on card"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="font-normal">Card Number *</FormLabel>
                    <FormControl>
                      <Input
                        className="border rounded-lg p-2 w-full bg-white h-12"
                        placeholder="1234 5678 9012 3456"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Flex className="gap-2 mb-4">
                <FormField
                  control={form.control}
                  name="expiryMonth"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-normal">
                        Expiry Month *
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full bg-white rounded-lg border border-gray-100 px-4 py-3 text-sm focus:border-gray-400"
                        >
                          <option value="">MM</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (month) => (
                              <option
                                key={month}
                                value={month.toString().padStart(2, "0")}
                              >
                                {month.toString().padStart(2, "0")}
                              </option>
                            )
                          )}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryYear"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-normal">
                        Expiry Year *
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full bg-white rounded-lg border border-gray-100 px-4 py-3 text-sm focus:border-gray-400"
                        >
                          <option value="">YYYY</option>
                          {Array.from(
                            { length: 10 },
                            (_, i) => new Date().getFullYear() + i
                          ).map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-normal">CVC *</FormLabel>
                      <FormControl>
                        <Input
                          className="border rounded-lg p-2 w-full bg-white h-12"
                          placeholder="123"
                          maxLength={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Flex>

              <div className="text-xs text-gray-500 mb-4">
                By clicking "Complete Purchase" I agree to the company's Terms
                of Service
              </div>

              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Complete Demo Purchase"}
              </Button>
            </Box>
          </Flex>
        </form>
      </Form>
    </Box>
  );
};

export default CheckoutPage;
