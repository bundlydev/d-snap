import { Identity } from "@dfinity/agent";
import { ActorMap, CreateClientOptions, IdentityProviders } from "./client.types";
export declare class Client<T extends Record<string, unknown>> {
    private readonly host;
    private readonly _canisters;
    private readonly providers;
    private readonly agent;
    private identity;
    private actors;
    private constructor();
    init(): Promise<void>;
    private fetchRootKey;
    private isLocal;
    replaceIdentity(identity: Identity): Promise<void>;
    getIdentity(): Identity;
    private setActors;
    getActor<K extends keyof T>(name: K): ActorMap<T>[K];
    getProviders(): IdentityProviders;
    static create<T extends Record<string, unknown>>(options: CreateClientOptions<T>): Client<T>;
}
