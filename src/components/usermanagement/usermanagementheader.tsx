import { UserManagementStep } from "@/pages/usermanagement.page";
import { ComponentWrapper } from "../common/componentwrapper";
import { UseStepper } from "@/hooks/usestepper";
import { PlusCircle } from "lucide-react";
import { FC, ReactNode } from "react";
import { Button } from "../ui/button";
import { Flex } from "../ui/flex";
import { cn } from "@/lib/utils";
import "./phonenumberstyle.css";
import { Box } from "../ui/box";
import React from "react";

export interface UserManagementHeaderProps
  extends UseStepper<UserManagementStep> {
  steps: UserManagementStep[];
  children?: ReactNode;
}

const UserManagementHeader: FC<UserManagementHeaderProps> = ({
  children,
  steps,
  goToStep,
  state,
  isStepActive,
}) => {
  const userHeadingPara = {
    personalInformation: "Fill in the details to create a new project member",
    memberRole: "Fill in the details to create a new project member",
    bulkMember: "Add multiple members by inviting them via email",
  };

  return (
    <ComponentWrapper className="mt-6 p-5">
      <Flex className="justify-between max-md:flex-col items-start">
        <Box>
          <h1 className="text-3xl max-md:text-2xl font-medium capitalize">
            {isStepActive("user management") ? steps[0] : "Add Project Members"}
          </h1>
          <p className="text-gray-500 mt-1 max-sm:text-sm">
            {isStepActive("personal information")
              ? userHeadingPara.personalInformation
              : isStepActive("member role")
              ? userHeadingPara.memberRole
              : isStepActive("add bulk member")
              ? userHeadingPara.bulkMember
              : ""}
          </p>

          {(isStepActive("personal information") ||
            isStepActive("member role")) && (
            <Flex className="mt-12 gap-16">
              {steps
                .filter(
                  (step) =>
                    step === "personal information" || step === "member role"
                )
                .map((label, index) => {
                  const isCompleted = state[label]?.isFinished;
                  const isActive = state[label]?.isActive || index === 0;

                  return (
                    <React.Fragment key={label}>
                      <Flex
                        className={cn(
                          `capitalize bg-white p-2 rounded-4xl text-black border border-black`,
                          isCompleted
                            ? "text-white bg-black"
                            : isActive
                            ? "bg-white text-black"
                            : "bg-accent text-gray-400 border-gray-400"
                        )}
                      >
                        <Flex
                          className={cn(
                            `rounded-full size-7 items-center justify-center max-md:size-5 max-md:text-xs p-2`,
                            isCompleted
                              ? "bg-white text-black"
                              : "bg-black text-white",
                            isActive
                              ? "border-black border"
                              : "bg-accent text-gray-400 border-gray-400 border"
                          )}
                        >
                          {isCompleted ? "✔" : index + 1}
                        </Flex>
                        <h5 className="max-md:text-[10px] max-md:font-semibold">
                          {label}
                        </h5>
                      </Flex>

                      {index < 1 && (
                        <Box
                          className={cn(
                            `w-22 max-sm:w-16 h-[1px] bg-gray-300 -mx-16`,
                            isCompleted ? "bg-black" : ""
                          )}
                        ></Box>
                      )}
                    </React.Fragment>
                  );
                })}
            </Flex>
          )}
        </Box>

        {isStepActive("user management") && (
          <Flex>
            <Button
              className="cursor-pointer bg-white text-black border border-black hover:bg-gray-200"
              onClick={() => goToStep("add bulk member")}
              size={"lg"}
            >
              <PlusCircle />
              Add Bulk Members
            </Button>
            <Button
              className="cursor-pointer border border-black hover:text-black hover:bg-gray-200"
              size={"lg"}
              onClick={() => goToStep("personal information")}
            >
              <PlusCircle />
              Add Member
            </Button>
          </Flex>
        )}
      </Flex>

      {children}
    </ComponentWrapper>
  );
};

type UserManagementType = {
  titleStep: string;
  titleInfo: string;
};

export const UserManagementInformation: FC<
  UserManagementType & UserManagementHeaderProps
> = ({ titleStep, titleInfo }) => {
  return (
    <Box className="mt-8 relative">
      <p className=" text-md text-gray-500 capitalize max-sm:text-sm">
        {titleStep}
      </p>
      <h1 className="text-2xl font-medium capitalize max-sm:text-sm">
        {titleInfo}
      </h1>

      <img
        src="/general/curved-border 1.svg"
        alt="curved-border"
        className="w-full mt-2"
      />
    </Box>
  );
};

export { UserManagementHeader };
