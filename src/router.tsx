import PasswordresetsucessPage from "./pages/passwordresetsuccess.page";
import { CompanyManagementPage } from "./pages/companymanagement.page";
import { AuthenticationLayout } from "./layouts/authentication.layout";
import { TaskManagementPage } from "./pages/taskmanagement.page";
import { UserManagementPage } from "./pages/usermanagement.page";
import { DashboardLayout } from "./layouts/dashboard.layout";
import { BrowserRouter, Route, Routes } from "react-router";
import ResetpasswordPage from "./pages/resetpassword.page";
import VerifyEmailPage from "./pages/verifyemail.page";
import VerifyCodePage from "./pages/verifycode.page";
import { AiAssistPage } from "./pages/aiassist.page";
import { SettingsPage } from "./pages/settings.page";
import { CommentsPage } from "./pages/comments.page";
import DashboardPage from "./pages/dashboard.page";
import { IssuesPage } from "./pages/issues.page";
import { MyTaskPage } from "./pages/mytask.page";
import { NotFound } from "./pages/notfound.page";
import SigninPage from "./pages/signin.page";
import InboxPage from "./pages/inbox.page";
import { UserLayout } from "./layouts/user.layout";
import HomePage from "./pages/home.page";
import { WorkFlowPage } from "./pages/workflow.page";
import { InsightsPage } from "./pages/insights.page";
import { PricingPage } from "./pages/pricing.page";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="work-flow" element={<WorkFlowPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="pricing" element={<PricingPage />} />
        </Route>

        <Route element={<AuthenticationLayout />}>
          <Route path="login" element={<SigninPage />} />
          <Route path="verify-code" element={<VerifyCodePage />} />
          <Route path="verify-email" element={<VerifyEmailPage />} />
          <Route path="reset-password" element={<ResetpasswordPage />} />
          <Route path="reset-success" element={<PasswordresetsucessPage />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<UserManagementPage />} path="user-management" />
          <Route element={<TaskManagementPage />} path="task-management" />
          <Route element={<MyTaskPage />} path="task-management/my-task" />
          <Route element={<AiAssistPage />} path="ai-assist" />
          <Route element={<CommentsPage />} path="comments" />
          <Route element={<SettingsPage />} path="settings" />
          <Route element={<MyTaskPage />} path="my-task" />
          <Route element={<IssuesPage />} path="issues" />
          <Route element={<InboxPage />} path="inbox" />
          <Route index element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} />

          <Route
            element={<CompanyManagementPage />}
            path="company-management"
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
