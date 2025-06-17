import { DownloadIcon } from "lucide-react";
import autoTable from "jspdf-autotable";
import { FC, ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { Flex } from "../ui/flex";
import { format } from "date-fns";
import { Box } from "../ui/box";
import { jsPDF } from "jspdf";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

export interface TaskManagementHeaderProps {
  children?: ReactNode;
}

const TaskManagementHeader: FC<TaskManagementHeaderProps> = ({ children }) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  const generatePDF = () => {
    // Create new PDF document
    const doc = new jsPDF();
    let yPos = 20;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.width;

    // Add title
    doc.setFontSize(20);
    doc.text("Task Management Report", pageWidth / 2, yPos, {
      align: "center",
    });
    yPos += 10;

    doc.setFontSize(12);
    doc.text(
      `Generated on: ${format(new Date(), "PPP")}`,
      pageWidth / 2,
      yPos,
      { align: "center" }
    );
    yPos += 10;

    // Add date range if selected
    if (date?.from && date?.to) {
      doc.text(
        `Report Period: ${format(date.from, "PPP")} - ${format(
          date.to,
          "PPP"
        )}`,
        pageWidth / 2,
        yPos,
        { align: "center" }
      );
    }
    yPos += 20;

    // Project Information
    doc.setFontSize(16);
    doc.text("Project Information", margin, yPos);
    yPos += 10;

    const projectData = [
      ["Project Name", "some project name"],
      ["Client Name", "carmella"],
      ["Job Number", "#23"],
      ["Start Date", "Feb 1, 2025"],
      ["End Date", "Apr 1, 2025"],
      ["Address", "TenStack University of Lagos"],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [],
      body: projectData,
      theme: "plain",
      styles: { fontSize: 10 },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 40 },
        1: { cellWidth: 100 },
      },
      margin: { left: margin },
      didDrawPage: function (data: any) {
        yPos = data.cursor.y + 20;
      },
    });

    // Schedule Information
    doc.setFontSize(16);
    doc.text("Schedule Information", margin, yPos);
    yPos += 10;

    const scheduleData = [
      ["Schedule Name", "Foundation Plan"],
      ["Location", "Down Town Sector C"],
      ["Start Date", "Jan 1, 2025"],
      ["End Date", "Jun 1, 2025"],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [],
      body: scheduleData,
      theme: "plain",
      styles: { fontSize: 10 },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 40 },
        1: { cellWidth: 100 },
      },
      margin: { left: margin },
      didDrawPage: function (data: any) {
        yPos = data.cursor.y + 20;
      },
    });

    // Tasks Table
    doc.setFontSize(16);
    doc.text("Tasks Overview", margin, yPos);
    yPos += 10;

    const tasksHead = [
      [
        "Task Name",
        "Status",
        "Submitted By",
        "Start Date",
        "End Date",
        "Location",
      ],
    ];

    // Filter tasks based on date range if selected
    const allTasks = [
      [
        "Foundation Plan",
        "Completed",
        "carmella",
        "Jan 1, 2025",
        "Jun 1, 2025",
        "Sector A",
      ],
      [
        "Electrical Work",
        "Ongoing",
        "Silas22",
        "Feb 1, 2025",
        "Jul 1, 2025",
        "Sector B",
      ],
      ["Plumbing", "Pending", "John", "Mar 1, 2025", "Aug 1, 2025", "Sector C"],
    ];

    // Filter tasks based on date range
    const tasksData =
      date?.from && date?.to
        ? allTasks.filter((task) => {
            const taskStartDate = new Date(task[3]);
            const taskEndDate = new Date(task[4]);
            return taskStartDate >= date.from! && taskEndDate <= date.to!;
          })
        : allTasks;

    autoTable(doc, {
      startY: yPos,
      head: tasksHead,
      body: tasksData,
      theme: "striped",
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 25 },
        2: { cellWidth: 30 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { cellWidth: 25 },
      },
      margin: { left: margin, right: margin },
      didDrawPage: function (data: any) {
        yPos = data.cursor.y + 20;
        // Re-add the header on new pages
        if (data.pageCount > 1) {
          doc.setFontSize(16);
          doc.text("Tasks Overview (continued)", margin, 20);
        }
      },
    });

    // Start Materials & Equipment on new page
    doc.addPage();
    yPos = 20;

    // Materials and Equipment
    doc.setFontSize(16);
    doc.text("Materials & Equipment", margin, yPos);
    yPos += 10;

    const materialsHead = [["Item Type", "Description", "Location", "Code"]];
    const materialsData = [
      ["Material", "Cement", "Storage A", "MAT001"],
      ["Material", "Steel Bars", "Storage B", "MAT002"],
      ["Equipment", "Crane", "Site 1", "EQP001"],
      ["Equipment", "Excavator", "Site 2", "EQP002"],
    ];

    autoTable(doc, {
      startY: yPos,
      head: materialsHead,
      body: materialsData,
      theme: "striped",
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 50 },
        2: { cellWidth: 35 },
        3: { cellWidth: 35 },
      },
      margin: { left: margin, right: margin },
      didDrawPage: function (data: any) {
        yPos = data.cursor.y;
        // Re-add the header on new pages
        if (data.pageCount > 1) {
          doc.setFontSize(16);
          doc.text("Materials & Equipment (continued)", margin, 20);
        }
      },
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    doc.setFontSize(8);

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );
    }

    // Save the PDF
    doc.save("Project-Management-Report.pdf");
  };

  return (
    <Box className="border-3 border-white rounded-2xl bg-[#F8FAFB] p-6 mt-6">
      <Flex className="justify-between max-md:flex-col items-start gap-6">
        <Box>
          <h1 className="text-3xl font-medium capitalize">Task Management</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Efficiently track, assign, and monitor tasks to ensure smooth
            workflow and productivity.
          </p>
        </Box>

        <Flex className="items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Button
            className="bg-green-600 cursor-pointer hover:bg-green-500"
            onClick={generatePDF}
            size={"lg"}
          >
            <DownloadIcon />
            Download Report
          </Button>
        </Flex>
      </Flex>

      {children}
    </Box>
  );
};

export { TaskManagementHeader };
