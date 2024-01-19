import { Canister } from "ic-core-js";

// @ts-ignore
import { idlFactory } from "@app/declarations/user/user.did.js";

export const user: Canister = {
  idlFactory,
  configuration: {
    canisterId: process.env.NEXT_PUBLIC_USER_CANISTER_ID!,
  },
};
