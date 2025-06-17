import { CompanyStep } from "@/pages/companymanagement.page";
import { UseStepper } from "@/hooks/usestepper";
import { PlusCircle } from "lucide-react";
import { FC, ReactNode } from "react";
import { Button } from "../ui/button";
import { Flex } from "../ui/flex";
import { Box } from "../ui/box";

export interface CompanyManagementHeaderProps extends UseStepper<CompanyStep> {
  steps: CompanyStep[];
  children?: ReactNode;
}

const CompanyManagementHeader: FC<CompanyManagementHeaderProps> = ({
  children,
  step,
  steps,
  goToStep,
}) => {
  return (
    <>
      <Box className="border-3 border-white rounded-2xl bg-[#F8FAFB] p-6 mt-6 max-sm:px-3">
        <Flex className="justify-between max-md:flex-col items-start">
          <Box>
            <h1 className="text-3xl font-medium capitalize">
              {step === steps[0]
                ? "Company Management"
                : step === steps[1] && "Create New Company"}
            </h1>
          </Box>

          {step === steps[0] && (
            <Button
              className="cursor-pointer hover:bg-gray-600"
              size={"lg"}
              onClick={() => goToStep("create new company")}
            >
              <PlusCircle />
              Create New Company
            </Button>
          )}
        </Flex>

        {children}
      </Box>
    </>
  );
};

export { CompanyManagementHeader };
