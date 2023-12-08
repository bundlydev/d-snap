import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";

import { Client } from "./client";

export type IcpContextType = {
  client: Client;
};

export type IcpContextProviderType = {
  children: ReactNode;
  client: Client;
};

export const IcpContext = createContext({} as IcpContextType);

export const IcpContextProvider = ({
  children,
  client,
}: IcpContextProviderType) => {
  const [auth, setAuth] = useState<AuthClient | undefined>(undefined);

  useEffect(() => {
    initAuth();
  }, []);

  async function initAuth() {
    const client = await AuthClient.create();
    setAuth(client);
  }

  return auth ? (
    <IcpContext.Provider
      value={{
        client,
      }}
    >
      {children}
    </IcpContext.Provider>
  ) : (
    <div>Loading</div>
  );
};
