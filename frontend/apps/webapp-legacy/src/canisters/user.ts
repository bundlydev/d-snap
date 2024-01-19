import { ActorSubclass } from "@dfinity/agent";

import { Canister } from "ic-core-js";

// @ts-ignore
import { idlFactory } from "@app/declarations/user/user.did.js";
import { _SERVICE } from "@app/declarations/user/user.did.js";

export type UserActor = ActorSubclass<_SERVICE>;

export const user: Canister = {
  idlFactory,
  configuration: {
    canisterId: process.env.NEXT_PUBLIC_USER_CANISTER_ID!,
  },
};
