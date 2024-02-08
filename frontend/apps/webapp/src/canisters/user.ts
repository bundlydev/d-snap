import { ActorSubclass } from "@dfinity/agent";

import { Canister } from "@bundly/ic-core-js";

import { idlFactory } from "@app/declarations/user";
import { _SERVICE } from "@app/declarations/user/user.did";

export type UserActor = ActorSubclass<_SERVICE>;

export const user: Canister = {
  idlFactory,
  configuration: {
    canisterId: process.env.NEXT_PUBLIC_USER_CANISTER_ID!,
  },
};
