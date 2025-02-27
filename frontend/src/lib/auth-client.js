import { createAuthClient } from "better-auth/react";
import { anonymousClient, phoneNumberClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [anonymousClient(), phoneNumberClient()],
});

export const { signUp, signIn, signOut, useSession } = authClient;
