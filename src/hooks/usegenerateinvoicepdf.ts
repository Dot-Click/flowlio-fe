import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { axios } from "@/configs/axios.config";

interface GenerateInvoicePDFResponse {
  success: boolean;
  message: string;
  data: {
    pdfUrl: string;
    pdfFileName: string;
    pdfFileSize: number;
  };
}

const generateInvoicePDF = async (
  id: string
): Promise<GenerateInvoicePDFResponse> => {
  try {
    const response = await axios.post(`/invoices/${id}/generate-pdf`);
    return response.data;
  } catch (error: any) {
    console.error("Error generating invoice PDF:", error);
    throw new Error(
      error.response?.data?.message || "Failed to generate invoice PDF"
    );
  }
};

export const useGenerateInvoicePDF = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateInvoicePDF,
    onSuccess: (data) => {
      toast.success("Invoice PDF generated successfully!");
      // Invalidate and refetch invoices to get updated PDF info
      queryClient.invalidateQueries({ queryKey: ["invoices"] });

      // Open PDF in new tab
      if (data.data.pdfUrl) {
        window.open(data.data.pdfUrl, "_blank");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to generate invoice PDF");
    },
  });
};
