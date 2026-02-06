import { Cache } from "./Cache.js";
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
    get cache() {
        return this._cache ?? (this._cache = new Cache(this._msToLive ?? 0));
    }
    destroy() {
        this._cache?.destroy();
        delete this._cache;
    }
}
