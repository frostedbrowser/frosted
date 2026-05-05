type ScramjetFrame = any;
import { BareCompatibleClient, ProxyTransport } from "@mercuryworkshop/proxy-transports";
import { type URLMeta } from "../shared/rewriters/url";
import { ScramjetContext } from "../shared";
import { SingletonBox } from "./singletonbox";
import { ScramjetConfig } from "../types";
export type ScramjetClientInit = {
    context: ScramjetContext;
    transport: ProxyTransport;
    sendSetCookie: (url: URL, cookie: string) => Promise<void>;
    shouldPassthroughWebsocket?: (url: string | URL) => boolean;
    shouldBlockMessageEvent?: (ev: MessageEvent) => boolean;
    hookSubcontext: (self: Self, frame?: HTMLIFrameElement) => ScramjetClient;
};
type NativeStore = {
    store: Record<string, any>;
    call: (target: string, that: any, ...args: any[]) => any;
    construct: (target: string, ...args: any[]) => any;
};
type DescriptorStore = {
    store: Record<string, PropertyDescriptor>;
    get: (target: string, that: any) => any;
    set: (target: string, that: any, value: any) => void;
};
export type AnyFunction = Function;
export type ScramjetModule = {
    enabled: (client: ScramjetClient) => boolean | undefined;
    disabled: (client: ScramjetClient, self: typeof globalThis) => void | undefined;
    order: number | undefined;
    default: (client: ScramjetClient, self: typeof globalThis) => void;
};
export type ProxyCtx = {
    fn: AnyFunction;
    this: any;
    args: any[];
    newTarget: AnyFunction;
    return: (r: any) => void;
    call: () => any;
};
export type Proxy = {
    construct?(ctx: ProxyCtx): any;
    apply?(ctx: ProxyCtx): any;
};
export type TrapCtx<T> = {
    this: any;
    get: () => T;
    set: (v: T) => void;
};
export type Trap<T> = {
    writable?: boolean;
    value?: any;
    enumerable?: boolean;
    configurable?: boolean;
    get?: (ctx: TrapCtx<T>) => T;
    set?: (ctx: TrapCtx<T>, v: T) => void;
};
export declare class ScramjetClient {
    global: typeof globalThis;
    init: ScramjetClientInit;
    locationProxy: any;
    serviceWorker: ServiceWorkerContainer;
    bare: BareCompatibleClient;
    natives: NativeStore;
    descriptors: DescriptorStore;
    wrapfn: (i: any, ...args: any) => any;
    eventcallbacks: Map<any, [
        {
            event: string;
            originalCallback: AnyFunction;
            proxiedCallback: AnyFunction;
        }
    ]>;
    meta: URLMeta;
    box: SingletonBox;
    context: ScramjetContext;
    constructor(global: typeof globalThis, init: ScramjetClientInit);
    get frame(): ScramjetFrame | null;
    get isSubframe(): boolean;
    hook(): void;
    get url(): URL;
    set url(url: URL | string);
    Proxy(name: string | string[], handler: Proxy): void;
    RawProxy(target: any, prop: string, handler: Proxy, debugname?: string): void;
    Trap<T>(name: string | string[], descriptor: Trap<T>): PropertyDescriptor;
    RawTrap<T>(target: any, prop: string, descriptor: Trap<T>): PropertyDescriptor;
    rewriteUrl(url: string | URL): string;
    unrewriteUrl(url: string | URL): string;
    flagEnabled(flag: keyof ScramjetConfig["flags"]): boolean;
    get config(): ScramjetConfig;
}
export {};
