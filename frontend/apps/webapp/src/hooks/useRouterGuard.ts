import { useRouter } from "next/router";

import { useAuth } from "ic-react";

import { useProfile } from "./useProfile";

export type AuthGuardOptions = {
  isPrivate: boolean;
};

export function useAuthGuard(options: AuthGuardOptions) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const profile = useProfile();

  if (options.isPrivate && !isAuthenticated) {
    router.push("/login");
    return;
  }

  if (router.pathname === "/login" && isAuthenticated) {
    if (profile) {
      router.push("/feed");
    } else {
      router.push("/profile");
    }
    return;
  }

  if (router.pathname !== "/profile" && isAuthenticated && !profile) {
    router.push("/profile");

    return;
  }
}
