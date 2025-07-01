import { Center } from "../ui/center";
import { PageWrapper } from "../common/pagewrapper";
import { Stack } from "../ui/stack";
import { UserManagementTable } from "./usermanagementtable";
import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";
import { useNavigate } from "react-router";

export const UserManagementHeader = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper className="mt-6">
      <Center className="justify-between px-4 py-6">
        <Stack className="gap-1">
          <h1 className="text-black text-3xl max-sm:text-xl font-medium">
            User Management
          </h1>
          <h1 className={`max-sm:text-sm max-w-[600px] text-gray-500`}>
            Control access, roles, and permissions across your organization.
          </h1>
        </Stack>

        <Button
          variant="outline"
          className="bg-black text-white border border-gray-200  rounded-full px-6 py-5 flex items-center gap-2 cursor-pointer w-44"
          onClick={() =>
            navigate("/dashboard/user-management/add-user-members")
          }
        >
          <CirclePlus className="fill-white text-black size-5" />
          Add Members
        </Button>
      </Center>

      <UserManagementTable />
    </PageWrapper>
  );
};
