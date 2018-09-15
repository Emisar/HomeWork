window.onload = function () {
    var dZoom = 1;

    var camera = { x: 0, y: 0, z: -20};
    var area = {
        left: -10,
        bottom: -10,
        width: 20,
        height: 20,
        z: -10
    };

    var canvas = new Canvas({
        parent: document.getElementById('graph'),
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
        callback: {
            keyDown: keyDownCallback,
            showPoints: showPointsCallback,
            showEdges: showEdgesCallback,
            showPolygons: showPolygonsCallback,
			setFigure: setFigureCallback
        }
    });
	
	function setFigureCallback(figureMode, options) {
        switch (figureMode) {
			case 1:
				logic3D.universal(options);
				break;
			case 2:
				logic3D.sphere(options);
				break;
			case 3:
				logic3D.ellipsoid(options);
				break;
			case 4:
				logic3D.conus(options);
				break;
			case 5:
				logic3D.сylinder(options);
				break;
			case 6:
				logic3D.hyperCylinder(options);
				break;
			case 7:
				logic3D.parabCylinder(options);
				break;
			case 8:
				logic3D.hyperboloid(options);
				break;
			case 9:
				logic3D.twoCavityHyperbol(options);
				break;
			case 10:
				logic3D.hyperParaboloid(options);
				break;
			case 11:
				logic3D.ellepticParaboloid(options);
                break;
        }
	}
    
    var logic3D = new Logic3D({
        camera: camera,
        area: area
    });

    function keyDownCallback(event) {
        switch (event.keyCode) {
            // moveup             
            case 38:    // arrow up
				logic3D.rotateCameraZ(0.1);
				break;
            case 87:    // w
                logic3D.move({ x: 0, y: 0.2, z: 0 });
                break;
            // move down             
            case 40:    // arrow down
				logic3D.rotateCameraZ(-0.1);
				break;
            case 83:    // s
                logic3D.move({ x: 0, y: -0.2, z: 0 });
                break;
            // Move left             
            case 37:    // arrow left
				logic3D.rotateCameraX(-0.1);
				break;
            case 65:    // a
                logic3D.move({ x: -0.2, y: 0, z: 0 });
                break;
            // Move right             
            case 39:    // arrow right
				logic3D.rotateCameraX(0.1);
				break;
            case 68:    // d
                logic3D.move({ x: 0.2, y: 0, z: 0 });
                break;
            // Scale up             
            case 33:
                logic3D.scale({ x: 1.1, y: 1.1, z: 1.1 });
                break;
            case 34:
                logic3D.scale({ x: 0.9, y: 0.9, z: 0.9 });
                break;
            //Rotate             
            case 100:     //NumPad 2
                logic3D.rotateZ(5 * Math.PI / 180);
                break;
            case 102:     //NumPad 8
                logic3D.rotateZ(-5 * Math.PI / 180);
                break;
            case 98:      //NumPad 4
                logic3D.rotateX(5 * Math.PI / 180);
                break;
            case 104:    //NumPad 6
                logic3D.rotateX(-5 * Math.PI / 180);
                break;
            case 103:      //NumPad 7
                logic3D.rotateY(5 * Math.PI / 180);
                break;
            case 105:      //NumPad 9
                logic3D.rotateY(-5 * Math.PI / 180);
                break;

        }
    }

    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function wheelCallback(event) {
        var temp = event.deltaY || event.deltaMode;
        if (temp < 0) {
            camera.z--;
            area.z--;
        } else {
            camera.z++;
            area.z++;
        }
    }

    var canRotate = false;

    function mouseDownCallback() { canRotate = true; }
    function mouseUpCallback() { canRotate = false; }
    function mouseOutCallback() { canRotate = false; }

    function mouseMoveCallback(event) {
        if (canRotate) {
            if (event.movementX) {
                logic3D.rotateY(-event.movementX * Math.PI / 180);
            }
            if (event.movementY) {
                logic3D.rotateX(event.movementY * Math.PI / 180);
            }
        }
    }

    var isShow = {
        points: true,
        edges: true,
        polygons: true
    };

    function showPointsCallback(check) {
        isShow.points = check;
    };

    function showEdgesCallback(check) {
        isShow.edges = check;
    };

    function showPolygonsCallback(check) {
        isShow.polygons = check;
    };

    function drawScene() {
        var scene = logic3D.getScene();
        // Lights
        if (isShow.polygons) {
            logic3D.setLights();
        }
        var polygons = [];
        for (var i = 0; i < scene.length; i++) {
            var points = scene[i].points;
            //draw polygons
            if (isShow.polygons) {
                logic3D.sortPolygons(scene[i], camera);
                if (scene[i].polygons && scene[i].polygons.length) {
                    for (var j = 0; j < scene[i].polygons.length; j++) {
                        if (scene[i].polygons[j].points instanceof Array) {
                            var arr = [];
                            for (var k = 0; k < scene[i].polygons[j].points.length; k++) {
                                arr.push({
                                    x: points[scene[i].polygons[j].points[k]].x2D,
                                    y: points[scene[i].polygons[j].points[k]].y2D
                                });
                            }
                            var color = scene[i].polygons[j].color;
                            var lumen = scene[i].polygons[j].lumen;
                            polygons.push({
                                points: arr,
                                distance: scene[i].polygons[j].distance,
                                color: 'rgb(' + Math.round(color.red * lumen) + ',' + Math.round(color.green * lumen) + ',' + Math.round(color.blue * lumen) + ')'});
                        }
                    }
                }
            }
            //draw edges
            if (isShow.edges) {
                for (var j = 0; j < scene[i].edges.length; j++) {
                    var edge = scene[i].edges[j];
                    if (points[edge.p1] && points[edge.p2]) {
                        canvas.line(points[edge.p1].x2D, points[edge.p1].y2D,
                            points[edge.p2].x2D, points[edge.p2].y2D,
                            'green', 2);
                    }
                }
            }
            // draw points
            if (isShow.points) {
                for (var j = 0; j < points.length; j++) {
                    var point = points[j];
                    canvas.point(point.x2D, point.y2D);
                }
            }
        }
        if (isShow.polygons && polygons) {
            polygons.sort(function (a, b) {
                return (a.distance > b.distance) ? -1 : 1;
            });
            for (var i = 0; i < polygons.length; i++) {
                canvas.polygon(polygons[i].points, polygons[i].color);
            }
        }
    }

    var FPScount = 0;
    var oldTimestamp = (new Date()).getTime();
    var newTimestamp = (new Date()).getTime();

    (function animloop() {
        // FPS
        FPScount++;
        newTimestamp = (new Date()).getTime();
        if (newTimestamp - oldTimestamp >= 1000) {
            ui.showFPS(FPScount);
            FPScount = 0;
            oldTimestamp = newTimestamp;
        }
        // render scene
        canvas.clear();
        drawScene();
        canvas.print();
        requestAnimationFrame(animloop);
    })();
};