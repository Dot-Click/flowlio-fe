import { createAuthClient } from "better-auth/client";
import { emailOTPClient, twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  plugins: [emailOTPClient(), twoFactorClient()],
});

// Export the email OTP methods for easy use
export const emailOTP = {
  sendVerificationOTP: authClient.emailOtp.sendVerificationOtp,
  verifyOTP: authClient.emailOtp.verifyEmail,
  signInWithOTP: authClient.signIn.emailOtp,
};

// Debug: Log available methods
console.log("🔍 Available emailOtp methods:", Object.keys(authClient.emailOtp));
console.log("🔍 Available authClient methods:", Object.keys(authClient));

// Export the two factor methods for easy use
export const twoFactor = {
  enable: authClient.twoFactor.enable,
  disable: authClient.twoFactor.disable,
  verifyTOTP: authClient.twoFactor.verifyTotp,
};
