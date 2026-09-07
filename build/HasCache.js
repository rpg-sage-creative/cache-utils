import { Cache } from "./Cache.js";
/**
 * An abstract class that includes a built in Cache object.
 */
export class HasCache {
    _cache;
    _msToLive;
    constructor(msToLiveOrCache) {
        if (typeof (msToLiveOrCache) === "number") {
            this._msToLive = msToLiveOrCache;
        }
        else if (msToLiveOrCache instanceof Cache) {
            this._cache = msToLiveOrCache;
        }
    }
    /** Provides a caching mechanism for all child classes. */
    get cache() {
        return this._cache ?? (this._cache = new Cache(this._msToLive ?? 0));
    }
    /** Destroy's this class' cache. */
    destroy() {
        this._cache?.destroy();
        delete this._cache;
    }
}
