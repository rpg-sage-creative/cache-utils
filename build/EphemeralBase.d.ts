/**
 * Provides the basic functionality for removing elements on a timer.
 * Also provides basic functions common to both Map and Set.
 */
export declare abstract class EphemeralBase<K, V = K> {
    private _msToLive;
    protected map: Map<K, {
        ts: number;
        value: V;
    }>;
    constructor(msToLive: number);
    /** How many milliseconds before a value gets removed. */
    get msToLive(): number;
    /** Removes all values */
    clear(): void;
    /** Removes the given value */
    delete(key: K): boolean;
    has(key: K): boolean;
    abstract keys(): IterableIterator<K>;
    protected set(key: K, value: V): this;
    get size(): number;
    /** timeout reference */
    private _timer?;
    /** clean the _timer property */
    private clearTimer;
    /** queues up the process */
    private queue;
    /** activity flag */
    private _cleaning;
    /** processes the map to remove expired data */
    private clean;
}
