import { Cache } from "./Cache.js";
/**
 * An abstract class that includes a built in Cache object.
 */
export declare abstract class HasCache {
    private _cache?;
    private _msToLive?;
    protected constructor();
    protected constructor(msToLive: number);
    protected constructor(cache: Cache);
    /** Provides a caching mechanism for all child classes. */
    protected get cache(): Cache;
    /** Destroy's this class' cache. */
    destroy(): void;
}
