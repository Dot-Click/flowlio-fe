import { Stack } from "@/components/ui/stack";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { axios } from "@/configs/axios.config";
import { toast } from "sonner";
import { format } from "date-fns";
import { Center } from "@/components/ui/center";
import { Loader2, X } from "lucide-react";

type DemoOrg = {
  id: string;
  name: string;
  slug: string;
  status: string;
  subscriptionStatus: string;
  trialEndsAt: string | null;
  createdAt: string;
  updatedAt: string;
  email: string | null;
  userName: string | null;
  userRole: string | null;
  userId: string | null;
  demoRole: string | null;
  demoCreatedAt: string | null;
};

const SuperAdminDemoAccountsPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [trialDays, setTrialDays] = useState(14);
  const [role, setRole] = useState("viewer");
  const [loading, setLoading] = useState(false);
  const [demos, setDemos] = useState<DemoOrg[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loadingActions, setLoadingActions] = useState<
    Record<string, "toggle" | "delete" | null>
  >({});

  const fetchDemos = async () => {
    try {
      const res = await axios.get("/superadmin/demo-accounts");
      setDemos(res.data.data || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load demo accounts");
    }
  };

  useEffect(() => {
    fetchDemos();
  }, []);

  const handleCreate = async () => {
    if (!email || !name || !password) {
      toast.error("Name, Email, and Password are required");
      return;
    }

    // Set loading immediately
    setLoading(true);

    // Trigger shutter animation to close form
    setIsAnimating(true);
    setTimeout(() => {
      setShowForm(false);
      setIsAnimating(false);
    }, 300); // Wait for shutter animation to complete

    try {
      const res = await axios.post("/superadmin/demo-accounts", {
        email,
        name,
        password,
        trialDays,
        role,
      });
      toast.success("Demo account created successfully");
      // Display credentials for the super admin
      const credentials = `Email: ${res.data.data.email}\nPassword: ${res.data.data.password}`;
      navigator.clipboard.writeText(credentials).catch(() => {});
      toast.info(
        `Demo account created! Credentials copied to clipboard.\nEmail: ${res.data.data.email}\nPassword: ${res.data.data.password}`,
        { duration: 10000 }
      );
      setEmail("");
      setName("");
      setPassword("");
      setTrialDays(14);
      setRole("viewer");
      await fetchDemos();
      // Hide loading after success
      setLoading(false);
    } catch (e: any) {
      toast.error(
        e?.response?.data?.message || "Failed to create demo account"
      );
      // Show form again on error and stop loading
      setShowForm(true);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setLoading(false);
    setShowForm(false);
    setIsAnimating(false);
    // Reset form fields when canceling
    setEmail("");
    setName("");
    setPassword("");
    setTrialDays(14);
    setRole("viewer");
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleToggleStatus = async (
    organizationId: string,
    currentStatus: string
  ) => {
    try {
      setLoadingActions((prev) => ({ ...prev, [organizationId]: "toggle" }));
      await axios.post(
        `/superadmin/demo-accounts/${organizationId}/deactivate`
      );
      const isCurrentlySuspended =
        currentStatus === "suspended" || currentStatus === "inactive";
      const action = isCurrentlySuspended ? "reactivated" : "deactivated";
      toast.success(`Demo account ${action}`);
      await fetchDemos();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Failed to toggle status");
    } finally {
      setLoadingActions((prev) => {
        const updated = { ...prev };
        delete updated[organizationId];
        return updated;
      });
    }
  };

  const handleDelete = async (organizationId: string) => {
    if (!confirm("Delete this demo organization? This cannot be undone."))
      return;
    try {
      setLoadingActions((prev) => ({ ...prev, [organizationId]: "delete" }));
      await axios.delete(`/superadmin/organizations/${organizationId}`);
      toast.success("Demo organization deleted");
      await fetchDemos();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Failed to delete");
    } finally {
      setLoadingActions((prev) => {
        const updated = { ...prev };
        delete updated[organizationId];
        return updated;
      });
    }
  };

  return (
    <Stack className="pt-5 gap-3 px-2">
      <Box className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 overflow-hidden">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Create Demo Account
            </h2>
            <p className="text-sm text-gray-600">
              Create a new demo account with temporary access credentials
            </p>
          </div>
          {!showForm && (
            <Button
              onClick={handleShowForm}
              className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-6 cursor-pointer"
            >
              Create Demo Account
            </Button>
          )}
        </div>

        {/* Form with shutter animation */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            showForm
              ? "max-h-[2000px] opacity-100 overflow-visible"
              : "max-h-0 opacity-0 overflow-hidden"
          } ${isAnimating ? "transform scale-y-0 origin-top" : ""}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Organization Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter organization name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                The name of the demo organization
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Login email for the demo account
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Login password for the demo account
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="trialDays"
                className="text-sm font-medium text-gray-700"
              >
                Trial Duration (Days)
              </Label>
              <Input
                id="trialDays"
                type="number"
                min={1}
                max={365}
                placeholder="14"
                value={trialDays}
                onChange={(e) => setTrialDays(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Number of days the demo account will be active (default: 14)
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="role"
                className="text-sm font-medium text-gray-700"
              >
                User Role
              </Label>
              <Select value={role} onValueChange={(value) => setRole(value)}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Permission level for the demo account
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button
              onClick={handleCreate}
              disabled={loading || !name || !email || !password || isAnimating}
              className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-6 cursor-pointer"
            >
              {loading || isAnimating ? "Creating..." : "Create Demo Account"}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              disabled={loading || isAnimating}
              className="border-gray-300 hover:bg-gray-50 h-10 px-6 cursor-pointer"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>

        {/* Loading section below form - shows when form is hidden and loading */}
        {!showForm && loading && (
          <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <Box className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border-2 border-blue-200 shadow-lg">
              <Center className="flex-col gap-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Creating Demo Account...
                  </h3>
                  <p className="text-sm text-gray-600">
                    Please wait while we set up your demo account
                  </p>
                </div>
              </Center>
            </Box>
          </div>
        )}
      </Box>

      <Box className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Demo Accounts
        </h2>
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm ">
          <Table className="w-full ">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trial Ends</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demos.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell>{d.userName || "-"}</TableCell>
                  <TableCell>{d.email || "-"}</TableCell>
                  <TableCell className="capitalize">
                    {d.demoRole || d.userRole || "-"}
                  </TableCell>
                  <TableCell className="capitalize">{d.status}</TableCell>
                  <TableCell>
                    {d.trialEndsAt
                      ? format(new Date(d.trialEndsAt), "PPp")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {d.demoCreatedAt
                      ? format(new Date(d.demoCreatedAt), "PP")
                      : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Center className="gap-2">
                      <Button
                        variant="ghost"
                        className={`cursor-pointer border ${
                          d.status === "suspended" || d.status === "inactive"
                            ? "hover:bg-green-50 bg-green-50 text-green-700"
                            : "hover:bg-yellow-50 bg-yellow-50 text-yellow-700"
                        }`}
                        onClick={() => handleToggleStatus(d.id, d.status)}
                        disabled={loadingActions[d.id] !== undefined}
                      >
                        {loadingActions[d.id] === "toggle" ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            {d.status === "suspended" || d.status === "inactive"
                              ? "Reactivating..."
                              : "Deactivating..."}
                          </>
                        ) : (
                          <>
                            {d.status === "suspended" || d.status === "inactive"
                              ? "Reactivate"
                              : "Deactivate"}
                          </>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        className="hover:bg-red-50 cursor-pointer border bg-red-50 text-red-700"
                        onClick={() => handleDelete(d.id)}
                        disabled={loadingActions[d.id] !== undefined}
                      >
                        {loadingActions[d.id] === "delete" ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>Delete</>
                        )}
                      </Button>
                    </Center>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Box>
    </Stack>
  );
};

export default SuperAdminDemoAccountsPage;
