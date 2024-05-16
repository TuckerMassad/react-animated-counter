import { useRef, useEffect } from 'react';
// Hook used to track previous value of primary number state in AnimatedCounter & individual digits in NumberColumn
var usePrevious = function (value) {
    var ref = useRef(null);
    useEffect(function () {
        ref.current = value;
    }, [value]);
    return ref.current;
};
export default usePrevious;