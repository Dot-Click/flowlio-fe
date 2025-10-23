import { Stack } from "@/components/ui/stack";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { Center } from "@/components/ui/center";
import { Button } from "@/components/ui/button";
import { Clock, Play, Square, BarChart3 } from "lucide-react";
import {
  useActiveTimeEntries,
  useStartTask,
  useEndTask,
} from "@/hooks/useTimeTracking";
import { useAllTimeEntries } from "@/hooks/useAllTimeEntries";
import { useFetchProjects } from "@/hooks/usefetchprojects";
import { useFetchTasks } from "@/hooks/usefetchtasks";
import { useFetchOrganizationWeeklyHoursTracked } from "@/hooks/useFetchOrganizationWeeklyHoursTracked";
import { formatHours } from "@/utils/timeFormat";
import { toast } from "sonner";
import { useState } from "react";

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

  // Get current active time entry
  const activeTimeEntry = activeTimeEntries?.data?.[0];
  const isTracking = !!activeTimeEntry;

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

        {/* Show active tracking info */}
        {isTracking && activeTimeEntry && (
          <Box className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <Flex className="items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-800">
                  Currently Tracking:
                </h3>
                <p className="text-green-700">
                  <strong>Task:</strong> {activeTimeEntry.taskTitle}
                </p>
                <p className="text-green-700">
                  <strong>Project:</strong> {activeTimeEntry.projectName}
                </p>
                <p className="text-green-700">
                  <strong>Started:</strong>{" "}
                  {new Date(activeTimeEntry.startTime).toLocaleTimeString()}
                </p>
              </div>
              <Button
                onClick={handleStop}
                disabled={endTaskMutation.isPending}
                className="bg-red-500 hover:bg-red-600"
              >
                <Square className="w-4 h-4 mr-2" />
                {endTaskMutation.isPending ? "Stopping..." : "Stop"}
              </Button>
            </Flex>
          </Box>
        )}

        {/* Project and Task Selection */}
        <Flex className="gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project
            </label>
            <select
              value={selectedProject}
              onChange={(e) => {
                setSelectedProject(e.target.value);
                setSelectedTask("");
              }}
              disabled={isTracking}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Project</option>
              {projects?.data?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.projectName} ({project.projectNumber})
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task
            </label>
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              disabled={isTracking || !selectedProject}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Task</option>
              {filteredTasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>
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
          <div className="space-y-4">
            {allTimeEntries.data.map((entry) => (
              <Box
                key={entry.id}
                className={`p-4 rounded-lg border ${
                  entry.status === "active"
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <Flex className="items-center justify-between">
                  <div className="flex-1">
                    <Flex className="items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {entry.taskTitle}
                      </h3>
                      {entry.status === "active" && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          ACTIVE
                        </span>
                      )}
                    </Flex>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Project:</strong> {entry.projectName}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Started:</strong>{" "}
                      {new Date(entry.startTime).toLocaleString()}
                    </p>
                    {entry.endTime && (
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Ended:</strong>{" "}
                        {new Date(entry.endTime).toLocaleString()}
                      </p>
                    )}
                    {entry.duration && (
                      <p className="text-sm text-gray-600">
                        <strong>Duration:</strong>{" "}
                        {formatHours(entry.duration / 60)}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    {entry.status === "active" ? (
                      <span className="text-lg font-mono font-bold text-green-600">
                        {(() => {
                          const startTime = new Date(entry.startTime);
                          const now = new Date();
                          const elapsed = Math.floor(
                            (now.getTime() - startTime.getTime()) / 1000
                          );
                          const h = String(Math.floor(elapsed / 3600)).padStart(
                            2,
                            "0"
                          );
                          const m = String(
                            Math.floor((elapsed % 3600) / 60)
                          ).padStart(2, "0");
                          const s = String(elapsed % 60).padStart(2, "0");
                          return `${h}:${m}:${s}`;
                        })()}
                      </span>
                    ) : (
                      <span className="text-lg font-mono font-bold text-gray-600">
                        {formatHours(entry.duration ? entry.duration / 60 : 0)}
                      </span>
                    )}
                  </div>
                </Flex>
              </Box>
            ))}
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
