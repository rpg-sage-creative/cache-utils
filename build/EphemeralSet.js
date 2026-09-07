import { wrapSetIterator } from "@rsc-utils/iterator-utils";
import { EphemeralBase } from "./EphemeralBase.js";
export class EphemeralSet extends EphemeralBase {
    // public constructor(msToLive: number)
    [Symbol.iterator]() {
        return this.values();
    }
    get [Symbol.toStringTag]() {
        return "EphemeralSet";
    }
    // public get msToLive(): number
    /** adds a value to the data and then queues up the process */
    add(value) {
        return this.set(value, value);
    }
    // public clear(): void
    // public delete(key: K): boolean
    /** iterate the entries as [key, value] */
    entries() {
        return wrapSetIterator(this.map.keys(), key => {
            return {
                value: [key, this.map.get(key)?.value],
                skip: !this.map.has(key)
            };
        });
    }
    forEach(fn, thisArg) {
        for (const entry of this.entries()) {
            fn.call(thisArg, entry[1], entry[0], this);
        }
    }
    // public has(key: K): boolean
    keys() {
        return wrapSetIterator(this.map.keys(), key => {
            return {
                value: key,
                skip: !this.map.has(key)
            };
        });
    }
    // public get size(): number
    values() {
        return wrapSetIterator(this.map.keys(), key => {
            return {
                value: this.map.get(key)?.value,
                skip: !this.has(key)
            };
        });
    }
}
