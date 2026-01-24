import {
  GanttCreateMarkerTrigger,
  GanttFeature,
  GanttFeatureList,
  GanttFeatureListGroup,
  GanttFeatureRow,
  GanttHeader,
  GanttProvider,
  GanttSidebar,
  GanttSidebarGroup,
  GanttSidebarItem,
  GanttTimeline,
  GanttToday,
} from "@/components/kibo-ui/gantt";
import { useFetchProjects } from "@/hooks/usefetchprojects";
import { useUpdateProject } from "@/hooks/useupdateproject";
import { EyeIcon, LinkIcon, Loader2 } from "lucide-react";
import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Badge } from "@/components/ui/badge";

// Status colors mapping
const statusColors: Record<string, string> = {
  pending: "#F98618",
  ongoing: "#005FA4",
  delayed: "#EF5350",
  completed: "#00A400",
};

interface GenericGanttProps {
  features: GanttFeature[];
  onMove?: (id: string, startAt: Date, endAt: Date | null) => void;
  isLoading?: boolean;
  onSelectItem?: (id: string) => void;
  emptyMessage?: string;
  sidebarTitle?: string;
}

/**
 * A reusable Gantt Chart component that focuses on UI rendering.
 */
export const GenericGantt = ({
  features,
  onMove,
  isLoading,
  onSelectItem,
  emptyMessage = "No items found",
  sidebarTitle = "",
}: GenericGanttProps) => {
  const handleViewDetails = (id: string) => onSelectItem?.(id);
  const handleCopyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/project/${id}`);
    console.log(`Copy link: ${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center border rounded-lg">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 ">Loading timeline...</span>
      </div>
    );
  }

  if (features.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center border border-dashed rounded-lg ">
        {emptyMessage}
      </div>
    );
  }

  return (
    <GanttProvider
      className="border rounded-lg h-[400px]"
      range="monthly"
      zoom={100}
    >
      <GanttSidebar>
        <GanttSidebarGroup name={sidebarTitle} >
          {features.map((feature) => (
            <GanttSidebarItem
              feature={feature}
              key={feature.id}
              onSelectItem={() => onSelectItem?.(feature.id)}
            />
          ))}
        </GanttSidebarGroup>
      </GanttSidebar>
      <GanttTimeline>
        <GanttHeader />
        <GanttToday />
        <GanttFeatureList>
          <GanttFeatureListGroup>
            <GanttFeatureRow features={features} onMove={onMove}>
              {(feature) => (
                <ContextMenu>
                  <ContextMenuTrigger asChild>
                    <div className="relative flex w-full h-full items-center px-2 overflow-hidden group">
                      {/* Progress background */}
                      {(feature as any).metadata?.progress !== undefined && (
                        <div
                          className="absolute inset-0 bg-green-500/10 transition-all group-hover:bg-green-500/20"
                          style={{ width: `${(feature as any).metadata.progress}%` }}
                        />
                      )}
                      
                      {/* Content */}
                      <div className="relative z-10 flex w-full items-center justify-between gap-2 overflow-hidden">
                        <div className="flex items-center gap-2 overflow-hidden">
                           {(feature as any).metadata?.clientImage && (
                            <Avatar className="h-4 w-4 shrink-0 border border-background shadow-sm">
                              <AvatarImage src={(feature as any).metadata.clientImage} />
                              <AvatarFallback className="text-[8px]">
                                {feature.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <p className="truncate text-[10px] font-medium leading-none">
                            {feature.name}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {(feature as any).metadata?.progress !== undefined && (
                            <span className="text-[9px] text-muted-foreground font-mono">
                              {(feature as any).metadata.progress}%
                            </span>
                          )}
                          <Badge 
                            variant="outline" 
                            className="h-3.5 px-1 text-[8px] uppercase font-bold border-none"
                            style={{ 
                              backgroundColor: `${feature.status.color}20`,
                              color: feature.status.color 
                            }}
                          >
                            {feature.status.name}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      className="flex items-center gap-2"
                      onClick={() => handleViewDetails(feature.id)}
                    >
                      <EyeIcon size={14} />
                      View Details
                    </ContextMenuItem>
                    <ContextMenuItem
                      className="flex items-center gap-2"
                      onClick={() => handleCopyLink(feature.id)}
                    >
                      <LinkIcon size={14} />
                      Copy Link
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              )}
            </GanttFeatureRow>
          </GanttFeatureListGroup>
        </GanttFeatureList>
        <GanttCreateMarkerTrigger onCreateMarker={(d) => console.log(d)} />
      </GanttTimeline>
    </GanttProvider>
  );
};

/**
 * Project-specific implementation of the Gantt chart.
 */
const ProjectGantt = () => {
  const { data: projectsData, isLoading } = useFetchProjects();
  const { mutate: updateProject } = useUpdateProject();

  const projectFeatures = useMemo(() => {
    if (!projectsData?.data) return [];
    
    return projectsData.data.map((p) => ({
      id: p.id,
      name: p.projectName,
      startAt: p.startDate ? new Date(p.startDate) : new Date(),
      endAt: p.endDate ? new Date(p.endDate) : new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      status: {
        id: p.status,
        name: p.status,
        color: statusColors[p.status] || "#94a3b8",
      },
      lane: "projects",
      metadata: {
        progress: p.progress,
        clientImage: p.clientImage,
        project: p,
      },
    })) as GanttFeature[];
  }, [projectsData]);

  const handleMoveProject = (id: string, startAt: Date, endAt: Date | null) => {
    if (!endAt) return;
    updateProject({
      id,
      data: {
        startDate: startAt.toISOString(),
        endDate: endAt.toISOString(),
      },
    });
  };

  const handleSelectProject = (id: string) => {
    console.log(`Project selected: ${id}`);
    // You could navigate here: navigate(`/dashboard/project/view/${id}`)
  };

  return (
    <div className="space-y-4">
      <GenericGantt
        features={projectFeatures}
        onMove={handleMoveProject}
        isLoading={isLoading}
        onSelectItem={handleSelectProject}
        sidebarTitle="Projects"
        emptyMessage="No projects found to display on the timeline."
      />
    </div>
  );
};

export default ProjectGantt;
