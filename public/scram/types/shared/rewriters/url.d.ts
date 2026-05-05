import { ScramjetContext } from "../../shared";
export type URLMeta = {
    origin: URL;
    base: URL;
    topFrameName?: string;
    parentFrameName?: string;
};
export declare function rewriteBlob(url: string, context: ScramjetContext, meta: URLMeta): string;
export declare function unrewriteBlob(url: string, context: ScramjetContext, meta: URLMeta): string;
export declare function rewriteUrl(url: string | URL, context: ScramjetContext, meta: URLMeta): string;
export declare function unrewriteUrl(url: string | URL, context: ScramjetContext): string;
