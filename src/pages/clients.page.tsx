import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import { useUser } from "@/providers/user.provider";
import { useFetchClientProjects, useFetchClientTasks, useFetchClientInvoices } from "@/hooks/useFetchClientPortalData";
import { Loader2, FolderOpen, ListTodo, FileText, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const ClientDashboardPage = () => {
  const { data: userData } = useUser();
  const clientId = userData?.user?.clientId ?? null;

  const { data: projectsData, isLoading: projectsLoading, error: projectsError } = useFetchClientProjects(clientId);
  const { data: tasksData, isLoading: tasksLoading, error: tasksError } = useFetchClientTasks(clientId);
  const { data: invoicesData, isLoading: invoicesLoading, error: invoicesError } = useFetchClientInvoices(clientId);

  useEffect(() => {
    document.title = "Client Portal - Flowlio";
  }, []);

  if (!clientId) {
    return (
      <Box className="flex min-h-[50vh] items-center justify-center">
        <Card className="max-w-md border-amber-200 bg-amber-50/50">
          <CardContent className="pt-6">
            <Flex className="items-center gap-3 text-amber-800">
              <AlertCircle className="h-10 w-10 shrink-0" />
              <Box>
                <p className="font-medium">Unable to load your data</p>
                <p className="text-sm text-amber-700">
                  Your client account is not fully set up. Please contact your administrator.
                </p>
              </Box>
            </Flex>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const projects = projectsData?.data ?? [];
  const tasks = tasksData?.data ?? [];
  const invoices = invoicesData?.data ?? [];

  return (
    <Box className="mx-auto max-w-5xl space-y-6">
      <Box>
        <h1 className="text-2xl font-semibold text-slate-800">Client Portal</h1>
        <p className="text-slate-600">View your projects, tasks, and invoices.</p>
      </Box>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="projects" className="gap-2">
            <FolderOpen className="h-4 w-4" />
            Project Management
          </TabsTrigger>
          <TabsTrigger value="tasks" className="gap-2">
            <ListTodo className="h-4 w-4" />
            Task Management
          </TabsTrigger>
          <TabsTrigger value="invoices" className="gap-2">
            <FileText className="h-4 w-4" />
            Invoices
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {projectsLoading ? (
                <Box className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                </Box>
              ) : projectsError ? (
                <p className="py-4 text-center text-sm text-red-600">Failed to load projects.</p>
              ) : projects.length === 0 ? (
                <p className="py-8 text-center text-slate-500">No projects yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Dates</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.projectName}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{p.status}</Badge>
                        </TableCell>
                        <TableCell>{p.progress ?? 0}%</TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {p.startDate
                            ? format(new Date(p.startDate), "MMM d, yyyy")
                            : "—"}{" "}
                          –{" "}
                          {p.endDate
                            ? format(new Date(p.endDate), "MMM d, yyyy")
                            : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              {tasksLoading ? (
                <Box className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                </Box>
              ) : tasksError ? (
                <p className="py-4 text-center text-sm text-red-600">Failed to load tasks.</p>
              ) : tasks.length === 0 ? (
                <p className="py-8 text-center text-slate-500">No tasks yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium">{t.title}</TableCell>
                        <TableCell className="text-slate-600">{t.projectName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{t.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {t.endDate ? format(new Date(t.endDate), "MMM d, yyyy") : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              {invoicesLoading ? (
                <Box className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                </Box>
              ) : invoicesError ? (
                <p className="py-4 text-center text-sm text-red-600">Failed to load invoices.</p>
              ) : invoices.length === 0 ? (
                <p className="py-8 text-center text-slate-500">No invoices yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((inv) => (
                      <TableRow key={inv.id}>
                        <TableCell className="font-medium">{inv.invoiceNumber}</TableCell>
                        <TableCell>{inv.amount}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{inv.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {inv.createdAt ? format(new Date(inv.createdAt), "MMM d, yyyy") : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Box>
  );
};

export default ClientDashboardPage;
