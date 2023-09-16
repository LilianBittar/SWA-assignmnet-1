import { createEmitter } from "./emitter";

export function createBindableStringProperty(initialValue) {
    let _val = initialValue ?? "";
    let _emitter = createEmitter();
    let _subject = "PROPERTY_UPDATED";

    const setProperty = (val) => {
        _val = val;
        _emitter.emit(_subject, _val);
    };

    /**
     * @param onUpdate {(string) => void}
     */
    const bind = (onUpdate) => {
        _emitter.on(_subject, onUpdate);
    };

    const read = () => _val;

    return {
        setProperty,
        bind,
        read,
    };
}
export function createBindableObjectProperty(initialValue) {
    let _val = initialValue ?? {};
    let _emitter = createEmitter();
    let _subject = "PROPERTY_UPDATED";

    const setProperty = (val) => {
        _val = val;
        _emitter.emit(_subject, _val);
    };

    /**
     * @param onUpdate {(object) => void}
     */
    const bind = (onUpdate) => {
        _emitter.on(_subject, onUpdate);
    };

    const read = () => _val;

    return {
        setProperty,
        bind,
        read,
    };
}
