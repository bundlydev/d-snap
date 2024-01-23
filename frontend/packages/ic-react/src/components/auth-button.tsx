import { IcpConnectContext } from "context";
import { useClient } from "hooks";
import React, { useContext } from "react";

import { useCurrentProvider } from "../hooks/useCurrentProvider";

export type AuthButtonProps = {};

export function AuthButton(props: AuthButtonProps) {
  const { isAuthenticated, onConnect, onDisconnect } = useContext(IcpConnectContext);

  return isAuthenticated ? (
    <LogoutButton onDisconnect={onDisconnect} />
  ) : (
    <LoginButton onConnect={onConnect} />
  );
}

export type LoginButtonProps = {
  onConnect: () => void;
  children?: React.ReactNode;
};

function LoginButton(props: LoginButtonProps) {
  const client = useClient();
  // TODO: implement this instead of client
  // const provider = useCurrentProvider();

  async function login() {
    try {
      await client.setCurrentProvider("internet-identity");
      const provider = client.getCurrentProvider();

      if (!provider) {
        throw new Error("No identity provider selected");
      }

      await provider.connect();
      props.onConnect();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <button onClick={() => login()} style={styles.button}>
      {props.children || "Login"}
    </button>
  );
}

export type LogoutButtonProps = {
  onDisconnect: () => void;
  children?: React.ReactNode;
};

function LogoutButton(props: LogoutButtonProps) {
  const client = useClient();
  const provider = useCurrentProvider();

  async function logout() {
    if (!provider) {
      throw new Error("No identity provider selected");
    }

    try {
      await provider.disconnect();
      await client.removeCurrentProvider();
      props.onDisconnect();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <button onClick={() => logout()} style={styles.button}>
      {props.children || "Logout"}
    </button>
  );
}

const styles = {
  button: {
    backgroundColor: "white",
    color: "black",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    outline: "none",
    transition: "background-color 0.3s ease-in-out",
    // Define el estilo para el hover
    ":hover": {
      backgroundColor: "lightgray",
    },
  },
};
