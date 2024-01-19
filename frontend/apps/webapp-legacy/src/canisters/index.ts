import { UserActor, user } from "./user";

export type Actors = {
  user: UserActor;
};

export const Canisters = {
  user,
};

export type Canisters = typeof Canisters;
