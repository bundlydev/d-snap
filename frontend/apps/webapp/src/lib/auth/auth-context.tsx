import { ReactNode, createContext, useEffect, useState } from "react";
import z from "zod";

import { useActor, useAuth } from "ic-react";

import { Actors } from "../../canisters";

export type AuthUserProfile = {
  bio: string;
  username: string;
  picture: {
    url: string;
  };
  createdAt: bigint;
};

export type AuthContextType = {
  profile?: AuthUserProfile;
};

export type AuthContextProviderType = {
  children: ReactNode;
};

const ZUserProfileSchema = z.object({
  bio: z.string(),
  username: z.string(),
  picture: z.object({
    url: z.string(),
  }),
  createdAt: z.bigint(),
});

const ZResponseSchema = z
  .object({
    ok: ZUserProfileSchema.optional(),
    err: z.object({}).optional(),
  })
  .refine((data) => (data.ok !== undefined) !== (data.err !== undefined), {
    message: 'Either "ok" or "err" should be present, but not both.',
  });

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const { isAuthenticated } = useAuth();

  const user = useActor<Actors>("user");

  const [profile, setProfile] = useState<AuthUserProfile | undefined>();

  useEffect(() => {
    async function loadProfile() {
      if (isAuthenticated) {
        try {
          const response = await user.getProfile();

          const responseParse = ZResponseSchema.safeParse(response);

          if (!responseParse.success) throw new Error(`Invalid response schema: ${responseParse.error}`);
          if (responseParse.success && "err" in responseParse.data) {
            // No profile found
            return;
          }

          const profile: AuthUserProfile = {
            username: responseParse.data?.ok?.username || "",
            bio: responseParse.data?.ok?.bio || "",
            picture: responseParse.data?.ok?.picture || { url: "" },
            createdAt: responseParse.data?.ok?.createdAt || BigInt(0),
          };

          setProfile(profile);
        } catch (error) {
          throw error;
        }
      } else {
        setProfile(undefined);
      }
    }

    loadProfile();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        profile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
