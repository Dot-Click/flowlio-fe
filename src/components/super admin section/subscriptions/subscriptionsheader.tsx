import { PageWrapper } from "@/components/common/pagewrapper";
import { Box } from "@/components/ui/box";
import { Input } from "@/components/ui/input";
import { Stack } from "@/components/ui/stack";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDataSaverOn } from "react-icons/md";
import { Flex } from "@/components/ui/flex";
import { IoTrashSharp } from "react-icons/io5";
import { SubscribtionTabele } from "./subscribtiontabele";
import { useUpsertPlan } from "@/hooks/useupsertplan";
import { useDeleteCustomFeatures } from "@/hooks/usedeletecustomfeatures";
import { toast } from "sonner";
import { PlanFeature } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchPlans } from "@/hooks/usefetchplans";

const PLAN_LIST = [
  { key: "basic", label: "Basic" },
  { key: "standard", label: "Standard" },
  { key: "premium", label: "Premium" },
];

type PlanKey = "basic" | "standard" | "premium";
type PlanState = {
  subheading: string;
  price: string;
  features: string[];
  newFeature: string;
  adding: boolean;
};

type PlansState = {
  [key in PlanKey]: PlanState;
};

const initialPlanState: PlanState = {
  subheading: "",
  price: "",
  features: [""],
  newFeature: "",
  adding: false,
};

