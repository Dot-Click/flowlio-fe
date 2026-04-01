import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GeneralModal } from "@/components/common/generalmodal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { useSendNewsletter } from "@/hooks/usesendnewsletter";
import { toast } from "sonner";
import RichTextEditor from "@/components/common/RichTextEditor";
import { sanitizeHTML } from "@/utils/sanitize";
import { Eye, Send, X, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const newsletterSchema = z.object({
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject must be less than 200 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface SendNewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SendNewsletterModal: FC<SendNewsletterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const [isPreview, setIsPreview] = useState(false);

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      subject: "",
      content: "",
    },
  });

  const sendNewsletterMutation = useSendNewsletter();

  const onSubmit = async (data: NewsletterFormData) => {
    // Sanitize HTML before sending
    const sanitizedContent = sanitizeHTML(data.content);

    console.log("[Newsletter Modal] Form submitted:", {
      subject: data.subject,
      contentLength: sanitizedContent.length,
      timestamp: new Date().toISOString(),
    });

    try {
      const result = await sendNewsletterMutation.mutateAsync({
        ...data,
        content: sanitizedContent,
      });

      console.log("[Newsletter Modal] Response received:", result);

      if (result.data?.successful) {
        const successMessage = `Newsletter sent successfully to ${
          result.data?.successful || 0
        } subscribers!`;
        
        toast.success(successMessage);
        form.reset();
        setIsPreview(false);
        onClose();
      } else {
        const errorMessage = result.message || "Failed to send newsletter";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to send newsletter. Please try again.";
      toast.error(errorMessage);
    }
  };


  return (
    <GeneralModal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
          setIsPreview(false);
          onClose();
        }
      }}
      contentProps={{
        className:
          "max-w-4xl max-h-[95vh] overflow-y-auto w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[75vw] p-0 border-none bg-transparent shadow-none",
      }}
    >
      <Box className="bg-white rounded-2xl overflow-hidden flex flex-col h-full max-h-[90vh]">
        {/* Header */}
        <Flex className="items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <Flex className="items-center gap-3">
            <Box className="p-2 bg-[#1797b9]/10 rounded-lg text-[#1797b9]">
              <Send size={20} />
            </Box>
            <h2 className="text-xl font-semibold text-gray-800">{t("superadmin.newsletter.sendNewsletter", "Send Newsletter")}</h2>
          </Flex>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              form.reset();
              setIsPreview(false);
              onClose();
            }}
            className="rounded-full hover:bg-gray-200"
          >
            <X size={20} />
          </Button>
        </Flex>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-grow flex flex-col overflow-hidden">
            <Box className="p-6 space-y-6 overflow-y-auto">
              {/* Subject Field */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">{t("superadmin.newsletter.modal.subject", "Newsletter Subject")}</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        className="bg-gray-50 border border-gray-200 rounded-xl w-full h-12 px-4 focus:ring-2 focus:ring-[#1797b9]/20 focus:border-[#1797b9] transition-all outline-none"
                        placeholder="e.g. Weekly Updates - March 2024"
                        disabled={sendNewsletterMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Toggle Preview / Edit */}
              <Flex className="justify-between items-center bg-gray-50 p-2 rounded-xl">
                <p className="text-xs text-gray-500 font-medium px-2">
                  {isPreview ? t("superadmin.newsletter.modal.previewing", "Previewing Email Layout") : t("superadmin.newsletter.modal.composing", "Composing Newsletter Content")}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPreview(!isPreview)}
                  className={cn(
                    "rounded-lg flex items-center gap-2 text-xs font-semibold px-3 py-1.5 transition-all",
                    isPreview 
                      ? "bg-white text-[#1797b9] shadow-sm" 
                      : "text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {isPreview ? (
                    <>
                      <ClipboardList size={14} />
                      {t("superadmin.newsletter.modal.backToEditor", "Back to Editor")}
                    </>
                  ) : (
                    <>
                      <Eye size={14} />
                      {t("superadmin.newsletter.modal.previewMode", "Preview Mode")}
                    </>
                  )}
                </Button>
              </Flex>

              {/* Content / Preview Area */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="flex-grow flex flex-col space-y-2">
                    <FormLabel className="sr-only">Content</FormLabel>
                    <FormControl>
                      {isPreview ? (
                        <Box className="bg-gray-100 p-8 rounded-xl min-h-[400px] border border-gray-200 overflow-y-auto">
                          {/* Simulated Email Browser Container */}
                          <Box className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                            {/* Email Header Simulation */}
                            <Box className="bg-[#1797b9] p-6 text-center">
                              <h1 className="text-white text-xl font-bold tracking-tight">NEWSLETTER</h1>
                            </Box>
                            
                            {/* Rendered Sanitized content */}
                            <Box 
                              className="p-8 prose prose-gray max-w-none newsletter-preview"
                              dangerouslySetInnerHTML={{ __html: sanitizeHTML(field.value) }} 
                            />
                            
                            {/* Email Footer Simulation */}
                            <Box className="bg-gray-50 p-6 border-t border-gray-100 text-center">
                              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                                Sent via Flowlio Newsletter Service
                              </p>
                              <p className="text-[10px] text-gray-400 mt-2">
                                © 2024 Flowlio. All rights reserved.
                              </p>
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        <RichTextEditor
                          content={field.value}
                          onChange={field.onChange}
                          className="min-h-[400px]"
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Box>

            {/* Footer Actions */}
            <Flex className="p-6 border-t border-gray-100 justify-end gap-3 bg-gray-50/50">
              <Button
                variant="outline"
                className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 rounded-full px-6 h-11 transition-all"
                type="button"
                onClick={() => {
                  form.reset();
                  setIsPreview(false);
                  onClose();
                }}
                disabled={sendNewsletterMutation.isPending}
              >
                {t("common.cancel", "Discard")}
              </Button>
              <Button
                className="bg-[#1797b9] hover:bg-[#117a96] text-white shadow-md shadow-[#1797b9]/20 rounded-full px-8 h-11 flex items-center gap-2 font-semibold transition-all"
                type="submit"
                disabled={sendNewsletterMutation.isPending || !form.formState.isValid}
              >
                {sendNewsletterMutation.isPending ? (
                  <>
                    <Box className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t("superadmin.newsletter.modal.sending", "Sending...")}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {t("superadmin.newsletter.sendNewsletter", "Send Newsletter")}
                  </>
                )}
              </Button>
            </Flex>
          </form>
        </Form>
      </Box>
    </GeneralModal>
  );
};

// Add display name for debugging
SendNewsletterModal.displayName = "SendNewsletterModal";

