var events = (function() {
    var events = {};

    function on(eventName, fn) {
        events[eventName] = events[eventName] || [];
        events[eventName].push(fn);
        debug("ON: ");
    }
    function off(eventName, fn) {
        if (events[eventName]) {
            for (var i = 0; i < events[eventName].length; i++) {
                if( events[eventName][i] === fn ) {
                    events[eventName].splice(i, 1);
                    break;
                }
            }
        }
        debug("OFF: ");
    }
    function emit(eventName, data) {
        if (events[eventName]) {
            events[eventName].forEach(function(fn) {
                fn(data);
            });
        }
        debug("EMIT: ");
    }
    function debug(msg){
        console.info(msg);
        console.info(events);
    }
    return {
        on: on,
        off: off,
        emit: emit,
    };

})();

export default events;