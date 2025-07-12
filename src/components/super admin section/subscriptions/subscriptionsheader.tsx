import { PageWrapper } from "@/components/common/pagewrapper";
import { Box } from "@/components/ui/box";
import { Input } from "@/components/ui/input";
import { Stack } from "@/components/ui/stack";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDataSaverOn } from "react-icons/md";
import { Flex } from "@/components/ui/flex";
import { IoTrashSharp } from "react-icons/io5";
import { SubscribtionTabele } from "./subscribtiontabele";

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
  features: ["Access to Promote Services"],
  newFeature: "",
  adding: false,
};

export const SubscriptionsHeader = () => {
  const [plans, setPlans] = useState<PlansState>({
    basic: { ...initialPlanState },
    standard: { ...initialPlanState },
    premium: { ...initialPlanState },
  });

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

  const handleRemoveFeature = (planKey: PlanKey, idx: number) => {
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
      <Flex className="flex-wrap gap-6 mt-6 max-lg:flex-col flex-1">
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
              <div className="mt-4">
                <div className="font-semibold mb-2">Included</div>
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
                      >
                        Save
                      </Button>
                    </Flex>
                  )}
                </Stack>
              </div>
            </Stack>
          </Stack>
        ))}
      </Flex>

      <hr className="my-8" />

      <SubscribtionTabele />
    </PageWrapper>
  );
};
