import { MyTaskIssuesTable } from "@/components/task management/my task/mytaskissuestable";
import { MyTaskHeader } from "@/components/task management/my task/mttaskheader";
import { CreateIssue } from "@/components/task management/my task/createissue";
import { UseStepper, useStepper } from "@/hooks/usestepper";

export type MyTaskStep = "my task" | "Create Issue";

export const MyTaskPage = () => {
  const steps: MyTaskStep[] = ["my task", "Create Issue"];

  const stepperProps = useStepper<MyTaskStep>(steps);

  return (
    <MyTaskHeader
      {...{
        ...stepperProps,
        state: stepperProps.state as UseStepper<MyTaskStep>["state"],
        steps,
      }}
    >
      {stepperProps.isStepActive("my task") ? (
        <MyTaskIssuesTable
          {...{
            ...stepperProps,
            state: stepperProps.state as UseStepper<MyTaskStep>["state"],
            steps,
          }}
        />
      ) : (
        <CreateIssue
          {...{
            ...stepperProps,
            state: stepperProps.state as UseStepper<MyTaskStep>["state"],
            steps,
          }}
        />
      )}
    </MyTaskHeader>
  );
};
