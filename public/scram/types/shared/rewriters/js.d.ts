import { ScramjetContext } from "../../shared";
import { URLMeta } from "./url";
type RewriterResult = {
    js: string | Uint8Array;
    map: Uint8Array | null;
    tag: string;
    errors: string[];
};
export declare function rewriteJsInner(js: string | Uint8Array, url: string | null, context: ScramjetContext, meta: URLMeta, module?: boolean): RewriterResult;
export declare function rewriteJs(js: string | Uint8Array, url: string | null, context: ScramjetContext, meta: URLMeta, module?: boolean): string | Uint8Array;
export {};
