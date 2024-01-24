import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

import { AppLinkParams } from "ic-core-js";
import { useCurrentProvider } from "ic-react";

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

        router.replace("/home/profile");
      } else {
        console.warn("Invalid App Link Params");
      }
    }

    onLoad();
  }, []);

  return (
    <View>
      <Text>Success page</Text>
      <Link replace href="/home/feed">
        <Text>Go Home</Text>
      </Link>
    </View>
  );
};

export default SuccessPage;
