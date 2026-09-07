/**
 * Provides the basic functionality for removing elements on a timer.
 * Also provides basic functions common to both Map and Set.
 */
export class EphemeralBase {
    _msToLive;
    map;
    constructor(_msToLive) {
        this._msToLive = _msToLive;
        if ((_msToLive || 0) < 1) {
            throw new RangeError("msToLive must be > 1");
        }
        this.map = new Map();
    }
    // [Symbol.iterator](): IterableIterator<T>
    // get [Symbol.toStringTag](): string
    /** How many milliseconds before a value gets removed. */
    get msToLive() {
        return this._msToLive;
    }
    // add (Set)
    /** Removes all values */
    clear() {
        this.map.clear();
        this.clearTimer();
    }
    /** Removes the given value */
    delete(key) {
        const deleted = this.map.delete(key);
        if (!this.map.size)
            this.clearTimer();
        return deleted;
    }
    // entries
    // public abstract forEach(fn: (value: V, value2: K, set: EphemeralBase<K, V>) => unknown, thisArg?: any): void;
    // get (Map)
    has(key) {
        return this.map.has(key);
    }
    set(key, value) {
        this.map.set(key, { ts: Date.now(), value });
        this.queue();
        return this;
    }
    get size() {
        return this.map.size;
    }
    // values
    /** timeout reference */
    _timer;
    /** clean the _timer property */
    clearTimer() {
        // clear timer
        clearTimeout(this._timer);
        // unset timer
        delete this._timer;
    }
    /** overlapping intervals can keep expired items too long */
    _nextTimeoutMs;
    /** queues up the process */
    queue() {
        if (this.map.size && !this._timer && !this._cleaning) {
            this._timer = setTimeout(() => this.clean(), this._nextTimeoutMs ?? this._msToLive);
        }
    }
    /** activity flag */
    _cleaning = false;
    /** processes the map to remove expired data */
    clean() {
        // flag as cleaning
        this._cleaning = true;
        // clear
        this._nextTimeoutMs = undefined;
        // initialize
        let nextTimeoutTs;
        // calculate cutoff time
        const cutOff = Date.now() - this._msToLive;
        // get finite set of keys
        const keys = Array.from(this.keys());
        // iterate keys
        for (const key of keys) {
            // get timestamp for key
            const ts = this.map.get(key)?.ts ?? 0;
            if (ts <= cutOff) {
                // remove old key
                this.delete(key);
            }
            else {
                // store ts for _nextTimeoutMs
                nextTimeoutTs = nextTimeoutTs ? Math.min(ts, nextTimeoutTs) : ts;
            }
        }
        if (nextTimeoutTs) {
            const nextCutOff = nextTimeoutTs + this._msToLive;
            const nextTimeoutMs = nextCutOff - cutOff;
            if (nextTimeoutMs < this._msToLive) {
                this._nextTimeoutMs = nextTimeoutMs;
            }
        }
        // clear timer
        this.clearTimer();
        // flag as not cleaning
        this._cleaning = false;
        // in case items were added while cleaning
        this.queue();
    }
    /** @internal Added so that JSON.stringify would treat this more like a Map/Set and not throw a TypeError trying to serialize ._timer */
    toJSON() {
        return { map: this.map, msToLive: this._msToLive };
    }
}
