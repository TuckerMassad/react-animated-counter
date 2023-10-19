import { useRef, useEffect } from 'react';
// Used to "remember" previous value of each individual digit
export var usePrevious = function (value) {
    var ref = useRef(null);
    useEffect(function () {
        ref.current = value;
    }, [value]);
    return ref.current;
};
//# sourceMappingURL=index.js.map