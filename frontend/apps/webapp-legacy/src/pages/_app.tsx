"use client";

import { AppProps } from "next/app";

import { Client, InternetIdentity } from "ic-core-js";
import { IcpConnectContextProvider } from "ic-react";

import { AuthContextProvider } from "@app/lib/auth/auth-context";

import "../app/globals.css";
import { canisters } from "../canisters";

export default function MyApp({ Component, pageProps }: AppProps) {
  const client = Client.create({
    agent: {
      host: process.env.NEXT_PUBLIC_IC_HOST!,
    },
    canisters,
    providers: [
      new InternetIdentity({
        providerUrl: process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL,
      }),
    ],
  });

  return (
    <IcpConnectContextProvider client={client}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </IcpConnectContextProvider>
  );
}
