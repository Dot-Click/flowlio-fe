import { Stack } from "@/components/ui/stack";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Center } from "@/components/ui/center";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Clock,
  Play,
  Square,
  BarChart3,
  Trash2,
  RotateCcw,
} from "lucide-react";
import {
  useActiveTimeEntries,
  useStartTask,
  useEndTask,
  useDeleteTimeEntry,
} from "@/hooks/useTimeTracking";
import { useAllTimeEntries } from "@/hooks/useAllTimeEntries";
import { useFetchProjects } from "@/hooks/usefetchprojects";
import { useFetchTasks } from "@/hooks/usefetchtasks";
import { useFetchOrganizationWeeklyHoursTracked } from "@/hooks/useFetchOrganizationWeeklyHoursTracked";
import { formatHours, formatDuration } from "@/utils/timeFormat";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Active Timer Component for table cells
const ActiveTableTimer = ({ startTime }: { startTime: string }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const calculateElapsed = () => {
      const start = new Date(startTime).getTime();
      const now = new Date().getTime();
      return Math.floor((now - start) / 1000);
    };

    setElapsed(calculateElapsed());
    const interval = setInterval(() => {
      setElapsed(calculateElapsed());
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts: string[] = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

    return parts.join(" ");
  };

  return (
    <span className="text-lg font-mono font-bold text-green-600">
      {formatTime(elapsed)}
    </span>
  );
};

const TimeTrackingPage = () => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<string>("");

  // Fetch data for regular users
  const { data: projects } = useFetchProjects();
  const { data: tasks } = useFetchTasks();
  const { data: activeTimeEntries } = useActiveTimeEntries();
  const { data: allTimeEntries } = useAllTimeEntries();
  const { data: weeklyHours } = useFetchOrganizationWeeklyHoursTracked();

  // Mutations
  const startTaskMutation = useStartTask();
  const endTaskMutation = useEndTask();
  const deleteEntryMutation = useDeleteTimeEntry();

  // Get current active time entry
  const activeTimeEntry = activeTimeEntries?.data?.[0];
  const isTracking = !!activeTimeEntry;

  // Real-time elapsed time state for active tracking
  const [elapsedTime, setElapsedTime] = useState(0);

  // Update elapsed time every second when tracking
  useEffect(() => {
    if (activeTimeEntry && isTracking) {
      const calculateElapsed = () => {
        const start = new Date(activeTimeEntry.startTime).getTime();
        const now = new Date().getTime();
        return Math.floor((now - start) / 1000); // seconds
      };

      // Calculate immediately
      setElapsedTime(calculateElapsed());

      // Update every second
      const interval = setInterval(() => {
        setElapsedTime(calculateElapsed());
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setElapsedTime(0);
    }
  }, [activeTimeEntry, isTracking]);

  // Format time as h m s format
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts: string[] = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

    return parts.join(" ");
  };

  // Filter tasks based on selected project
  const filteredTasks =
    tasks?.data?.filter((task) => task.projectId === selectedProject) || [];

  // Handle starting time tracking
  const handleStart = async () => {
    if (!selectedTask) {
      toast.error("Please select a task to track");
      return;
    }

    if (isTracking) {
      toast.error("You are already tracking a task");
      return;
    }

    try {
      await startTaskMutation.mutateAsync(selectedTask);
    } catch (error) {
      console.error("Failed to start task:", error);
    }
  };

  // Handle stopping time tracking
  const handleStop = async () => {
    if (!activeTimeEntry) {
      toast.error("No active time tracking found");
      return;
    }

    try {
      await endTaskMutation.mutateAsync(activeTimeEntry.taskId);
    } catch (error) {
      console.error("Failed to stop task:", error);
    }
  };

  // Handle deleting time entry
  const handleDelete = async (entryId: string) => {
    if (!confirm("Are you sure you want to delete this time entry?")) {
      return;
    }

    try {
      await deleteEntryMutation.mutateAsync(entryId);
    } catch (error) {
      console.error("Failed to delete time entry:", error);
    }
  };

  // Handle restarting task from history
  const handleRestart = async (taskId: string) => {
    if (isTracking) {
      toast.error("Please stop the current task before starting a new one");
      return;
    }

    try {
      await startTaskMutation.mutateAsync(taskId);
    } catch (error) {
      console.error("Failed to restart task:", error);
    }
  };

  return (
    <Stack className="pt-5 gap-6 px-2">
      {/* Header */}
      <Box className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <Flex className="items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Time Tracking</h1>
            <p className="text-gray-600 mt-1">
              Track your work hours and manage time efficiently
            </p>
          </div>
          <Center className="w-16 h-16 bg-blue-100 rounded-full">
            <Clock className="w-8 h-8 text-blue-600" />
          </Center>
        </Flex>
      </Box>

      {/* Stats Cards */}
      <Flex className="gap-4">
        <Box className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <Flex className="items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Weekly Hours
              </h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {formatHours(weeklyHours?.data?.weeklyHours || 0)}
              </p>
              <p className="text-sm text-gray-500 mt-1">This week</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </Flex>
        </Box>

        <Box className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <Flex className="items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Active Tracking
              </h3>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {isTracking ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {isTracking ? "Currently tracking" : "Not tracking"}
              </p>
            </div>
            <Play className="w-8 h-8 text-green-600" />
          </Flex>
        </Box>
      </Flex>

      {/* Time Tracking Controls */}
      <Box className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Quick Time Tracking
        </h2>

        {/* Show active tracking info with real-time timer */}
        {isTracking && activeTimeEntry && (
          <Box className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mb-6">
            <Flex className="items-center justify-between flex-wrap gap-4">
              <div className="flex-1 min-w-[300px]">
                <Flex className="items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <h3 className="font-bold text-green-800 text-lg">
                    Currently Tracking
                  </h3>
                </Flex>
                <Stack className="gap-2">
                  <p className="text-green-700">
                    <strong>Task:</strong> {activeTimeEntry.taskTitle}
                  </p>
                  <p className="text-green-700">
                    <strong>Project:</strong> {activeTimeEntry.projectName}
                  </p>
                  <p className="text-green-700">
                    <strong>Started at:</strong>{" "}
                    {format(new Date(activeTimeEntry.startTime), "PPpp")}
                  </p>
                  <p className="text-green-700 text-sm">
                    Started{" "}
                    {formatDistanceToNow(new Date(activeTimeEntry.startTime))}{" "}
                    ago
                  </p>
                </Stack>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Box className="bg-white border-2 border-green-400 rounded-lg p-4 text-center min-w-[200px]">
                  <p className="text-sm text-gray-600 mb-2">Elapsed Time</p>
                  <span className="text-4xl font-mono font-bold text-green-600">
                    {formatTime(elapsedTime)}
                  </span>
                  <p className="text-xs text-gray-500 mt-2">Running...</p>
                </Box>
                <Button
                  onClick={handleStop}
                  disabled={endTaskMutation.isPending}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 cursor-pointer"
                >
                  <Square className="w-4 h-4 mr-2" />
                  {endTaskMutation.isPending ? "Stopping..." : "Stop Tracking"}
                </Button>
              </div>
            </Flex>
          </Box>
        )}

        {/* Project and Task Selection */}
        <Flex className="gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project
            </label>
            <Select
              value={selectedProject}
              onValueChange={(value) => {
                setSelectedProject(value);
                setSelectedTask("");
              }}
              disabled={isTracking}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                {projects?.data?.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.projectName} ({project.projectNumber})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task
            </label>
            <Select
              value={selectedTask}
              onValueChange={(value) => setSelectedTask(value)}
              disabled={isTracking || !selectedProject}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Task" />
              </SelectTrigger>
              <SelectContent>
                {filteredTasks.map((task) => (
                  <SelectItem key={task.id} value={task.id}>
                    {task.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Flex>

        {/* Start Button */}
        {!isTracking && (
          <Button
            onClick={handleStart}
            disabled={!selectedTask || startTaskMutation.isPending}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3"
          >
            <Play className="w-5 h-5 mr-2" />
            {startTaskMutation.isPending ? "Starting..." : "Start Tracking"}
          </Button>
        )}
      </Box>

      {/* Time Entries History */}
      <Box className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Time Entries History
        </h2>

        {allTimeEntries?.data && allTimeEntries.data.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Project</TableHead>
                  <TableHead className="font-semibold">Task</TableHead>
                  <TableHead className="font-semibold">Start Time</TableHead>
                  <TableHead className="font-semibold">End Time</TableHead>
                  <TableHead className="font-semibold">Duration</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTimeEntries.data.map((entry) => (
                  <TableRow
                    key={entry.id}
                    className={
                      entry.status === "active"
                        ? "bg-green-50 hover:bg-green-100"
                        : ""
                    }
                  >
                    <TableCell className="font-medium">
                      {entry.projectName}
                    </TableCell>
                    <TableCell className="font-medium">
                      {entry.taskTitle}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {format(new Date(entry.startTime), "PPp")}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {entry.endTime
                        ? format(new Date(entry.endTime), "PPp")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {entry.status === "active" ? (
                        <ActiveTableTimer startTime={entry.startTime} />
                      ) : (
                        <span className="font-mono font-semibold text-gray-700">
                          {formatDuration(entry.duration ? entry.duration : 0)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {entry.status === "active" ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                          COMPLETED
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Flex className="justify-end gap-2">
                        {entry.status === "completed" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRestart(entry.taskId)}
                            disabled={isTracking || startTaskMutation.isPending}
                            className="h-8 px-2 hover:bg-blue-50 cursor-pointer"
                            title="Restart this task"
                          >
                            <RotateCcw className="h-4 w-4 text-blue-600" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(entry.id)}
                          disabled={deleteEntryMutation.isPending}
                          className="h-8 px-2 hover:bg-red-50 cursor-pointer"
                          title="Delete this entry"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </Flex>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No time entries found</p>
            <p className="text-sm text-gray-400 mt-1">
              Start tracking time to see your entries here
            </p>
          </div>
        )}
      </Box>
    </Stack>
  );
};

export default TimeTrackingPage;
