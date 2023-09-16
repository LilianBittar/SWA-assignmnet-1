import { createEmitter } from "./emitter";

export function createDummyModel() {
    let _emitter = createEmitter();
    let _newNumberSubject = "NEW_NUMBER";

    const onNewNumber = (listenerFn) => {
        _emitter.on(_newNumberSubject, listenerFn);
    };

    const start = () => {
        let idx = 0;
        setInterval(() => {
            _emitter.emit(_newNumberSubject, idx);
            idx++;
        }, 2000);
    };

    return { start, onNewNumber };
}
