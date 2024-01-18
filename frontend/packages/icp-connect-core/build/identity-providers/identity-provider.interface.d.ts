import { Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
export type AppLinkParams = {
    publicKey: string;
    delegation: string;
};
export interface IdentityProvider {
    type: "web" | "native";
    init: () => Promise<void>;
    getName: () => string;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    isAuthenticated: () => boolean;
    getIdentity: () => Identity;
    getPrincipal: () => Principal;
    onAppLinkOpened?: (params: AppLinkParams) => Promise<void>;
}
