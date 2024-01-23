import { Identity } from "@dfinity/agent";

export type AppLinkParams = {
  publicKey: string;
  delegation: string;
};

export interface IdentityProvider {
  name: string;
  displayName: string;
  logo: string;
  init: () => Promise<void>;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getIdentity: () => Identity;
  // TODO: This is mandatory if type is "native"
  onAppLinkOpened?: (params: AppLinkParams) => Promise<void>;
}