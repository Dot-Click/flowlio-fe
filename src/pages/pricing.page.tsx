import { Navbar } from "@/components/user section/navbar/navbar";
import { Pricing } from "@/components/user section/pricing/pricing";
import { useState } from "react";

export const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  return (
    <>
      <Navbar selectedPlan={selectedPlan} />
      <Pricing selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
    </>
  );
};
