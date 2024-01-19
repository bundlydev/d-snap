// @ts-ignore
import { IC_HOST, INTERNET_IDENTITY_URL } from "@env";
import { ExpoRoot } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import { Client } from "@bundly/ic-core-js/client";
import { InternetIdentityReactNative } from "@bundly/ic-react-native";
import { IcpConnectContextProvider } from "@bundly/ic-react/context";

import { Canisters } from "./canisters";
import { AuthContextProvider } from "./lib/auth/auth-context";

export default function App() {
  const [client, setClient] = useState<Client<Canisters> | undefined>();

  useEffect(() => {
    initClient();
  }, []);

  function initClient() {
    const internetIdentity = new InternetIdentityReactNative({
      providerUrl: INTERNET_IDENTITY_URL,
      appLink: "exp://127.0.0.1:8081/--/success", //TODO: Get this dynamically
    });

    const client = Client.create<Canisters>({
      host: IC_HOST,
      canisters: Canisters,
      providers: {
        "internet-identity": internetIdentity,
      },
    });

    setClient(client);
  }

  const ctx = require.context("../app");

  return client ? (
    // @ts-ignore
    <IcpConnectContextProvider client={client}>
      <AuthContextProvider>
        <ExpoRoot context={ctx} />
      </AuthContextProvider>
    </IcpConnectContextProvider>
  ) : (
    <Text>Loading...</Text>
  );
}
