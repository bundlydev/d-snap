"use client";

import { AppProps } from "next/app";
import { useEffect, useState } from "react";

import { Client, InternetIdentity } from "ic-core-js";
import { IcpConnectContextProvider } from "ic-react";

import { AppLoader } from "@app/components/app-loader";
import { AuthContextProvider } from "@app/lib/auth/auth-context";

import "../app/globals.css";
import { Canisters } from "../canisters";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<Client | undefined>();

  useEffect(() => {
    initClient();
  }, []);

  function initClient() {
    const internetIdentity = new InternetIdentity({
      providerUrl: process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL,
    });

    const client = Client.create({
      agent: {
        host: process.env.NEXT_PUBLIC_IC_HOST!,
      },
      canisters: Canisters,
      identityProviders: {
        "internet-identity": internetIdentity,
      },
    });

    setClient(client);
  }

  return client ? (
    <IcpConnectContextProvider client={client}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </IcpConnectContextProvider>
  ) : (
    <AppLoader />
  );
}
