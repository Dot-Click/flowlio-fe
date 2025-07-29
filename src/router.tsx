import PasswordresetsucessPage from "./pages/passwordresetsuccess.page";
import { AuthenticationLayout } from "./layouts/authentication.layout";
import { TaskManagementPage } from "./pages/taskmanagement.page";
import { DashboardLayout } from "./layouts/dashboard.layout";
import { BrowserRouter, Route, Routes } from "react-router";
import ResetpasswordPage from "./pages/resetpassword.page";
import VerifyEmailPage from "./pages/verifyemail.page";
import VerifyCodePage from "./pages/verifycode.page";
import { AiAssistPage } from "./pages/aiassist.page";
import SettingsPage from "./pages/settings.page";
// import { CommentsPage } from "./pages/comments.page";
import DashboardPage from "./pages/dashboard.page";
import { NotFound } from "./pages/notfound.page";
import SigninPage from "./pages/signin.page";
import { UserLayout } from "./layouts/user.layout";
import HomePage from "./pages/home.page";
import { WorkFlowPage } from "./pages/workflow.page";
import { InsightsPage } from "./pages/insights.page";
import { PricingPage } from "./pages/pricing.page";
import ProjectsPage from "./pages/projects.page";
import CreateProjectPage from "./pages/createproject.page";
import CreateTaskPage from "./pages/createtask.page";
import AddUserMembersPage from "./pages/addusermemebers.page";
import UserManagementPage from "./pages/usermanagement.page";
import CalenderPage from "./pages/calender.page";
import { PaymentLinksPage } from "./pages/paymentlinks.page";
import InvoicePage from "./pages/invoice.page";
import SupportPage from "./pages/support.page";
import { SuperAdminLayout } from "./layouts/superadmin.layout";
import SuperAdminDashboardPage from "./pages/superadmindashboard.page";
import SuperAdminCompaniesPage from "./pages/superadmincompanies.page";
import CompanyViewDetailsPage from "./pages/companyviewdetails.page";
import SuperAdminSubAdminPage from "./pages/superadminsubadmin.page";
import { CreateSubAdmin } from "./components/super admin section/sub admin/createsubadmin";
import { SuperAdminSubscriptionsPage } from "./pages/superadminsubscriptions.page";
import SuperAdminSupportTicketPage from "./pages/superadminsupportticket.page";
import SuperAdminSettingsPage from "./pages/superadminsettings.page";
import { ViewerLayout } from "./layouts/viewer.layout";
import ViewerDashboardPage from "./pages/viewerdashboard.page";
import ViewermyProjectsPage from "./pages/viewermyprojects.page";
import { ViewermyTasksPage } from "./pages/viewermytasks.page";
import ViewerSupportsPage from "./pages/viewersupports.page";
import ViewerSettingsPage from "./pages/viewersettings.page";
import ClientManagementPage from "./pages/clientmanagement.page";
import { CreateClient } from "./components/client management/createclient";
import CheckoutPage from "./pages/checkout.page";
import SignupPage from "./pages/signup.page";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="work-flow" element={<WorkFlowPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>

        <Route element={<AuthenticationLayout />}>
          <Route path="login" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="verify-code" element={<VerifyCodePage />} />
          <Route path="verify-email" element={<VerifyEmailPage />} />
          <Route path="reset-password" element={<ResetpasswordPage />} />
          <Route path="reset-success" element={<PasswordresetsucessPage />} />
        </Route>

        {/* Operator dashboard layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            element={<CreateProjectPage />}
            path="project/create-project/:id"
          />
          <Route
            element={<CreateTaskPage />}
            path="task-management/create-task"
          />
          <Route
            element={<AddUserMembersPage />}
            path="user-management/add-user-members"
          />
          <Route element={<ProjectsPage />} path="project" />
          <Route element={<TaskManagementPage />} path="task-management" />
          <Route element={<UserManagementPage />} path="user-management" />
          <Route element={<CalenderPage />} path="calender" />
          <Route element={<AiAssistPage />} path="ai-assist" />
          {/* <Route element={<CommentsPage />} path="comments" /> */}
          <Route element={<SettingsPage />} path="settings" />
          <Route element={<PaymentLinksPage />} path="payment-links" />
          <Route element={<SupportPage />} path="support" />
          <Route element={<InvoicePage />} path="invoice" />
          <Route element={<ClientManagementPage />} path="client-management" />
          <Route
            element={<CreateClient />}
            path="client-management/create-client"
          />
          <Route index element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* super admin layout */}
        <Route path="/superadmin" element={<SuperAdminLayout />}>
          <Route path="companies" element={<SuperAdminCompaniesPage />} />
          <Route
            path="companies/details/:id"
            element={<CompanyViewDetailsPage />}
          />
          <Route path="sub-admin" element={<SuperAdminSubAdminPage />} />
          <Route
            path="sub-admin/create-sub-admin"
            element={<CreateSubAdmin />}
          />
          <Route
            path="subscriptions"
            element={<SuperAdminSubscriptionsPage />}
          />
          <Route
            path="support-tickets"
            element={<SuperAdminSupportTicketPage />}
          />
          <Route path="settings" element={<SuperAdminSettingsPage />} />
          <Route index element={<SuperAdminDashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* viewer layout */}
        <Route path="/viewer" element={<ViewerLayout />}>
          <Route index element={<ViewerDashboardPage />} />
          <Route path="my-projects" element={<ViewermyProjectsPage />} />
          <Route path="my-tasks" element={<ViewermyTasksPage />} />
          <Route path="viewer-support" element={<ViewerSupportsPage />} />
          <Route path="viewer-settings" element={<ViewerSettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
