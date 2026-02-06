import { wrapSetIterator } from "@rsc-utils/iterator-utils";
import { EphemeralBase } from "./EphemeralBase.js";
export class EphemeralSet extends EphemeralBase {
    [Symbol.iterator]() {
        return this.values();
    }
    get [Symbol.toStringTag]() {
        return "EphemeralSet";
    }
    add(value) {
        return this.set(value, value);
    }
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
    keys() {
        return wrapSetIterator(this.map.keys(), key => {
            return {
                value: key,
                skip: !this.map.has(key)
            };
        });
    }
    values() {
        return wrapSetIterator(this.map.keys(), key => {
            return {
                value: this.map.get(key)?.value,
                skip: !this.has(key)
            };
        });
    }
}
