import { DomHandler } from "domhandler";
import { URLMeta } from "./url";
import { ScramjetContext } from "../../shared";
export declare function rewriteHtml(html: string, context: ScramjetContext, meta: URLMeta, fromTop?: boolean, preRewrite?: (handler: DomHandler) => void, postRewrite?: (handler: DomHandler) => void): string;
export declare function unrewriteHtml(html: string): string;
export declare function rewriteSrcset(srcset: string, context: ScramjetContext, meta: URLMeta): string;
