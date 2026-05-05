import { ScramjetClient } from "./index";
/**
 * Union type for all Scramjet proxified navigation events.
 */
export type ScramjetEvent = NavigateEvent | UrlChangeEvent | ScramjetContextEvent;
/**
 * Type map for all Scramjet navigation events with their corresponding event types.
 */
export type ScramjetEvents = {
    navigate: NavigateEvent;
    urlchange: UrlChangeEvent;
    contextInit: ScramjetContextEvent;
};
/**
 * Navigation event class fired when Scramjet frame navigates to a new proxified URL.
 */
export declare class NavigateEvent extends Event {
    url: string;
    type: string;
    constructor(url: string);
}
/**
 * URL change event class fired when the proxified URL changes in a Scramjet frame.
 */
export declare class UrlChangeEvent extends Event {
    url: string;
    type: string;
    constructor(url: string);
}
/**
 * Event class fired when Scramjet initializes in a frame.
 */
export declare class ScramjetContextEvent extends Event {
    window: Self;
    client: ScramjetClient;
    type: string;
    constructor(window: Self, client: ScramjetClient);
}
