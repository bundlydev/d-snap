import { ActorSubclass } from "@dfinity/agent";

import { Canister } from "ic-core-js";

// @ts-ignore
import { idlFactory } from "../declarations/user/user.did.js";
import { _SERVICE } from "../declarations/user/user.did.js";

export type UserActor = ActorSubclass<_SERVICE>;

export const user: Canister = {
  idlFactory,
  configuration: {
    canisterId: process.env.USER_CANISTER_ID!,
  },
};
