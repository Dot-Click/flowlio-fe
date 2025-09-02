import { IoArrowBack } from "react-icons/io5";
import { PageWrapper } from "../common/pagewrapper";
import { Box } from "../ui/box";
import { useNavigate, useParams } from "react-router";
import { Center } from "../ui/center";
import { Button } from "../ui/button";
import { useFetchProjectById } from "../../hooks/usefetchprojects";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  User,
  Building2,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Edit,
  Download,
  MessageCircle,
  Users,
  BarChart3,
  Eye,
  EyeIcon,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  GeneralModal,
  useGeneralModalDisclosure,
} from "../common/generalmodal";
import { useState } from "react";
import { toast } from "sonner";

export const ProjectView = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: projectData, isLoading, error } = useFetchProjectById(id || "");

  const { open, onOpenChange } = useGeneralModalDisclosure();

  if (isLoading) {
    return (
      <PageWrapper className="mt-6 p-6">
        <Center className="h-96">
          <Box className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></Box>
        </Center>
      </PageWrapper>
    );
  }

  if (error || !projectData?.data) {
    return (
      <PageWrapper className="mt-6 p-6">
        <Box className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600 text-center">
            {error?.message || "Project not found"}
          </p>
          <Center className="mt-4">
            <Button onClick={() => navigate(-1)} variant="outline">
              Go Back
            </Button>
          </Center>
        </Box>
      </PageWrapper>
    );
  }

  const project = projectData.data;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "ongoing":
        return <PlayCircle className="h-4 w-4 text-blue-600" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "ongoing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleEdit = () => {
    navigate(`/dashboard/projects/edit/${project.id}`);
  };

  const handleDownload = () => {
    if (project.contractfile) {
      const link = document.createElement("a");
      link.href = project.contractfile;
      link.download = `${project.projectName || "project"}-contract.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Contract file downloaded!");
    } else {
      toast.error("No contract file available");
    }
  };

  const handleViewImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onOpenChange(true);
  };

  const handleOpenInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <PageWrapper className="mt-6 p-6">
      {/* Header */}
      <Box className="flex items-center justify-between mb-6">
        <Box className="flex items-center gap-4">
          <Box
            className="flex items-center gap-2 w-20 cursor-pointer transition-all duration-300 hover:bg-gray-200 rounded-full hover:p-2"
            onClick={() => navigate(-1)}
          >
            <IoArrowBack />
            <p className="text-black">Back</p>
          </Box>

          {/* Breadcrumb */}
          <Box className="flex items-center gap-2 text-sm text-gray-600">
            <Button
              variant="link"
              className="p-0 h-auto text-gray-600 hover:text-gray-900"
              onClick={() => navigate("/dashboard/projects")}
            >
              Projects
            </Button>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {project.projectName}
            </span>
          </Box>
        </Box>
      </Box>

      {/* Project Header Card */}
      <Card className="mb-6 border-0 shadow-xl bg-gradient-to-r from-blue-50 via-white to-purple-50">
        <CardHeader className="pb-6">
          <Box className="flex items-start justify-between">
            <Box className="flex-1">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                {project.projectName || "Untitled Project"}
              </CardTitle>
              <Box className="flex items-center gap-6 mb-6">
                <Badge
                  variant="outline"
                  className={`${getStatusColor(
                    project.status
                  )} flex items-center gap-2 px-4 py-2 text-sm font-medium`}
                >
                  {getStatusIcon(project.status)}
                  {project.status?.charAt(0).toUpperCase() +
                    project.status?.slice(1)}
                </Badge>
                <Box className="flex items-center gap-2 text-sm text-gray-600 bg-white/70 px-3 py-2 rounded-full">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">
                    Progress: {project.progress}%
                  </span>
                </Box>
                <Box className="flex items-center gap-2 text-sm text-gray-600 bg-white/70 px-3 py-2 rounded-full">
                  <Building2 className="h-4 w-4 text-green-600" />
                  <span className="font-medium">
                    {project.clientName || "No Client"}
                  </span>
                </Box>
              </Box>
              <Box className="relative">
                <Progress
                  value={project.progress}
                  className="w-full h-3 bg-gray-200 rounded-full overflow-hidden"
                />
                <Box className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-20"></Box>
              </Box>
            </Box>
            <Box className="flex flex-col gap-3">
              {project.contractfile && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-white hover:bg-blue-50 border-blue-200 text-blue-700"
                >
                  <Download className="h-4 w-4" />
                  Contract
                </Button>
              )}
            </Box>
          </Box>
        </CardHeader>
      </Card>

      {/* Main Content Grid */}
      <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Project Details */}
        <Box className="lg:col-span-2 space-y-6">
          {/* Project Information */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30 p-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="h-5 w-5" />
                Project Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Box className="flex items-center gap-4 p-4 bg-white/70 rounded-lg border border-blue-100">
                  <Box className="p-2 bg-blue-100 rounded-full">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </Box>
                  <Box>
                    <p className="text-sm text-gray-600 font-medium">
                      Project Number
                    </p>
                    <p className="font-semibold text-gray-900">
                      {project.projectNumber}
                    </p>
                  </Box>
                </Box>
                <Box className="flex items-center gap-4 p-4 bg-white/70 rounded-lg border border-green-100">
                  <Box className="p-2 bg-green-100 rounded-full">
                    <User className="h-5 w-5 text-green-600" />
                  </Box>
                  <Box>
                    <p className="text-sm text-gray-600 font-medium">
                      Assigned To
                    </p>
                    <p className="font-semibold text-gray-900">
                      {project.assignedProject || "Not assigned"}
                    </p>
                  </Box>
                </Box>
                <Box className="flex items-center gap-4 p-4 bg-white/70 rounded-lg border border-purple-100">
                  <Box className="p-2 bg-purple-100 rounded-full">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </Box>
                  <Box>
                    <p className="text-sm text-gray-600 font-medium">
                      Start Date
                    </p>
                    <p className="font-semibold text-gray-900">
                      {project.startDate
                        ? format(new Date(project.startDate), "MMM dd, yyyy")
                        : "Not set"}
                    </p>
                  </Box>
                </Box>
                <Box className="flex items-center gap-4 p-4 bg-white/70 rounded-lg border border-orange-100">
                  <Box className="p-2 bg-orange-100 rounded-full">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </Box>
                  <Box>
                    <p className="text-sm text-gray-600 font-medium">
                      End Date
                    </p>
                    <p className="font-semibold text-gray-900">
                      {project.endDate
                        ? format(new Date(project.endDate), "MMM dd, yyyy")
                        : "Not set"}
                    </p>
                  </Box>
                </Box>
              </Box>

              {project.address && (
                <Box className="flex items-start gap-4 p-4 bg-white/70 rounded-lg border border-gray-100">
                  <Box className="p-2 bg-gray-100 rounded-full mt-1">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </Box>
                  <Box>
                    <p className="text-sm text-gray-600 font-medium mb-1">
                      Address
                    </p>
                    <p className="font-semibold text-gray-900">
                      {project.address}
                    </p>
                  </Box>
                </Box>
              )}

              {project.description && (
                <Box className="p-4 bg-white/70 rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-600 font-medium mb-3">
                    Description
                  </p>
                  <p className="text-gray-900 leading-relaxed bg-white p-4 rounded-lg border border-gray-200">
                    {project.description}
                  </p>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Project Documents Showcase */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/30 p-0">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg p-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="h-5 w-5" />
                Contract Document Showcase
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Box className="space-y-6">
                {/* Contract File Showcase */}
                {project.contractfile ? (
                  <Box className="space-y-4">
                    {/* PDF Showcase */}
                    <Box className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <Box className="bg-gray-50 p-4 border-b">
                        <Box className="flex items-center justify-between">
                          <Box className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-red-600" />
                            <span className="font-medium text-gray-900">
                              {project.projectName || "Project"}-Contract.pdf
                            </span>
                          </Box>
                          <Box className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleViewImage(project.contractfile!)
                              }
                              className="flex items-center gap-1"
                            >
                              <Eye className="h-4 w-4" />
                              View Full Screen
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleOpenInNewTab(project.contractfile!)
                              }
                              className="flex items-center gap-1"
                            >
                              <EyeIcon className="h-4 w-4" />
                              Open in New Tab
                            </Button>
                          </Box>
                        </Box>
                      </Box>

                      {/* PDF Preview */}
                      <Box className="h-[500px] bg-white">
                        <iframe
                          src={`${project.contractfile}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                          className="w-full h-full border-0"
                          title="Contract Document Preview"
                          onError={(e) => {
                            console.error("PDF failed to load:", e);
                            const iframe = e.target as HTMLIFrameElement;
                            iframe.style.display = "none";
                            const fallback =
                              iframe.parentElement?.querySelector(
                                ".pdf-fallback"
                              ) as HTMLElement;
                            if (fallback) fallback.style.display = "block";
                          }}
                        />

                        {/* Fallback for PDF viewing */}
                        <Box
                          className="pdf-fallback hidden h-full flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleViewImage(project.contractfile!)}
                        >
                          <FileText className="h-20 w-20 text-gray-400 mb-4" />
                          <p className="text-xl font-medium text-gray-700 mb-2">
                            Contract Document
                          </p>
                          <p className="text-sm text-gray-500 mb-4 text-center max-w-sm">
                            Click to view the contract file in full screen
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleOpenInNewTab(project.contractfile!)
                            }
                          >
                            <EyeIcon className="h-4 w-4 mr-2" />
                            Open in New Tab
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Contract File
                    </h3>
                    <p className="text-gray-500">
                      This project doesn't have a contract file uploaded.
                    </p>
                  </Box>
                )}

                {/* Document Information */}
                {project.contractfile && (
                  <Box className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <Box className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">
                        Document Information
                      </span>
                    </Box>
                    <Box className="text-sm text-blue-800 space-y-1">
                      <p>
                        • Contract document for{" "}
                        {project.projectName || "this project"}
                      </p>
                      <p>
                        • Click "View Full Screen" to open in modal with full
                        PDF controls
                      </p>

                      <p>
                        • Click "Open in New Tab" to view in your browser's PDF
                        viewer
                      </p>
                    </Box>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Right Column - Sidebar */}
        <Box className="space-y-6">
          {/* Client Information */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50/30 p-0">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg p-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Building2 className="h-5 w-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Box className="flex items-center gap-4 p-4 bg-white/70 rounded-lg border border-green-100">
                <Avatar className="h-12 w-12 bg-gradient-to-r from-green-500 to-emerald-500">
                  <AvatarFallback className="text-white font-semibold">
                    {project.clientName?.charAt(0) || "C"}
                  </AvatarFallback>
                </Avatar>
                <Box>
                  <p className="font-semibold text-gray-900 text-lg">
                    {project.clientName || "Unknown Client"}
                  </p>
                  <p className="text-sm text-gray-600 bg-green-100 px-2 py-1 rounded-full inline-block">
                    Client
                  </p>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Project Stats */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30 p-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg p-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="h-5 w-5" />
                Project Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-4">
              <Box className="p-4 bg-white/70 rounded-lg border border-blue-100">
                <Box className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600 font-medium">
                    Progress
                  </span>
                  <span className="font-bold text-blue-600 text-lg">
                    {project.progress}%
                  </span>
                </Box>
                <Progress
                  value={project.progress}
                  className="h-3 bg-gray-200"
                />
              </Box>

              <Separator className="bg-gray-200" />

              <Box className="p-4 bg-white/70 rounded-lg border border-gray-100">
                <Box className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-medium">
                    Status
                  </span>
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(
                      project.status
                    )} flex items-center gap-1 px-3 py-1`}
                  >
                    {getStatusIcon(project.status)}
                    {project.status?.charAt(0).toUpperCase() +
                      project.status?.slice(1)}
                  </Badge>
                </Box>
              </Box>

              <Box className="p-4 bg-white/70 rounded-lg border border-gray-100">
                <Box className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-medium">
                    Created
                  </span>
                  <span className="font-semibold text-gray-900">
                    {format(new Date(project.createdAt), "MMM dd, yyyy")}
                  </span>
                </Box>
              </Box>

              <Box className="p-4 bg-white/70 rounded-lg border border-gray-100">
                <Box className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-medium">
                    Last Updated
                  </span>
                  <span className="font-semibold text-gray-900">
                    {format(new Date(project.updatedAt), "MMM dd, yyyy")}
                  </span>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/30 p-0">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg p-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <Button
                variant="outline"
                className="w-full justify-start bg-white hover:bg-purple-50 border-purple-200 text-purple-700"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start bg-white hover:bg-blue-50 border-blue-200 text-blue-700"
                onClick={() => {
                  // TODO: Implement comments
                  toast.info("Comments feature coming soon!");
                }}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                View Comments
              </Button>
            </CardContent>
          </Card>

          {/* Additional Project PDFs */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-orange-50/30 p-0">
            <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg p-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="h-5 w-5" />
                Project PDF
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Box className="space-y-4">
                {/* Project PDF */}
                {project.projectFiles?.projectPdf ? (
                  <Box className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <Box className="flex items-center justify-between mb-3">
                      <Box className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-900">
                          Project PDF
                        </span>
                      </Box>
                      <Badge
                        variant="outline"
                        className="text-xs bg-blue-100 text-blue-800"
                      >
                        PDF Document
                      </Badge>
                    </Box>

                    <Box className="space-y-3">
                      <p className="text-sm text-gray-600">
                        {project.projectFiles.projectPdf.name}
                      </p>

                      <Box className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleOpenInNewTab(
                              project.projectFiles?.projectPdf?.url || ""
                            )
                          }
                          className="flex items-center gap-1 bg-white hover:bg-blue-50"
                        >
                          <EyeIcon className="h-4 w-4" />
                          View PDF
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href =
                              project.projectFiles?.projectPdf?.url || "";
                            link.download =
                              project.projectFiles?.projectPdf?.name || "";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            toast.success("Project PDF downloaded!");
                          }}
                          className="flex items-center gap-1 bg-white hover:bg-blue-50"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                    <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      No project PDF uploaded
                    </p>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* PDF Showcase Modal */}
      <GeneralModal
        contentProps={{
          className: "max-w-full p-2 overflow-hidden",
        }}
        open={open}
        onOpenChange={onOpenChange}
      >
        {selectedImage && (
          <Box className="w-full h-[90vh] flex flex-col">
            {/* Modal Header */}
            <Box className="flex items-center justify-between p-4 border-b bg-gray-50">
              <Box className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-red-600" />
                <span className="font-medium text-gray-900">
                  {project.projectName || "Project"}-Contract.pdf
                </span>
                <Badge variant="outline" className="text-xs">
                  Contract Document
                </Badge>
              </Box>
            </Box>

            {/* PDF Showcase Viewer */}
            <Box className="flex-1 bg-white">
              <iframe
                src={`${selectedImage}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                className="w-full h-full border-0"
                title="Contract Document Showcase"
                onError={(e) => {
                  console.error("PDF failed to load in modal:", e);
                  toast.error(
                    "Failed to load PDF. Please try opening in a new tab."
                  );
                }}
              />
            </Box>

            {/* Modal Footer */}
            <Box className="p-4 border-t bg-gray-50">
              <Box className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Contract document for {project.projectName || "this project"}
                </span>
                <span>Use the PDF controls above to navigate and zoom</span>
              </Box>
            </Box>
          </Box>
        )}
      </GeneralModal>
    </PageWrapper>
  );
};