export const SubscriptionsHeader = () => {
  const { data: plansResponse, isLoading, error } = useFetchPlans();
  const fetchedPlans = plansResponse?.data || [];

  const [plans, setPlans] = useState<PlansState>({
    basic: { ...initialPlanState },
    standard: { ...initialPlanState },
    premium: { ...initialPlanState },
  });

  // Add individual loading states for each plan
  const [savingPlans, setSavingPlans] = useState<Record<PlanKey, boolean>>({
    basic: false,
    standard: false,
    premium: false,
  });

  // Pre-populate form with fetched plans
  useEffect(() => {
    if (fetchedPlans.length > 0) {
      const updatedPlans = { ...plans };

      fetchedPlans.forEach((plan) => {
        const planKey = plan.name.toLowerCase() as PlanKey;
        if (planKey in updatedPlans) {
          // Convert features object back to string array for UI
          const featureStrings = [];
          if (plan.features.aiAssist) featureStrings.push("AI Assist");
          if (plan.features.prioritySupport)
            featureStrings.push("Priority Support");
          if (plan.features.customBranding)
            featureStrings.push("Custom Branding");
          if (plan.features.apiAccess) featureStrings.push("API Access");

          // Add custom features if they exist
          if (
            plan.features.customFeatures &&
            plan.features.customFeatures.length > 0
          ) {
            featureStrings.push(...plan.features.customFeatures);
          }

          updatedPlans[planKey] = {
            subheading: plan.description || "",
            price: plan.price.toString(),
            features: featureStrings.length > 0 ? featureStrings : [""],
            newFeature: "",
            adding: false,
          };
        }
      });

      setPlans(updatedPlans);
    }
  }, [fetchedPlans]);

  const handleInputChange = (
    planKey: PlanKey,
    field: keyof PlanState,
    value: string
  ) => {
    setPlans((prev) => ({
      ...prev,
      [planKey]: { ...prev[planKey], [field]: value },
    }));
  };

  const handleAddFeature = (planKey: PlanKey) => {
    setPlans((prev) => ({
      ...prev,
      [planKey]: { ...prev[planKey], adding: true },
    }));
  };

  const handleSaveFeature = (planKey: PlanKey) => {
    const { newFeature, features } = plans[planKey];
    if (newFeature.trim()) {
      setPlans((prev) => ({
        ...prev,
        [planKey]: {
          ...prev[planKey],
          features: [...features, newFeature.trim()],
          newFeature: "",
          adding: false,
        },
      }));
    }
  };

  const handleRemoveFeature = async (planKey: PlanKey, idx: number) => {
    const featureToRemove = plans[planKey].features[idx];

    // Check if this is a custom feature (not a predefined one)
    const predefinedFeatures = [
      "AI Assist",
      "Priority Support",
      "Custom Branding",
      "API Access",
      "",
    ];
    const isCustomFeature = !predefinedFeatures.includes(featureToRemove);

    if (isCustomFeature) {
      // Find the plan ID from fetched plans
      const plan = fetchedPlans.find((p) => p.name.toLowerCase() === planKey);

      if (plan) {
        try {
          await deleteCustomFeaturesMutation.mutateAsync({
            planId: plan.id,
            featuresToDelete: [featureToRemove],
          });

          toast.success(
            `Custom feature "${featureToRemove}" deleted successfully`
          );
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          toast.error(
            `Failed to delete custom feature "${featureToRemove}": ${errorMessage}`
          );
          return; // Don't update local state if API call failed
        }
      }
    }

    // Update local state
    setPlans((prev) => {
      const features = prev[planKey].features.filter(
        (_: string, i: number) => i !== idx
      );
      return {
        ...prev,
        [planKey]: { ...prev[planKey], features },
      };
    });
  };

  const upsertPlanMutation = useUpsertPlan();
  const deleteCustomFeaturesMutation = useDeleteCustomFeatures();
  const queryClient = useQueryClient();

  const validatePlan = (
    plan: PlanState
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!plan.subheading.trim()) {
      errors.push("Subheading is required");
    }

    if (!plan.price || parseFloat(plan.price) <= 0) {
      errors.push("Valid price is required");
    }

    if (plan.features.length === 0) {
      errors.push("At least one feature is required");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const handleSavePlan = async (planKey: PlanKey) => {
    const plan = plans[planKey];

    // Check if any other plan is currently being saved
    const isAnyPlanSaving = Object.values(savingPlans).some(
      (isSaving) => isSaving
    );
    if (isAnyPlanSaving) {
      toast.error("Please wait for the current save operation to complete");
      return;
    }

    // Set loading state for this specific plan
    setSavingPlans((prev) => ({ ...prev, [planKey]: true }));

    // Validate the plan
    const validation = validatePlan(plan);
    if (!validation.isValid) {
      toast.error("Validation failed", {
        description: validation.errors.join(", "),
      });
      setSavingPlans((prev) => ({ ...prev, [planKey]: false }));
      return;
    }

    // Map dynamic features to API structure
    const mapFeaturesToApi = (features: string[]) => {
      const featureMap: PlanFeature = {
        maxUsers: 1,
        maxProjects: 1,
        maxStorage: 1,
        aiAssist: false,
        prioritySupport: false,
        customBranding: false,
        apiAccess: false,
        customFeatures: [], // Add custom features array
      };

      // Map UI features to API features
      features.forEach((feature) => {
        const lowerFeature = feature.toLowerCase();
        if (lowerFeature.includes("ai") || lowerFeature.includes("assist")) {
          featureMap.aiAssist = true;
        } else if (
          lowerFeature.includes("priority") ||
          lowerFeature.includes("support")
        ) {
          featureMap.prioritySupport = true;
        } else if (
          lowerFeature.includes("custom") ||
          lowerFeature.includes("branding")
        ) {
          featureMap.customBranding = true;
        } else if (lowerFeature.includes("api")) {
          featureMap.apiAccess = true;
        } else {
          // Add as custom feature
          featureMap.customFeatures?.push(feature);
        }
      });

      return featureMap;
    };

    const planData = {
      name: planKey,
      description: plan.subheading,
      price: parseFloat(plan.price),
      features: mapFeaturesToApi(plan.features),
      isActive: true,
      sortOrder: 1,
      currency: "USD",
      billingCycle: "monthly" as const,
      slug: planKey,
    };

    try {
      const result = await upsertPlanMutation.mutateAsync(planData);
      const isUpdate = result.data?.isUpdate;
      toast.success(
        `${PLAN_LIST.find((p) => p.key === planKey)?.label} plan ${
          isUpdate ? "Updated" : "Created"
        } successfully`
      );
      console.log(planData);

      // Invalidate and refetch plans to update the table
      queryClient.invalidateQueries({ queryKey: ["fetch plans"] });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create plan";
      toast.error("Failed to create plan", {
        description: errorMessage,
      });
      console.error("Plan creation error:", error);
    } finally {
      // Reset loading state for this specific plan
      setSavingPlans((prev) => ({ ...prev, [planKey]: false }));
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <PageWrapper className="mt-6 px-4 py-6">
        <Stack className="gap-1">
          <h1 className="text-black text-2xl font-medium max-md:text-lg">
            Subscription Management
          </h1>
          <h1 className="text-gray-500 max-md:text-sm">
            Loading subscription plans...
          </h1>
        </Stack>
      </PageWrapper>
    );
  }

  // Show error state
  if (error) {
    return (
      <PageWrapper className="mt-6 px-4 py-6">
        <Stack className="gap-1">
          <h1 className="text-black text-2xl font-medium max-md:text-lg">
            Subscription Management
          </h1>
          <h1 className="text-red-500 max-md:text-sm">
            Error loading subscription plans: {error.message}
          </h1>
        </Stack>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="mt-6 px-4 py-6">
      <Stack className="gap-1 ">
        <h1 className="text-black text-2xl font-medium max-md:text-lg">
          Subscription Management
        </h1>
        <h1 className="text-gray-500 max-md:text-sm">
          View and manage all subscription plans and active company
          subscriptions.
        </h1>
      </Stack>
      <Flex className="flex-wrap items-start gap-6 mt-6 max-lg:flex-col flex-1">
        {PLAN_LIST.map((plan) => (
          <Stack
            key={plan.key}
            className="w-[350px] max-md:w-full max-md:flex-1 min-h-[400px] bg-white rounded-md border border-gray-200 flex-1 overflow-hidden gap-0"
          >
            <h1 className="text-black bg-[#F3F5F5] text-xl font-medium border-b border-gray-200 p-3">
              {plan.label}
            </h1>
            <Stack className="mt-2 p-3 flex-1">
              <Input
                type="text"
                placeholder="Enter Subheading"
                className="bg-white h-12 border border-gray-200 placeholder:text-gray-400 shadow-none"
                value={plans[plan.key as PlanKey].subheading}
                onChange={(e) =>
                  handleInputChange(
                    plan.key as PlanKey,
                    "subheading",
                    e.target.value
                  )
                }
              />
              <label htmlFor="price" className="mt-3">
                Set Price
              </label>
              <Flex className="relative items-center h-16">
                <span className="absolute left-3 text-gray-400 font-outfit font-semibold text-2xl flex items-center h-full ">
                  $
                </span>
                <Input
                  type="number"
                  placeholder="00.00"
                  className={`bg-white h-full border border-gray-200 placeholder:text-gray-400 shadow-none placeholder:text-2xl pl-8 focus:text-black text-2xl text-start flex items-center`}
                  value={plans[plan.key as PlanKey].price}
                  onChange={(e) =>
                    handleInputChange(
                      plan.key as PlanKey,
                      "price",
                      e.target.value
                    )
                  }
                  min="0"
                  step="1"
                  prefix="$"
                  style={{ fontSize: "1.5rem", lineHeight: "2rem" }}
                />
              </Flex>
              <Box className="mt-4">
                <h1 className="font-semibold mb-2">Included</h1>
                <Stack className="gap-2">
                  {plans[plan.key as PlanKey].features.map(
                    (feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 group">
                        <FaCheckCircle className=" fill-[#1797B9]" />
                        <span className="flex-1 text-gray-700 text-base">
                          {feature}
                        </span>
                        <button
                          type="button"
                          className="opacity-70 hover:opacity-100 transition-opacity"
                          onClick={() =>
                            handleRemoveFeature(plan.key as PlanKey, idx)
                          }
                          disabled={deleteCustomFeaturesMutation.isPending}
                          aria-label="Remove feature"
                        >
                          <Box className="bg-[#e3f2f7] p-2 rounded-full cursor-pointer    ">
                            <IoTrashSharp
                              size={14}
                              className="text-[#1797B9]"
                            />
                          </Box>
                        </button>
                      </div>
                    )
                  )}

                  {plans[plan.key as PlanKey].adding ? (
                    <Stack>
                      <Flex className="gap-0">
                        <FaCheckCircle className="fill-[#1797B9]" />
                        <Input
                          type="text"
                          placeholder="Enter Package Feature"
                          className="flex-1 border-none bg-white shadow-none placeholder:text-gray-400 "
                          value={plans[plan.key as PlanKey].newFeature}
                          onChange={(e) =>
                            handleInputChange(
                              plan.key as PlanKey,
                              "newFeature",
                              e.target.value
                            )
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter")
                              handleSaveFeature(plan.key as PlanKey);
                          }}
                          autoFocus
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleSaveFeature(plan.key as PlanKey)}
                          className="bg-[#e3f2f7] text-white cursor-pointer hover:bg-[#1797B9]/20 hover:text-white transition-all duration-300 hover:scale-105 rounded-full p-2 size-8"
                        >
                          <MdDataSaverOn className="size-5 fill-[#1797B9]/90 hover:fill-white transition-all duration-300" />
                        </Button>
                      </Flex>
                      <Box className="w-full h-[0.5px] bg-gray-600"></Box>
                    </Stack>
                  ) : (
                    <Flex className="justify-between">
                      <Button
                        variant="link"
                        className="text-primary px-0 mt-1 cursor-pointer"
                        onClick={() => handleAddFeature(plan.key as PlanKey)}
                      >
                        + Add
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-primary px-2 mt-1 border rounded-md cursor-pointer"
                        onClick={() => handleSavePlan(plan.key as PlanKey)}
                        disabled={
                          savingPlans[plan.key as PlanKey] ||
                          Object.values(savingPlans).some(
                            (isSaving) => isSaving
                          )
                        }
                      >
                        {savingPlans[plan.key as PlanKey]
                          ? "Saving..."
                          : "Save"}
                      </Button>
                    </Flex>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Stack>
        ))}
      </Flex>

      <hr className="my-8" />

      <SubscribtionTabele
        fetchedPlans={fetchedPlans}
        isLoading={isLoading}
        error={error}
      />
    </PageWrapper>
  );
};
