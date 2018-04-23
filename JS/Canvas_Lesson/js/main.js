window.onload = function () {
    var dZoom = 1;

    var area = {
        left: -10,
        bottom: -10,
        width: 20,
        height: 20,
    };

    var checkedFunc = [-1, -1];
    var border = { left: 0, right: 0 };

    var func = [];

    var isShowOXY = true;
    var isShowSquare = false;

    var canvas = new Canvas({
        area: area,
        width: 600,
        height: 600,
        callback: {
            wheel: wheelCallback,
            mouseMove: mouseMoveCallback,
            mouseDown: mouseDownCallback,
            mouseUp: mouseUpCallback,
            mouseOut: mouseOutCallback
        }
    });

    var ui = new UI({
        callbacks: {
            inputFunc: inputFunc,
            inputColor: inputColor,
            inputSize: inputSize,
            addFunc: addFunc,
            remFunc: remFunc,
            selectFunc: selectFunc,
            setSizePoly: setSizePoly,
            showOXY: showOXY,
            showSquare: showSquare
        }
    });

    function showOXY(marker) {
        isShowOXY = marker;
        render();
    }

    function showSquare(marker) {
        isShowSquare = marker;
        render();
    }

    function setSizePoly(left, right) {
        border.left = left;
        border.right = right;
        render();
    }

    function selectFunc(funcCnt, checked) {
        if (checked) {
            if (checkedFunc[0] != -1 && checkedFunc[1] != -1) {
                checkedFunc[0] = checkedFunc[1];
                checkedFunc[1] = funcCnt;
            } else {
                (checkedFunc[0] == -1) ? checkedFunc[0] = funcCnt : checkedFunc[1] = funcCnt;
            }
        } else {
            (funcCnt == checkedFunc[0]) ? checkedFunc[0] = -1 : checkedFunc[1] = -1;
        }
        render();
    }

    function addFunc(funcCnt) {
        func[funcCnt] = {
            F: function (x) { },
            color: 'black',
            lineWidth: 1
        }
    }

    function remFunc(funcCnt) {
        func[funcCnt].F = function (x) { return 0;};
        func[funcCnt].color = 'black';
        func[funcCnt].lineWidth = 1;
        render();
    }

    function inputFunc(f, funcCnt) {
        func[funcCnt].F = f;
        render();
    }

    function inputColor(c, funcCnt) {
        func[funcCnt].color = c;
        render();
    }

    function inputSize(s, funcCnt) {
        func[funcCnt].lineWidth = s;
        render();
    }

    function wheelCallback(event) {
        if (event.wheelDeltaY < 0) {
            area.left -= dZoom;
            area.bottom -= dZoom;
            area.width += 2 * dZoom;
            area.height += 2 * dZoom;
        } else {
            if (area.width <= 2 * dZoom || area.height <= 2 * dZoom) {

            } else {
                area.left += dZoom;
                area.bottom += dZoom;
                area.width -= 2 * dZoom;
                area.height -= 2 * dZoom;
            }
        }
        render();
    }

    var canMove = false;
    var mousePos = { x: 0, y: 0 }

    function mouseDownCallback(event) {
        mousePos.x = canvas.xg(event.x);
        mousePos.y = canvas.yg(event.y);
        canMove = true;
    }

    function mouseUpCallback(event) {
        canMove = false;
    }

    function mouseMoveCallback(event) {
        if (canMove) {
            area.left -= canvas.xg(event.x) - mousePos.x;
            area.bottom -= canvas.yg(event.y) - mousePos.y;
            render();
        }
    }

    function mouseOutCallback(event) {
        canMove = false;
    }

    function drawFunction(F, color, lineWidth) {
        var F = (F instanceof Function) ? F : function () { return 0;}
        var x = area.left;
        var dx = 0.1;
        while (x < area.left + area.width) {
            try {
                canvas.line(x, F(x), x + dx, F(x + dx), color, lineWidth);
            } catch (e) { };
            x += dx;
        }
    }

    function drawOXY() {
        for (var i = 0; i > area.left; i--) {
            canvas.line(i, area.bottom, i, area.height + area.bottom, "#f0f0f0");
        }
        for (var i = 0; i < area.left + area.width; i++) {
            canvas.line(i, area.bottom, i, area.height + area.bottom, "#f0f0f0");
        }
        for (var i = 0; i > area.bottom; i--) {
            canvas.line(area.left, i, area.width + area.left, i, "#f0f0f0");
        }
        for (var i = 0; i < area.bottom + area.height; i++) {
            canvas.line(area.left, i, area.width + area.left, i, "#f0f0f0");
        }
        canvas.line(0, area.height + area.bottom, 0, area.bottom);
        canvas.line(area.width + area.left, 0, area.left, 0);
        canvas.arrow();
    }

    function drawPolygon(F, G, A, B, color) {
        if (F instanceof Function &&
            G instanceof Function &&
            !isNaN(A - 0) && !isNaN(B - 0) &&
            !(A == 0 && B == 0)) {

            var x = A;
            var dx = (B - A) / 100;
            var arr = [];
            arr.push({ x: x, y: F(x) });
            while (x <= B) {
                x += dx;
                arr.push({x: x, y: F(x)});
            }
            var x = B;
            arr.push({ x: x, y: G(x) });
            while (x >= A) {
                x -= dx;
                arr.push({ x: x, y: G(x) });
            }
            canvas.polygon(arr, color);
        }
    }

    function calcS(F, G, A, B) {
        if (F instanceof Function &&
            G instanceof Function &&
            !isNaN(A - 0) && !isNaN(B - 0) &&
            !(A == 0 && B == 0)) {
            var S = 0;
            var dx = (B - A) / 100;
            var x = A;
            while (x <= B) {
                var s1 = Math.abs(((G(x) + G(x + dx)) / 2) * dx);
                var s2 = Math.abs(((F(x) + F(x + dx)) / 2) * dx);
                if (F(x) * G(x) > 0) {
                    S += Math.abs(s1 - s2);
                } else {
                    S += s1 + s2;
                }
                x += dx;
            }
            ui.square(Math.floor(S * 100) / 100);
        }
    };

    function render() {
        canvas.clear();
        if (checkedFunc[0] != -1 && checkedFunc[1] != -1 && isShowSquare) {
            drawPolygon(func[checkedFunc[0]].F, func[checkedFunc[1]].F, border.left, border.right, 'green');
            calcS(func[checkedFunc[0]].F, func[checkedFunc[1]].F, border.left, border.right);
        }
        if (isShowOXY) { drawOXY(); }
        for (var i = 0; i < func.length; i++) {
            drawFunction(func[i].F, func[i].color, func[i].lineWidth);
        }
    }
    render();
};