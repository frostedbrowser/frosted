import { URLMeta } from "./rewriters/url";
import { ScramjetContext } from "../shared";
export declare const htmlRules: {
    [key: string]: "*" | string[] | ((...any: any[]) => string | null);
    fn: (value: string, context: ScramjetContext, meta: URLMeta) => string | null;
}[];
