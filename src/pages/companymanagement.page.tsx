import { CompanyManagementHeader } from "@/components/company management/companymanagementheader";
import { CompanyManagementTable } from "@/components/company management/companymanagementtable";
import { CreateCompany } from "@/components/company management/createcompany";
import { UseStepper, useStepper } from "@/hooks/usestepper";

export type CompanyStep = "company management" | "create new company";

export const CompanyManagementPage = () => {
  const steps: CompanyStep[] = ["company management", "create new company"];

  const stepperProps = useStepper<CompanyStep>(steps);

  return (
    <CompanyManagementHeader
      {...{
        ...stepperProps,
        state: stepperProps.state as UseStepper<CompanyStep>["state"],
        steps,
      }}
    >
      {stepperProps.step === "company management" && (
        <CompanyManagementTable
          {...{
            ...stepperProps,
            state: stepperProps.state as UseStepper<CompanyStep>["state"],
            steps,
          }}
        />
      )}

      {stepperProps.step === "create new company" && (
        <CreateCompany
          {...{
            ...stepperProps,
            state: stepperProps.state as UseStepper<CompanyStep>["state"],
            steps,
          }}
        />
      )}
    </CompanyManagementHeader>
  );
};
