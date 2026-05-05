import { BareCompatibleClient, BareResponse, ProxyTransport, RawHeaders, BareRequestInit } from "@mercuryworkshop/proxy-transports";
import { type URLMeta } from "../shared/rewriters/url";
import { ScramjetHeaders } from "../shared/headers";
import { ScramjetContext } from "../shared";
import DomHandler from "domhandler";
export interface ScramjetFetchRequest {
    rawUrl: URL;
    destination: RequestDestination;
    mode: RequestMode;
    referrer: string;
    method: string;
    body: BodyType | null;
    cache: RequestCache;
    initialHeaders: ScramjetHeaders;
    rawClientUrl?: URL;
}
export interface ScramjetFetchParsed {
    url: URL;
    clientUrl?: URL;
    meta: URLMeta;
    scriptType: "module" | "regular";
}
export interface ScramjetFetchResponse {
    body: BodyType;
    headers: ScramjetHeaders;
    status: number;
    statusText: string;
}
export type FetchHandlerInit = {
    transport: ProxyTransport;
    context: ScramjetContext;
    crossOriginIsolated?: boolean;
    sendSetCookie: (url: URL, cookie: string) => Promise<void>;
    fetchDataUrl(dataUrl: string): Promise<BareResponse>;
    fetchBlobUrl(blobUrl: string): Promise<BareResponse>;
};
export declare class ScramjetFetchHandler extends EventTarget {
    client: BareCompatibleClient;
    crossOriginIsolated: boolean;
    context: ScramjetContext;
    fetchDataUrl: (dataUrl: string) => Promise<Response>;
    fetchBlobUrl: (blobUrl: string) => Promise<Response>;
    sendSetCookie: (url: URL, cookie: string) => Promise<void>;
    constructor(init: FetchHandlerInit);
    handleFetch(request: ScramjetFetchRequest): Promise<ScramjetFetchResponse>;
}
export declare function parseRequest(request: ScramjetFetchRequest, handler: ScramjetFetchHandler): ScramjetFetchParsed;
export declare function rewriteHeaders(handler: ScramjetFetchHandler, request: ScramjetFetchRequest, parsed: ScramjetFetchParsed, rawHeaders: RawHeaders): Promise<ScramjetHeaders>;
type BodyType = string | ArrayBuffer | Blob | ReadableStream<any>;
export declare class ScramjetHTMLPreRewriteEvent extends Event {
    handler: DomHandler;
    context: ScramjetFetchRequest;
    parsed: ScramjetFetchParsed;
    constructor(handler: DomHandler, context: ScramjetFetchRequest, parsed: ScramjetFetchParsed);
}
export declare class ScramjetHTMLPostRewriteEvent extends Event {
    handler: DomHandler;
    context: ScramjetFetchRequest;
    parsed: ScramjetFetchParsed;
    constructor(handler: DomHandler, context: ScramjetFetchRequest, parsed: ScramjetFetchParsed);
}
export declare class ScramjetResponseEvent extends Event {
    context: ScramjetFetchRequest;
    parsed: ScramjetFetchParsed;
    response: ScramjetFetchResponse;
    _response?: ScramjetFetchResponse | Promise<ScramjetFetchResponse>;
    constructor(context: ScramjetFetchRequest, parsed: ScramjetFetchParsed, response: ScramjetFetchResponse);
    respondWith(response: ScramjetFetchResponse | Promise<ScramjetFetchResponse>): void;
}
export declare class ScramjetRequestEvent extends Event {
    context: ScramjetFetchRequest;
    url: URL;
    parsed: ScramjetFetchParsed;
    init: BareRequestInit;
    client: BareCompatibleClient;
    _response?: BareResponse | Promise<BareResponse> | Response | Promise<Response>;
    constructor(context: ScramjetFetchRequest, url: URL, parsed: ScramjetFetchParsed, init: BareRequestInit, client: BareCompatibleClient);
    respondWith(response: BareResponse | Promise<BareResponse>): void;
}
export {};
