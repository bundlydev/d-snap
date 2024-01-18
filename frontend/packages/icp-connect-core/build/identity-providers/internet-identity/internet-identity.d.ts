import { IdentityProvider } from "../identity-provider.interface";
import { InternetIdentityConfig } from "./internet-identity.types";
import { Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
export declare class InternetIdentity implements IdentityProvider {
    readonly type = "web";
    private name;
    private config;
    private client;
    private isAuth;
    private identity;
    private principal;
    constructor(config?: InternetIdentityConfig);
    init(): Promise<void>;
    private setData;
    getName(): string;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    isAuthenticated(): boolean;
    getIdentity(): Identity;
    getPrincipal(): Principal;
}
