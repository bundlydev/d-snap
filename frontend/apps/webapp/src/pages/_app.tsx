import { AppProps } from "next/app";
import { useEffect, useState } from "react";

import { IcpConnectContextProvider } from "icp-connect-react/context";

import { AppLoader } from "@/components/app-loader";
import { AuthContextProvider } from "@/lib/auth/auth-context";
import { Client } from "@bundly/ic-core-js/client";
import { InternetIdentity } from "@bundly/ic-core-js/identity-providers";

import "../app/globals.css";
import { Canisters } from "../canisters";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<Client<Canisters> | undefined>();

  useEffect(() => {
    initClient();
  }, []);

  function initClient() {
    const internetIdentity = new InternetIdentity({
      providerUrl: process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL,
    });

    const client = Client.create<Canisters>({
      host: process.env.NEXT_PUBLIC_IC_HOST!,
      canisters: Canisters,
      providers: {
        "internet-identity": internetIdentity,
      },
    });

    setClient(client);
  }

  return client ? (
    // @ts-ignore
    <IcpConnectContextProvider client={client}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </IcpConnectContextProvider>
  ) : (
    <AppLoader />
  );
}
