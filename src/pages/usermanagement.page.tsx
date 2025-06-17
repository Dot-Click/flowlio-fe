import {
  UserManagementHeader,
  UserManagementInformation,
} from "@/components/usermanagement/usermanagementheader";
import { UseStepper, useStepper } from "@/hooks/usestepper";
import { AddBulkMember } from "@/components/usermanagement/addbulkmember";
import { MemberRoleForm } from "@/components/usermanagement/memberroleform";
import { AddProjectMemberForm } from "@/components/usermanagement/addprojectmember";
import { UserManagementTable } from "@/components/usermanagement/usermanagementtable";

export type UserManagementStep =
  | "user management"
  | "personal information"
  | "member role"
  | "add bulk member";

export const UserManagementPage = () => {
  const steps: UserManagementStep[] = [
    "user management",
    "personal information",
    "member role",
    "add bulk member",
  ];

  const stepperProps = useStepper<UserManagementStep>(steps);

  return (
    <UserManagementHeader
      {...{
        ...stepperProps,
        state: stepperProps.state as UseStepper<UserManagementStep>["state"],
        steps,
      }}
    >
      {stepperProps.isStepActive("user management") && (
        <UserManagementTable
          {...{
            ...stepperProps,
            state:
              stepperProps.state as UseStepper<UserManagementStep>["state"],
            steps,
          }}
        />
      )}

      {stepperProps.isStepActive("personal information") ||
        (stepperProps.isStepActive("member role") && (
          <UserManagementInformation
            {...{
              ...stepperProps,
              state:
                stepperProps.state as UseStepper<UserManagementStep>["state"],
              steps,
            }}
            titleStep={`Step ${steps.indexOf(stepperProps.step) ?? 0 + 1}`}
            titleInfo={`${stepperProps.step}`}
          />
        ))}

      {stepperProps.isStepActive("personal information") && (
        <AddProjectMemberForm
          {...{
            ...stepperProps,
            state:
              stepperProps.state as UseStepper<UserManagementStep>["state"],
            steps,
          }}
        />
      )}
      {stepperProps.isStepActive("member role") && (
        <MemberRoleForm
          {...{
            ...stepperProps,
            state:
              stepperProps.state as UseStepper<UserManagementStep>["state"],
            steps,
          }}
        />
      )}
      {stepperProps.isStepActive("add bulk member") && (
        <AddBulkMember
          {...{
            ...stepperProps,
            state:
              stepperProps.state as UseStepper<UserManagementStep>["state"],
            steps,
          }}
        />
      )}
    </UserManagementHeader>
  );
};
