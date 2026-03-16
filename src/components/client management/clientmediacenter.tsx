import React, { useState, useMemo } from "react";
import { Box } from "../ui/box";
import { Flex } from "../ui/flex";
import { Stack } from "../ui/stack";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  FileText,
  Image as ImageIcon,
  Search,
  Download,
  Eye,
  Calendar,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { useFetchProjects } from "@/hooks/usefetchprojects";
import { Skeleton } from "../ui/skeleton";
import { useFetchClientMedia } from "@/hooks/usefetchclientmedia";

import { toast } from "sonner";

export const ClientMediaCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { data: projectsResponse, isLoading: projectsLoading } =
    useFetchProjects();
  const projects = projectsResponse?.data ?? [];

  const { data: mediaResponse, isLoading: mediaLoading } = useFetchClientMedia({
    projectId: projectFilter === "all" ? undefined : projectFilter,
    searchTerm: searchTerm || undefined,
  });

  const mediaItems = mediaResponse?.data ?? [];

  const filteredMedia = useMemo(() => {
    return [...mediaItems].sort((a, b) => {
      if (sortBy === "newest")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortBy === "oldest")
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      return a.fileName.localeCompare(b.fileName);
    });
  }, [mediaItems, sortBy]);

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/") || type === "projectImage")
      return <ImageIcon className="w-12 h-12 text-blue-400 opacity-40" />;
    return <FileText className="w-12 h-12 text-blue-400 opacity-40" />;
  };

  const handleDownload = async (file: any) => {
    const toastId = toast.loading("Preparing download...");
    try {
      let downloadUrl = file.fileUrl;
      
      // For Cloudinary, we use their native attachment flag which is the most reliable
      if (downloadUrl.includes("cloudinary.com") && downloadUrl.includes("/upload/")) {
        const forcedUrl = downloadUrl.replace("/upload/", "/upload/fl_attachment/");
        const link = document.createElement("a");
        link.href = forcedUrl;
        link.target = "_blank";
        link.download = file.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Download started", { id: toastId });
        return;
      }

      // For non-Cloudinary files, try the blob approach
      const response = await fetch(downloadUrl);
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = file.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        toast.success("Download started", { id: toastId });
      } else {
        window.open(downloadUrl, "_blank");
        toast.success("Opening in new tab...", { id: toastId });
      }
    } catch (error) {
      console.error("Download failed:", error);
      window.open(file.fileUrl, "_blank");
      toast.success("Opening in new tab...", { id: toastId });
    }
  };

  return (
    <Stack className="gap-8 w-full">
      <Box className="flex items-center justify-between">
        <Box>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Media Center
          </h1>
          <p className="text-gray-500 mt-1">
            Browse and manage your digital assets across all work.
          </p>
        </Box>
      </Box>

      {/* Filters and Search */}
      <Card className="border-none shadow-sm bg-white p-2 rounded-2xl">
        <CardContent className="p-2">
          <Flex className="gap-3 flex-wrap">
            <Box className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search resources..."
                className="pl-11 h-12 rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-100 placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>

            <Box className="w-[200px]">
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-none text-gray-700 font-medium">
                  <SelectValue placeholder="All Projects" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map((proj) => (
                    <SelectItem key={proj.id} value={proj.id}>
                      {proj.projectName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Box>

            <Box className="w-[160px]">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-none text-gray-700 font-medium">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </Box>
          </Flex>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaLoading ? (
          Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-2xl" />
          ))
        ) : filteredMedia.length > 0 ? (
          filteredMedia.map((file) => (
            <Box
              key={file.fileId}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer"
            >
              {/* Media Preview */}
              <Box className="w-full h-full flex items-center justify-center pointer-events-none">
                {file.fileType.startsWith("image/") ||
                file.fileType === "projectImage" ? (
                  <img
                    src={file.fileUrl}
                    alt={file.fileName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (file.fileType?.toLowerCase().includes("pdf") || 
                     file.fileName?.toLowerCase().endsWith(".pdf")) ? (
                  <Box className="w-full h-full p-2 overflow-hidden relative pointer-events-none">
                    <iframe
                      src={`${file.fileUrl}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                      className="w-[110%] h-[110%] -translate-x-[5%] -translate-y-[5%] border-none opacity-80 group-hover:opacity-100 transition-opacity"
                      scrolling="no"
                      title={file.fileName}
                    />
                  </Box>
                ) : (
                  <Box className="flex flex-col items-center">
                    {getFileIcon(file.fileType)}
                    <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">
                      {file.fileType}
                    </span>
                  </Box>
                )}
              </Box>

              {/* Version Badge (Top Left - Floating) */}
              <Box className="absolute top-3 left-3 z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
                <span className="bg-white/80 backdrop-blur-md text-[10px] font-black px-2 py-1 rounded-lg text-gray-800 shadow-sm border border-white/50">
                  V{file.latestVersion}
                </span>
              </Box>

              {/* Hover Overlay */}
              <Box className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                <Stack className="gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <Box>
                    <p className="text-white font-bold text-sm leading-tight line-clamp-2 drop-shadow-md">
                      {file.fileName}
                    </p>
                    <Flex className="items-center gap-2 mt-2 text-white/60 text-[10px]">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(file.createdAt), "MMM d, yyyy")}
                    </Flex>
                  </Box>

                  <Box className="space-y-1 border-t border-white/10 pt-3">
                    {file.projectName && (
                      <Flex className="items-center gap-2">
                        <Box className="w-1 h-1 rounded-full bg-blue-400" />
                        <p className="text-[10px] font-bold text-blue-300 uppercase tracking-tighter truncate">
                          {file.projectName}
                        </p>
                      </Flex>
                    )}
                    {file.taskName && (
                      <p className="text-[10px] text-white/50 italic truncate">
                        {file.taskName}
                      </p>
                    )}
                  </Box>

                  <Flex className="gap-2 mt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-white hover:bg-white/90 text-black h-9 rounded-xl font-bold text-xs gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(file.fileUrl, "_blank");
                      }}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="w-10 h-9 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-xl p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(file);
                      }}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                  </Flex>
                </Stack>
              </Box>
            </Box>
          ))
        ) : (
          <Box className="col-span-full py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-300">
            <ImageIcon className="w-16 h-16 mb-4 opacity-10" />
            <p className="text-xl font-bold text-gray-400">No assets found</p>
            <p className="text-sm">Try broadening your search criteria.</p>
          </Box>
        )}
      </Box>
    </Stack>
  );
};
