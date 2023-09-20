import { createEmitter } from "./emitter";

export function createBindableStringProperty(initialValue) {
    let _val = initialValue ?? "";
    let _emitter = createEmitter();
    let _subject = "PROPERTY_UPDATED";

    const setProperty = (val) => {
        const tempPrev = _val;
        _val = val;
        _emitter.emit(_subject, val, tempPrev);
    };

    /**
     * @param onUpdate {(string, prev?) => void}
     */
    const bind = (onUpdate) => {
        _emitter.on(_subject, onUpdate);
    };

    /**
     *
     * @param {(object) => void} listener
     */
    const unbind = (listener) => {
        _emitter.detach(_subject, listener);
    };

    const read = () => _val;

    return {
        setProperty,
        bind,
        read,
        unbind,
    };
}
export function createBindableObjectProperty(initialValue) {
    let _val = initialValue ?? {};
    let _emitter = createEmitter();
    let _subject = "PROPERTY_UPDATED";

    const setProperty = (val) => {
        const tempPrev = _val ? { ..._val } : {};
        _val = val;
        _emitter.emit(_subject, val, tempPrev);
    };

    /**
     * @param onUpdate {(object,prev?) => void}
     */
    const bind = (onUpdate) => {
        _emitter.on(_subject, onUpdate);
    };

    /**
     *
     * @param {(object) => void} listener
     */
    const unbind = (listener) => {
        _emitter.detach(_subject, listener);
    };

    const read = () => _val;

    return {
        setProperty,
        bind,
        read,
        unbind,
    };
}
