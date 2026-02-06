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
    get msToLive() {
        return this._msToLive;
    }
    clear() {
        this.map.clear();
        this.clearTimer();
    }
    delete(key) {
        const deleted = this.map.delete(key);
        if (!this.map.size)
            this.clearTimer();
        return deleted;
    }
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
    _timer;
    clearTimer() {
        clearTimeout(this._timer);
        delete this._timer;
    }
    queue() {
        if (this.map.size && !this._timer && !this._cleaning) {
            this._timer = setTimeout(() => this.clean(), this._msToLive);
        }
    }
    _cleaning = false;
    clean() {
        this._cleaning = true;
        const cutOff = Date.now() - this._msToLive;
        const keys = Array.from(this.keys());
        for (const key of keys) {
            if (!this.map.size) {
                break;
            }
            const ts = this.map.get(key)?.ts ?? 0;
            if (ts <= cutOff) {
                this.delete(key);
            }
        }
        this.clearTimer();
        this._cleaning = false;
        this.queue();
    }
    toJSON() {
        return { map: this.map, msToLive: this._msToLive };
    }
}
