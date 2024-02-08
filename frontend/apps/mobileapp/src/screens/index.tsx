import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { AuthButton } from "../components/auth-button";

const IndexPage = () => {
  return (
    <View style={styles.container}>
      <Text className="text-lg my-4">DSnap, click on Login to continue.</Text>
      <AuthButton />
      <StatusBar style="auto" />
      {/* <Link replace href="/success">
        <Text>Success</Text>
      </Link>
      <Link replace href="/home/profile">
        <Text>Profile</Text>
      </Link> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default IndexPage;
