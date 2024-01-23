// @ts-ignore
import { IC_HOST, INTERNET_IDENTITY_URL } from "@env";
import { ExpoRoot } from "expo-router";
import React from "react";

import { Client } from "ic-core-js";
import { IcpConnectContextProvider } from "ic-react";
import { InternetIdentityReactNative, ReactNativeStorage } from "ic-react-native";

import { canisters } from "./canisters";
import { AuthContextProvider } from "./lib/auth/auth-context";

export default function App() {
  const client = Client.create({
    agent: {
      host: IC_HOST,
      verifyQuerySignatures: false,
    },
    canisters,
    providers: [
      new InternetIdentityReactNative({
        providerUrl: INTERNET_IDENTITY_URL,
        appLink: "exp://127.0.0.1:8081/--/success", //TODO: Get this dynamically
      }),
    ],
    storage: new ReactNativeStorage(),
  });

  const ctx = require.context("../app");

  return (
    <IcpConnectContextProvider client={client}>
      <AuthContextProvider>
        <ExpoRoot context={ctx} />
      </AuthContextProvider>
    </IcpConnectContextProvider>
  );
}
