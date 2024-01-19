import { ActorMethod } from "@dfinity/agent";
import { useContext } from "react";

import { IcpConnectContext, IcpConnectContextType } from "../context";

export const useActor = (name: string): ActorMethod => {
  const { client } = useContext(IcpConnectContext);

  const actor = client.getActor(name);

  if (!actor) throw new Error("This actor doesn't exist");

  return actor;
};
