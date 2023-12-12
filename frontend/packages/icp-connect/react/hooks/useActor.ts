import { CanisterTypes, CanisterTypeKeys } from "../../../../declarations";
import { ActorSubclassType } from "../../core/client";
import { IcpConnectContext } from "../context";
import { useContext } from "react";

export const useActor = <K extends CanisterTypeKeys>(name: K): ActorSubclassType<CanisterTypes, K> => {
  const { client } = useContext(IcpConnectContext);

  const actor = client.getActor(name);

  if (!actor) throw new Error("This actor doesn't exist");

  return actor;
};
