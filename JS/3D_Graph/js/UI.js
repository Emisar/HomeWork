function UI(options) {
    options = (options instanceof Object) ? options : {};

    var callback = (options instanceof Object) ? options.callback : {};
    var keyDown = (callback.keyDown instanceof Function) ? callback.keyDown : function () { };
    var showPoints = (callback.showPoints instanceof Function) ? callback.showPoints : function () { };
    var showEdges = (callback.showEdges instanceof Function) ? callback.showEdges : function () { };
    var showPolygons = (callback.showPolygons instanceof Function) ? callback.showPolygons : function () { };

    var checkBox_Point,
        checkBox_Edge,
        checkBox_Poly,
        label_FPS;


    function renderElement() {
        var div = document.createElement('div');

        checkBox_Point = document.createElement('input');
        checkBox_Point.setAttribute('type', 'checkbox');
        checkBox_Point.checked = true;

        var label_Point = document.createElement('s1');
        label_Point.innerHTML = 'Show Points';

        checkBox_Edge = document.createElement('input');
        checkBox_Edge.setAttribute('type', 'checkbox');
        checkBox_Edge.checked = true;

        var label_Edge = document.createElement('s1');
        label_Edge.innerHTML = 'Show Edges';

        checkBox_Poly = document.createElement('input');
        checkBox_Poly.setAttribute('type', 'checkbox');
        checkBox_Poly.checked = true;

        var label_Poly = document.createElement('s1');
        label_Poly.innerHTML = 'Show Polygons';

        div.appendChild(checkBox_Point);
        div.appendChild(label_Point);
        div.appendChild(checkBox_Edge);
        div.appendChild(label_Edge);
        div.appendChild(checkBox_Poly);
        div.appendChild(label_Poly);
        document.querySelector('body').appendChild(div);

        var div = document.createElement('div');

        label_FPS = document.createElement('s1');
        label_FPS.innerHTML = 'FPS: 0';

        div.appendChild(label_FPS);
        document.querySelector('body').appendChild(div);
    }

    this.showFPS = function (fps) {
        label_FPS.innerHTML = 'FPS: ' + fps;
    }

    function eventHandler() {
        document.addEventListener('keydown', keyDown);
        checkBox_Point.addEventListener('change', function () { showPoints(checkBox_Point.checked) });
        checkBox_Edge.addEventListener('change', function () { showEdges(checkBox_Edge.checked) });
        checkBox_Poly.addEventListener('change', function () { showPolygons(checkBox_Poly.checked) });
    }

    function init() {
        renderElement();
        eventHandler();
    };
    init();
}