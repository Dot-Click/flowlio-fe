import { useQuery } from "@tanstack/react-query";
import { axios } from "@/configs/axios.config";
import { ApiResponse } from "@/configs/axios.config";

export interface ClientInvoice {
  id: string;
  invoiceNumber: string;
  amount: string;
  status: string;
  datepaid?: string;
  dueDate?: string;
  createdAt: string;
  pdfUrl?: string;
}

export const useFetchClientInvoices = () => {
  return useQuery<ApiResponse<ClientInvoice[]>>({
    queryKey: ["client-invoices"],
    queryFn: async () => {
      const response =
        await axios.get<ApiResponse<ClientInvoice[]>>("/clients/invoices");
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
