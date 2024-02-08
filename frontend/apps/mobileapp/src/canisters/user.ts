import { ActorSubclass } from "@dfinity/agent";

import { Canister } from "@bundly/ic-core-js";

import { idlFactory } from "../declarations/user/user.did";
import { _SERVICE } from "../declarations/user/user.did.js";

export type UserActor = ActorSubclass<_SERVICE>;

export const user: Canister = {
  idlFactory,
  configuration: {
    canisterId: process.env.EXPO_PUBLIC_USER_CANISTER_ID!,
  },
};
