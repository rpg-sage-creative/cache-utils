import { wrapMapIterator } from "@rsc-utils/iterator-utils";
import { EphemeralBase } from "./EphemeralBase.js";
export class EphemeralMap extends EphemeralBase {
    [Symbol.iterator]() {
        return this.entries();
    }
    get [Symbol.toStringTag]() {
        return "EphemeralMap";
    }
    set(key, value) {
        return super.set(key, value);
    }
    entries() {
        return wrapMapIterator(this.map.keys(), key => {
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
    get(key) {
        return this.map.get(key)?.value;
    }
    keys() {
        return wrapMapIterator(this.map.keys(), key => {
            return {
                value: key,
                skip: !this.map.has(key)
            };
        });
    }
    values() {
        return wrapMapIterator(this.map.keys(), key => {
            return {
                value: this.map.get(key)?.value,
                skip: !this.has(key)
            };
        });
    }
}
