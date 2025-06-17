import { MyTaskStep } from "@/pages/mytask.page";
import { UseStepper } from "@/hooks/usestepper";
import { FC, ReactNode } from "react";
import { Box } from "../../ui/box";

export interface MyTaskHeaderProps extends UseStepper<MyTaskStep> {
  steps: MyTaskStep[];
  children?: ReactNode;
}

const MyTaskHeader: FC<MyTaskHeaderProps> = ({ children, isStepActive }) => {
  const mytaskheaderpara = {
    mytask: "Track and Manage All Tasks.",
    newissues: "Select a reason for not being able to complete this task.",
  };

  return (
    <Box className="border-3 border-white rounded-2xl bg-[#F8FAFB] p-6 mt-6">
      <Box>
        <h1 className="text-3xl font-medium capitalize">
          {isStepActive("my task") ? "My Tasks" : "create new issue"}
        </h1>
        <p className="text-gray-500 mt-1 max-md:text-sm">
          {isStepActive("my task")
            ? mytaskheaderpara.mytask
            : mytaskheaderpara.newissues}
        </p>
      </Box>

      {children}
    </Box>
  );
};

export { MyTaskHeader };
