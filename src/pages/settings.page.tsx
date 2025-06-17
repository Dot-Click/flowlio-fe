import { PasswordSecuritySettings } from "@/components/settings/passwordsecuritysettings";
import { DelectAccountSettings } from "@/components/settings/delectaccountsettings";
import { NotificationSettings } from "@/components/settings/notificationsettings";
import { TwoFactorSettings } from "@/components/settings/twofactorsettings";
import { ProfilePhoto } from "@/components/settings/profilephotosettings";
import { ComponentWrapper } from "@/components/common/componentwrapper";
import { Stack } from "@/components/ui/stack";

export const SettingsPage = () => {
  return (
    <ComponentWrapper className="mt-8 px-10 py-4 max-md:px-6">
      <h1 className="text-xl font-semibold">Settings</h1>

      <Stack className="gap-8">
        <ProfilePhoto />

        <NotificationSettings />
        <TwoFactorSettings />
        <PasswordSecuritySettings />
        <DelectAccountSettings />
      </Stack>
    </ComponentWrapper>
  );
};
