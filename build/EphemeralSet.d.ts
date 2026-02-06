import { EphemeralBase } from "./EphemeralBase.js";
export declare class EphemeralSet<V> extends EphemeralBase<V, V> implements Set<V> {
    [Symbol.iterator](): SetIterator<V>;
    get [Symbol.toStringTag](): string;
    /** adds a value to the data and then queues up the process */
    add(value: V): this;
    /** iterate the entries as [key, value] */
    entries(): SetIterator<[V, V]>;
    forEach(fn: (value: V, value2: V, set: EphemeralSet<V>) => unknown, thisArg?: any): void;
    keys(): SetIterator<V>;
    values(): SetIterator<V>;
}
