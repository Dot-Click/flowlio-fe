import { PageWrapper } from "../common/pagewrapper";
import { ProjectTable } from "./projecttable";

export const ProjectHeader = () => {
  return (
    <PageWrapper className="mt-6">
      <ProjectTable />
    </PageWrapper>
  );
};
