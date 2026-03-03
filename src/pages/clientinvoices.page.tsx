import { Box } from "@/components/ui/box";
import { ReusableTable } from "@/components/reusable/reusabletable";
import {
  useFetchClientInvoices,
  type ClientInvoice,
} from "@/hooks/useFetchClientInvoices";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useGenerateInvoicePDF } from "@/hooks/usegenerateinvoicepdf";
import { useUser } from "@/providers/user.provider";

import { PageWrapper } from "@/components/common/pagewrapper";
import { Stack } from "@/components/ui/stack";

const ClientInvoicesPage = () => {
  const { data: userData } = useUser();
  const clientId = userData?.user?.clientId;
  const organizationId = userData?.user?.organizationId;
  const { generatePDF } = useGenerateInvoicePDF();

  const { data: invoicesResponse, isLoading } = useFetchClientInvoices(
    clientId || undefined,
    organizationId || undefined,
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const invoices = invoicesResponse?.data?.invoices || [];

  const columns: ColumnDef<ClientInvoice>[] = [
    {
      accessorKey: "invoiceNumber",
      header: "Invoice #",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.invoiceNumber}</span>
      ),
    },
    {
      accessorKey: "clientname",
      header: "Client Name",
      cell: ({ row }) => <span>{row.original.clientname}</span>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-semibold">${row.original.amount}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={getStatusColor(row.original.status)}
        >
          {row.original.status.toUpperCase()}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) =>
        row.original.createdAt
          ? format(new Date(row.original.createdAt), "MMM dd, yyyy")
          : "N/A",
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }) =>
        row.original.dueDate
          ? format(new Date(row.original.dueDate), "MMM dd, yyyy")
          : "N/A",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              generatePDF({ invoices: [row.original], exportType: "selected" })
            }
            className="hover:bg-blue-50 text-blue-600"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageWrapper className="mt-6">
      <Stack className="gap-1 p-6 mb-6">
        <h1 className="text-2xl font-medium text-black">Invoices & Payments</h1>
        <p className="text-gray-500">
          Manage your project invoices and billing history
        </p>
      </Stack>
      {isLoading ? (
        <Box className="flex justify-center p-10">Loading invoices...</Box>
      ) : invoices?.length === 0 ? (
        <Box className="flex flex-col items-center justify-center p-20 bg-white rounded-xl border border-gray-100 shadow-sm">
          <FileText className="h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">No invoices found</p>
          <p className="text-gray-400 text-sm">
            When an invoice is generated for you, it will appear here.
          </p>
        </Box>
      ) : (
        <Box className=" rounded-xl   border border-gray-100 overflow-hidden">
          <ReusableTable
            data={invoices}
            columns={columns}
            searchClassName="rounded-full"
            filterClassName="rounded-full"
          />
        </Box>
      )}
    </PageWrapper>
  );
};

export default ClientInvoicesPage;
