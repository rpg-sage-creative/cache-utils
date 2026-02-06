import type { Awaitable } from "@rsc-utils/type-utils";
/**
 * A simple Cache mechanism.
 * Includes synchronous get an asynchronous fetch.
 * Allows for data to be cached using EphemeralMap.
 */
export declare class Cache {
    /** The cache */
    private _cache?;
    /** The msToLive for EphemeralMap */
    private _msToLive?;
    /**
     * Construct a new ClassCache using a Map.
     */
    constructor();
    /**
     * Construct a new ClassCache using an EphemeralMap.
     */
    constructor(msToLive: number);
    /**
     * Removes all values from this cache instance.
     * Returns true if keys were removed, false otherwise.
     */
    clear(): boolean;
    /**
     * Removes a single value from this cache instance.
     * Returns true if the key was removed, false otherwise.
     */
    delete(key: string): boolean;
    /**
     * Clears this cache's values, deletes the cache map, and removes the instance from the set of all caches.
    */
    destroy(): void;
    /**
     * Returns the value for the key.
     * If it hasn't been cached yet, undefined is returned instead.
     */
    get<T>(key: string): T | undefined;
    /**
     * Returns the value for the key.
     * If it hasn't been cached yet, the function is called to cache and return the value.
     * Asynchronous version of get.
     */
    getOrFetch<T>(key: string, fn: () => Awaitable<T>): Promise<T>;
    /**
     * Returns the value for the key.
     * If it hasn't been cached yet, the function is called to cache and return the value.
     */
    getOrSet<T>(key: string, fn: () => T): T;
    /** Gets the internal cache map, creating it if needed. */
    protected getOrCreateCache(): Map<string, any>;
    /** Clears all the caches for all the ClassCache objects. */
    static clear(): void;
}
