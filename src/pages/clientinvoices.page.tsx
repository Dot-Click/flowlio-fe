import { Box } from "@/components/ui/box";
import { ClientPortalHeader } from "@/components/client section/clientportalheader";
import { ReusableTable } from "@/components/reusable/reusabletable";
import { useFetchClientInvoices, type ClientInvoice } from "@/hooks/useFetchClientInvoices";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const ClientInvoicesPage = () => {
  const { data: invoicesResponse, isLoading } = useFetchClientInvoices();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid": return "bg-green-100 text-green-800 border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const columns: ColumnDef<ClientInvoice>[] = [
    {
      accessorKey: "invoiceNumber",
      header: "Invoice #",
      cell: ({ row }) => <span className="font-medium">{row.original.invoiceNumber}</span>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <span className="font-semibold">${row.original.amount}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className={getStatusColor(row.original.status)}>
          {row.original.status.toUpperCase()}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => format(new Date(row.original.createdAt), "MMM dd, yyyy"),
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }) => row.original.dueDate ? format(new Date(row.original.dueDate), "MMM dd, yyyy") : "N/A",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          {row.original.pdfUrl && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(row.original.pdfUrl, "_blank")}
              className="hover:bg-blue-50 text-blue-600"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Box className="px-4 py-2">
      <ClientPortalHeader 
        title="Invoices & Payments" 
        description="Manage your project invoices and billing history" 
      />
      
      {isLoading ? (
        <Box className="flex justify-center p-10">Loading invoices...</Box>
      ) : invoicesResponse?.data?.length === 0 ? (
        <Box className="flex flex-col items-center justify-center p-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
           <FileText className="h-12 w-12 text-gray-300 mb-4" />
           <p className="text-gray-500 font-medium">No invoices found</p>
           <p className="text-gray-400 text-sm">When an invoice is generated for you, it will appear here.</p>
        </Box>
      ) : (
        <ReusableTable 
          data={invoicesResponse?.data || []} 
          columns={columns} 
        />
      )}
    </Box>
  );
};

export default ClientInvoicesPage;
