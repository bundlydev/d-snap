import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

import { AppLinkParams } from "@bundly/ares-core";
import { useCurrentProvider } from "@bundly/ares-react";

const SuccessPage = () => {
  const provider = useCurrentProvider();

  const params = useLocalSearchParams<AppLinkParams>();

  useEffect(() => {
    async function onLoad() {
      if (!provider) {
        throw new Error("Provider not found");
      }

      if (!provider.onAppLinkOpened) {
        throw new Error("Provider does not support App Links");
      }

      const { delegation, publicKey } = params;

      if (delegation && publicKey) {
        await provider.onAppLinkOpened({ delegation, publicKey });

        router.replace("/home/profile" as any);
      } else {
        console.warn("Invalid App Link Params");
      }
    }

    onLoad();
  }, []);

  return (
    <View>
      <Text>Success page</Text>
      <Link replace href={"/home/feed" as any}>
        <Text>Go Home</Text>
      </Link>
    </View>
  );
};

export default SuccessPage;
