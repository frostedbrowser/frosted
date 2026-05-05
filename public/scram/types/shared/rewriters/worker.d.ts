import { ScramjetContext } from "../../shared";
import { URLMeta } from "./url";
export declare function rewriteWorkers(context: ScramjetContext, js: string | Uint8Array, type: "module" | "regular", url: string, meta: URLMeta): string;
