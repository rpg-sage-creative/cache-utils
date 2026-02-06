import { isPrimitive } from "@rsc-utils/type-utils";
function attempt(object, fnName) {
    if (typeof (object?.[fnName]) === "function") {
        object[fnName]();
    }
}
export function uncache(object, options) {
    const retVal = options?.undefine ? undefined : null;
    if (isPrimitive(object)) {
        return retVal;
    }
    attempt(object, "clear");
    attempt(object, "destroy");
    Object.entries(object).forEach(([key, value]) => {
        attempt(value, "clear");
        attempt(value, "destroy");
        if (options?.nullify) {
            object[key] = null;
        }
        if (options?.undefine) {
            delete object[key];
        }
    });
    return retVal;
}
