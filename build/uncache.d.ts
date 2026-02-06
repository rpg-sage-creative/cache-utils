type NullifyOption = {
    /** set all keys to null */
    nullify: true;
    /** set all keys to undefined using delete */
    undefine?: never;
};
type UndefineOption = {
    /** set all keys to null */
    nullify?: never;
    /** set all keys to undefined using delete */
    undefine: true;
};
/**
 * Proactive memory management helper.
 * Calls .clear() and .destroy() on the given object if they exist.
 * The object is then iterated using Object.entries() where .clear() and .destroy() are attempted on each value.
 * If options.nullify is true, then each key of object is set to null after attempting to clear/destroy them.
 * @returns null for convenience, example: cache = uncache(cache);
 */
export declare function uncache(object: any, options?: NullifyOption): null;
/**
 * Proactive memory management helper.
 * Calls .clear() and .destroy() on the given object if they exist.
 * The object is then iterated using Object.entries() where .clear() and .destroy() are attempted on each value.
 * If options.undefine is true, then each key of object is deleted after attempting to clear/destroy them.
 * @returns undefined for convenience, example: cache = uncache(cache);
 */
export declare function uncache(object: any, options: UndefineOption): undefined;
export {};
