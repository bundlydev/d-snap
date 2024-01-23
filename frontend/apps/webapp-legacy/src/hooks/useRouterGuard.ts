import { useRouter } from "next/router";
import { useContext } from "react";

import { useAuth } from "ic-react";

import { AuthContext } from "../lib/auth/auth-context";

export type AuthGuardOptions = {
  isPrivate: boolean;
};

export function useAuthGuard(options: AuthGuardOptions) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { profile } = useContext(AuthContext);

  console.log({ isAuthenticated, profile });

  if (isAuthenticated && router.pathname === "/login") {
    router.push("feed");
    return;
  }

  if (options.isPrivate && !isAuthenticated) {
    router.push("login");
    return;
  }

  if (options.isPrivate && !profile) {
    router.push("profile");
  }
}
