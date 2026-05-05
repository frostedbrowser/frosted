import { ScramjetConfig, ScramjetFlags, ScramjetVersionInfo } from "../types";
import DomHandler, { Element } from "domhandler";
import { URLMeta } from "./rewriters/url";
import { CookieJar } from "./cookie";
export * from "./cookie";
export * from "./headers";
export * from "./htmlRules";
export * from "./rewriters";
export * from "./security";
export declare function flagEnabled(flag: keyof ScramjetFlags, context: ScramjetContext, url: URL): boolean;
export type ScramjetInterface = {
    codecEncode: (input: string) => string;
    codecDecode: (input: string) => string;
    getInjectScripts(meta: URLMeta, handler: DomHandler, script: (src: string) => Element): Element[];
    getWorkerInjectScripts?(meta: URLMeta, type: "module" | "regular", script: (src: string) => string): string;
};
export type ScramjetContext = {
    config: ScramjetConfig;
    prefix: URL;
    interface: ScramjetInterface;
    cookieJar: CookieJar;
};
export declare const versionInfo: ScramjetVersionInfo;
