function Canvas(options) {
    options = (options instanceof Object) ? options : {};
    var parent = options.parent || document.querySelector('body');
    var width = options.width || 300;
    var height = options.height || 300;
    var area = options.area || {
        left: -10,
        bottom: -10,
        width: 20,
        height: 20,
    };
    var callbacks = (options.callback instanceof Object) ? options.callback : {};
    var wheelCallback     = (callbacks.wheel instanceof Function)     ? callbacks.wheel     : function () { };
    var MouseMoveCallback = (callbacks.mouseMove instanceof Function) ? callbacks.mouseMove : function () { };
    var MouseDownCallback = (callbacks.mouseDown instanceof Function) ? callbacks.mouseDown : function () { };
    var MouseUpCallback   = (callbacks.mouseUp instanceof Function)   ? callbacks.mouseUp   : function () { };
    var MouseOutCallback = (callbacks.mouseOut instanceof Function) ? callbacks.mouseOut : function () { };

    function xs(x) {
        return width * (x - area.left) / area.width;
    }

    function ys(y) {
        return height - height * (y - area.bottom) / area.height;
    }
    
    this.xg = function (x) {
        return (x * area.width) / width + area.left;
    }

    this.yg = function (y) {
        return (area.height * (height - y)) / height + area.bottom;
    }

    this.polygon = function (points, color) {
        if (points instanceof Array && points.length >= 3) {
            memContext.fillStyle = (color) ? color : "#000000";
            memContext.beginPath();
            memContext.moveTo(xs(points[0].x), ys(points[0].y));
            for (var i = 1; i < points.length; i++) {
                memContext.lineTo(xs(points[i].x), ys(points[i].y));
            }
            memContext.lineTo(xs(points[0].x), ys(points[0].y));
            memContext.closePath();
            memContext.fill();
        }
    }

    this.print = function () {
        var image = memContext.getImageData(0, 0, width, height);
        context.putImageData(image, 0, 0);
    };

    this.clear = function (color) {
        memContext.fillStyle = (color) ? color : "#d0d0d0";
        memContext.fillRect(0, 0, width, height);
    }

    this.point = function(x, y, radius, color) {
        memContext.fillStyle = (color) ? color : "#FF0000";
        memContext.beginPath();
        memContext.arc(
            xs(x), ys(y), // center
            (radius) ? radius : 2, // radius
            0, Math.PI*2, // angles start and end draw
            true); 
        memContext.closePath();
        memContext.fill();
    };

    this.line = function (x1, y1, x2, y2, color, lineWidth) {
        memContext.strokeStyle = (color) ? color : "#000000";
        memContext.beginPath();
        memContext.lineWidth = (lineWidth) ? lineWidth : 1;
        memContext.moveTo(xs(x1), ys(y1));
        memContext.lineTo(xs(x2), ys(y2));
        memContext.closePath();
        memContext.stroke();
    }

    this.arrow = function () {
        memContext.strokeStyle = "#000000";
        memContext.beginPath();
        memContext.moveTo(xs(0), 0);
        memContext.lineTo(xs(0) + 10, 20);
        memContext.moveTo(xs(0), 0);
        memContext.lineTo(xs(0) - 10, 20);
        memContext.moveTo(width, ys(0));
        memContext.lineTo(width - 20, ys(0) + 10);
        memContext.moveTo(width, ys(0));
        memContext.lineTo(width - 20, ys(0) - 10);
        memContext.closePath();
        memContext.stroke();
    }

    var canvas;
    var context;
    var memCanvas;
    var memContext;

    function init() {
        canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.addEventListener('wheel', wheelCallback);
        canvas.addEventListener('mousedown', MouseDownCallback);
        canvas.addEventListener('mouseup', MouseUpCallback);
        canvas.addEventListener('mousemove', MouseMoveCallback);
        canvas.addEventListener('mouseout', MouseOutCallback);
        context = canvas.getContext('2d');

        memCanvas = document.createElement('canvas');
        memCanvas.width = width;
        memCanvas.height = height;
        memContext = memCanvas.getContext('2d');

        parent.appendChild(canvas);
    }
    init();
}