import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Text, TextBase, View } from "react-native";

import { useAuth } from "icp-connect-react/hooks";

import { AppLinkParams } from "@bundly/ic-core-js";

const SuccessPage = () => {
  const { onAppLinkOpened } = useAuth();

  const params = useLocalSearchParams<AppLinkParams>();

  useEffect(() => {
    async function onLoad() {
      const { delegation, publicKey } = params;

      if (delegation && publicKey) {
        await onAppLinkOpened({ delegation, publicKey });

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
