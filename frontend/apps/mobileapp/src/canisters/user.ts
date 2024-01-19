import { Canister } from "ic-core-js";

// @ts-ignore
import { idlFactory } from "../declarations/user/user.did.js";

export const user: Canister = {
  idlFactory,
  configuration: {
    canisterId: process.env.USER_CANISTER_ID!,
  },
};
