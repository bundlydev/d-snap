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

  if (options.isPrivate && !isAuthenticated) {
    router.push("/login");
    return;
  }

  if (router.pathname === "/login" && isAuthenticated) {
    if (profile) {
      router.push("/feed");
    } else {
      console.log("no profile");
      router.push("/profile");
    }
    return;
  }

  if (router.pathname !== "/profile" && isAuthenticated && !profile) {
    router.push("/profile");

    return;
  }
}
