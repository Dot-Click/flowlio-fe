import { DownloadIcon, PlusCircle } from "lucide-react";
// import { imageToBase64 } from "@/utils/imageUtils";
import { IssueStep } from "@/pages/issues.page";
import { UseStepper } from "@/hooks/usestepper";
import { FC, ReactNode } from "react";
import { Button } from "../ui/button";
import { Flex } from "../ui/flex";
import { format } from "date-fns";
import { Box } from "../ui/box";
import jsPDF from "jspdf";
import "jspdf-autotable";

export interface IssuesHeaderProps extends UseStepper<IssueStep> {
  steps: IssueStep[];
  children?: ReactNode;
}

const IssuesHeader: FC<IssuesHeaderProps> = ({
  children,
  isStepActive,
  goToStep,
}) => {
  //
  // const [logoBase64, setLogoBase64] = useState<string>("");
  // useEffect(() => {
  // imageToBase64("/general/planflowlogo.png")
  //   .then((base64) => setLogoBase64(base64))
  //   .catch((error) => console.error("Error loading logo:", error));
  // }, []);

  const issuesHeadingPara = {
    issues: "Log, track, and resolve issues issues efficiently.",
    newissues: "Select a reason for not being able to complete this task.",
  };

  const downloadPDF = () => {
    // Create new PDF document
    const doc = new jsPDF();
    let yPos = 20;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.width;

    // Add title and date
    doc.setFontSize(20);
    doc.text("Issues Report", pageWidth / 2, yPos, { align: "center" });
    yPos += 15;

    doc.setFontSize(12);
    doc.text(
      `Generated on: ${format(new Date(), "PPP")}`,
      pageWidth / 2,
      yPos,
      { align: "center" }
    );
    yPos += 20;

    // Project Information
    doc.setFontSize(16);
    doc.text("Project Details", margin, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.text("Project: Fire Station N8 Rebuild", margin, yPos);
    yPos += 7;
    doc.text("Project Number: 01-20002-00", margin, yPos);
    yPos += 7;
    doc.text(
      "Location: 4845 Lee Highway, Arlington Virginia. 22207",
      margin,
      yPos
    );
    yPos += 20;

    // Issues Section
    doc.setFontSize(16);
    doc.text("Issue Details", margin, yPos);
    yPos += 15;

    // Sample issues (you would replace this with actual data)
    const issues = [
      {
        number: "1",
        title: "Some Lights in Exercise room do not work. Repair.",
        location: "2nd Floor",
        dateCreated: "11/26/2024",
        dueDate: "12/13/2024",
        status: "Work Required",
        assignedTo: "Mike Phillips (Total Electric Inc)",
        description:
          "Lights in the exercise room are non-functional and need immediate repair.",
      },
      {
        number: "2",
        title: "Missing box cover conference room 200",
        location: "2nd Floor>Conference Training Room 200",
        dateCreated: "12/11/2024",
        dueDate: "12/16/2024",
        status: "Work Required",
        assignedTo: "Josh Freeland (Total Electric Inc)",
        description:
          "Electrical box cover missing in conference room 200. Safety hazard.",
      },
    ];

    // Function to add an issue to the PDF
    const addIssue = (issue: any, startY: number) => {
      let currentY = startY;

      // Issue header
      doc.setFontSize(12);
      doc.setTextColor(41, 128, 185);
      doc.text(`Issue #${issue.number}`, margin, currentY);
      currentY += 7;

      // Issue title
      doc.setTextColor(0);
      doc.setFontSize(11);
      doc.text(issue.title, margin, currentY);
      currentY += 12;

      // Issue details
      doc.setFontSize(10);
      const detailsText = [
        `Location: ${issue.location}`,
        `Date Created: ${issue.dateCreated}`,
        `Due Date: ${issue.dueDate}`,
        `Status: ${issue.status}`,
        `Assigned To: ${issue.assignedTo}`,
      ];

      detailsText.forEach((text) => {
        doc.text(text, margin + 10, currentY);
        currentY += 7;
      });

      // Description
      currentY += 5;
      doc.text("Description:", margin + 10, currentY);
      currentY += 7;
      doc.text(issue.description, margin + 15, currentY);
      currentY += 15;

      // Add separator line
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 15;

      return currentY;
    };

    // Add each issue to the PDF
    issues.forEach((issue) => {
      // Check if we need a new page
      if (yPos > doc.internal.pageSize.height - 60) {
        doc.addPage();
        yPos = 20;
      }
      yPos = addIssue(issue, yPos);
    });

    // Add page numbers
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );
    }

    // Save the PDF
    doc.save("Issues-Report.pdf");
  };

  return (
    <Box className="border-3 border-white rounded-2xl bg-[#F8FAFB] p-6 mt-6">
      <Flex className="justify-between max-md:flex-col max-md:items-start">
        <Box>
          <h1 className="text-3xl font-medium capitalize">
            {isStepActive("Issues") ? "issues" : "create new issue"}
          </h1>
          <p className="text-gray-500 mt-1 max-md:text-sm">
            {isStepActive("Issues")
              ? issuesHeadingPara.issues
              : issuesHeadingPara.newissues}
          </p>
        </Box>

        {isStepActive("Issues") && (
          <Flex className="max-lg:flex-col max-md:items-start max-sm:mt-3">
            <Button
              className="bg-green-600 cursor-pointer hover:bg-green-500"
              size={"lg"}
              onClick={downloadPDF}
            >
              <DownloadIcon />
              Download Issue Report
            </Button>
            <Button
              className="cursor-pointer hover:bg-gray-600"
              size={"lg"}
              onClick={() => goToStep("Create Issue")}
            >
              <PlusCircle />
              Create New issue
            </Button>
          </Flex>
        )}
      </Flex>

      {children}
    </Box>
  );
};

export { IssuesHeader };
