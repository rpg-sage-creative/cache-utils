import { EphemeralMap } from "./EphemeralMap.js";
/** Set of all ClassCache objects. */
const _cacheSet = new WeakSet;
/**
 * A simple Cache mechanism.
 * Includes synchronous get an asynchronous fetch.
 * Allows for data to be cached using EphemeralMap.
 */
export class Cache {
    //#region instance
    /** The cache */
    _cache;
    /** The msToLive for EphemeralMap */
    _msToLive;
    constructor(msToLive) {
        this._msToLive = msToLive;
        _cacheSet.add(this);
    }
    /**
     * Removes all values from this cache instance.
     * Returns true if keys were removed, false otherwise.
     */
    clear() {
        const cache = this._cache;
        const size = cache?.size ?? 0;
        if (size > 0) {
            cache.clear();
            return true;
        }
        return false;
    }
    /**
     * Removes a single value from this cache instance.
     * Returns true if the key was removed, false otherwise.
     */
    delete(key) {
        return this._cache?.delete(key) ?? false;
    }
    /**
     * Clears this cache's values, deletes the cache map, and removes the instance from the set of all caches.
    */
    destroy() {
        _cacheSet.delete(this);
        this._cache?.clear();
        delete this._cache;
    }
    /**
     * Returns the value for the key.
     * If it hasn't been cached yet, undefined is returned instead.
     */
    get(key) {
        const map = this.getOrCreateCache();
        if (!map.has(key)) {
            return undefined;
        }
        return map.get(key);
    }
    /**
     * Returns the value for the key.
     * If it hasn't been cached yet, the function is called to cache and return the value.
     * Asynchronous version of get.
     */
    async getOrFetch(key, fn) {
        const map = this.getOrCreateCache();
        if (!map.has(key)) {
            map.set(key, await fn());
        }
        return map.get(key);
    }
    /**
     * Returns the value for the key.
     * If it hasn't been cached yet, the function is called to cache and return the value.
     */
    getOrSet(key, fn) {
        const map = this.getOrCreateCache();
        if (!map.has(key)) {
            map.set(key, fn());
        }
        return map.get(key);
    }
    /** Gets the internal cache map, creating it if needed. */
    getOrCreateCache() {
        if (!this._cache) {
            if (this._msToLive) {
                this._cache = new EphemeralMap(this._msToLive);
            }
            else {
                this._cache = new Map();
            }
        }
        return this._cache;
    }
    //#endregion
    //#region static
    /** Clears all the caches for all the ClassCache objects. */
    static clear() {
        Set.prototype.forEach.call(_cacheSet, (cache) => cache?.clear());
    }
}
