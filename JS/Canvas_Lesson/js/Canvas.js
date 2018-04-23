function Canvas(options) {
    options = (options instanceof Object) ? options : {};
    var parent = options.parent || 'body';
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
    var MouseOutCallback  = (callbacks.mouseOut instanceof Function)  ? callbacks.mouseOut  : function () { };

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
            context.fillStyle = (color) ? color : "#000000";
            context.beginPath();
            context.moveTo(xs(points[0].x), ys(points[0].y));
            for (var i = 1; i < points.length; i++) {
                context.lineTo(xs(points[i].x), ys(points[i].y));
            }
            context.lineTo(xs(points[0].x), ys(points[0].y));
            context.closePath();
            context.fill();
        }
    }

    this.clear = function (color) {
        context.fillStyle = (color) ? color : "#d0d0d0"
        context.fillRect(0, 0, width, height);
    }

    this.line = function (x1, y1, x2, y2, color, lineWidth) {
        context.strokeStyle = (color) ? color : "#000000";
        context.beginPath();
        context.lineWidth = (lineWidth) ? lineWidth : 1;
        context.moveTo(xs(x1), ys(y1));
        context.lineTo(xs(x2), ys(y2));
        context.closePath();
        context.stroke();
    }

    this.arrow = function () {
        context.strokeStyle = "#000000";
        context.beginPath();
        context.moveTo(xs(0), 0);
        context.lineTo(xs(0) + 10, 20);
        context.moveTo(xs(0), 0);
        context.lineTo(xs(0) - 10, 20);
        context.moveTo(width, ys(0));
        context.lineTo(width - 20, ys(0) + 10);
        context.moveTo(width, ys(0));
        context.lineTo(width - 20, ys(0) - 10);
        context.closePath();
        context.stroke();
    }

    var canvas;
    var context;

    function init() {
        canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        canvas.addEventListener('wheel', wheelCallback);
        canvas.addEventListener('mousedown', MouseDownCallback);
        canvas.addEventListener('mouseup', MouseUpCallback);
        canvas.addEventListener('mousemove', MouseMoveCallback);
        canvas.addEventListener('mouseout', MouseOutCallback)

        context = canvas.getContext('2d');
        document.querySelector(parent).appendChild(canvas);
    }
    init();
}