import { useAuth, useClient, useProviders } from "hooks";
import React, { CSSProperties } from "react";

import { IdentityProvider } from "ic-core-js";

import { useCurrentProvider } from "../hooks/useCurrentProvider";

export type AuthButtonProps = {
  loginButtonStyle?: CSSProperties | undefined;
  logoutButtonStyle?: CSSProperties | undefined;
};

export function AuthButton(props: AuthButtonProps) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <LogoutButton style={props.logoutButtonStyle} />
  ) : (
    <LoginButton style={props.loginButtonStyle} />
  );
}

export type LoginButtonProps = {
  children?: React.ReactNode;
  style?: CSSProperties;
};

function LoginButton(props: LoginButtonProps) {
  const client = useClient();
  const providers = useProviders();

  async function login() {
    try {
      const provider = selectProvider(providers);

      await client.setCurrentProvider(provider.name);

      await provider.connect();
    } catch (error) {
      await client.removeCurrentProvider();
    }
  }

  return (
    <button onClick={() => login()} style={props.style || styles.button}>
      {props.children || "Login"}
    </button>
  );
}

export type LogoutButtonProps = {
  children?: React.ReactNode;
  style?: CSSProperties;
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
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <button onClick={() => logout()} style={props.style || styles.button}>
      {props.children || "Logout"}
    </button>
  );
}

function selectProvider(providers: IdentityProvider[]): IdentityProvider {
  if (providers.length === 0) {
    throw new Error("No providers available");
  }

  if (providers.length === 1) {
    return providers[0];
  }

  // TODO: Display view to select provider
  return providers[0];
}

const styles = {
  button: {
    "background-color": "white",
    color: "black",
    padding: "8px 16px",
    border: "1px solid #ccc",
    "border-radius": "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    "box-shadow": "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};
