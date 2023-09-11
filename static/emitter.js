function createEmitter() {
    const listeners = {};

    const _register = (subject, listenerFn) => {
        if (!(subject in listeners)) {
            listeners[subject] = [listenerFn];
            return;
        }

        listeners[subject].push(listenerFn);
    };
    const on = (subject, listenerFn) => {
        _register(subject, listenerFn);
    };

    const detach = (subject, listenerFn) => {
        if (!(subject in listeners)) {
            return;
        }
        listeners[subject] = listeners[subject].filter(
            (listener) => listener !== listenerFn
        );
    };

    const emit = (subject, data) => {
        if (!(subject in listeners)) {
            return;
        }

        listeners[subject].forEach((listener) => listener(data));
    };

    return {
        on,
        detach,
        emit,
    };
}
