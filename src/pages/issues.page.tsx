import { IssuesHeader } from "@/components/issues/issuesheader";
import { CreateIssue } from "@/components/issues/createissue";
import { IssuesTable } from "@/components/issues/issuestable";
import { UseStepper, useStepper } from "@/hooks/usestepper";

export type IssueStep = "Issues" | "Create Issue";

export const IssuesPage = () => {
  const steps: IssueStep[] = ["Issues", "Create Issue"];

  const stepperProps = useStepper<IssueStep>(steps);

  return (
    <IssuesHeader
      {...{
        ...stepperProps,
        state: stepperProps.state as UseStepper<IssueStep>["state"],
        steps,
      }}
    >
      {stepperProps.isStepActive("Issues") ? (
        <IssuesTable />
      ) : (
        <CreateIssue
          {...{
            ...stepperProps,
            state: stepperProps.state as UseStepper<IssueStep>["state"],
            steps,
          }}
        />
      )}
    </IssuesHeader>
  );
};
