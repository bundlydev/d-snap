import { useContext } from "react";

import { Client } from "ic-core-js";

import { IcpConnectContext } from "../context";

export const useClient = (): Client => {
  const { client } = useContext(IcpConnectContext);

  return client;
};
