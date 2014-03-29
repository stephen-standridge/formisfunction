/**
    @author <a href="mailto:aaditmshah@myopera.com">Aadit M Shah</a>
    @overview Delta Timing for JavaScript.
    @copyright 2012
    @version 1.0.0
*/
 
/**
    @description Creates a new Delta Timer with start and stop methods.
    @constructor
    @param {function} render The callback to render for animations.
    @param {number} interval The interval of the timer in milliseconds.
*/
 
function DeltaTimer(render, interval) {
    var timeout;
    var lastTime;
 
    this.start = start;
    this.stop = stop;
 
    /**
        @description Start the timer.
        @public
        @function
        @returns {number} The UTC time in milliseconds when the timer started.
    */
 
    function start() {
        timeout = setTimeout(loop, 0);
        lastTime = Date.now();
        return lastTime;
    }
 
    /**
        @description Stop the timer.
        @public
        @function
        @returns {number} The UTC time in milliseconds when the timer stopped.
    */
 
    function stop() {
        clearTimeout(timeout);
        return lastTime;
    }
 
    /**
        @description Loop the timer continuously and call the render function.
        @private
        @function
    */
 
    function loop() {
        var thisTime = Date.now();
        var deltaTime = thisTime - lastTime;
        var delay = Math.max(interval - deltaTime, 0);
        timeout = setTimeout(loop, delay);
        lastTime = thisTime + delay;
        render(thisTime);
    }
}