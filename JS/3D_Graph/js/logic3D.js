function Polygon(points, color) {
    this.points = points;
    this.middle = new Point(0, 0, 0);
    this.distance = 0;
    this.color = color || 'red';
 }

function Edge(p1, p2) {
    this.p1 = p1 || 0
    this.p2 = p2 || 0
}

function Point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.x2D = 0;
    this.y2D = 0;
}

function Figure(points, edges, polygons, center, animation) {
    this.points = points;
    this.edges = edges;
    this.polygons = polygons;
    this.animation = animation || new Point(0, 0, 0);
    this.center = center || new Point(0, 0, 0);
}

function Logic3D(options) {
    options = (options instanceof Object) ? options : {};
    var area = options.area;
    var camera = options.camera;
    
    var math3D = new Math3D();
    var scene = [];

    function xs(point) {
        return (area.z - camera.z) * point.x / (point.z - camera.z);
    }
    function ys(point) {
        return (area.z - camera.z) * point.y / (point.z - camera.z);
    }

    function recalcToArea() {
        for (var i = 0; i < scene.length; i++) {
            for (var j = 0; j < scene[i].points.length; j++) {
                var point = scene[i].points[j];
                point.x2D = xs(point);
                point.y2D = ys(point);
            }
        }
    }
    this.sortPolygons = function (figure, camera) {
        if (figure && figure.polygons instanceof Array && camera && camera instanceof Object) {
            var polygons = figure.polygons;
            var points = figure.points;
            for (var i = 0; i < polygons.length; i++) {

                // 1. calc middle
                if (polygons[i].points.length) {
                    polygons[i].middle.x = 0;
                    polygons[i].middle.y = 0;
                    polygons[i].middle.z = 0;
                    for ( var j = 0; j < figure.polygons[i].points.length; j++) {
                        polygons[i].middle.x += points[polygons[i].points[j]].x;
                        polygons[i].middle.y += points[polygons[i].points[j]].y;
                        polygons[i].middle.z += points[polygons[i].points[j]].z;
                    }
                    polygons[i].middle.x /= polygons[i].points.length;
                    polygons[i].middle.y /= polygons[i].points.length;
                    polygons[i].middle.z /= polygons[i].points.length;
                    polygons[i].middle.x2D = xs(polygons[i].middle);
                    polygons[i].middle.y2D = ys(polygons[i].middle);
                }
                // 2. calc distance
                polygons[i].distance = Math.sqrt(Math.pow(polygons[i].middle.x - camera.x, 2) + 
                                                 Math.pow(polygons[i].middle.y - camera.y, 2) + 
                                                 Math.pow(polygons[i].middle.z - camera.z, 2));
            }
        }
    };

    this.getScene = function () {
        recalcToArea();
        return scene;
    };

    this.move = function (vector) {
        for (var i = 0; i < scene.length; i++) {
            for (var j = 0; j < scene[i].points.length; j++) {
                scene[i].points[j] = math3D.move(scene[i].points[j], vector);
            }
        }
    };

    this.scale = function (vector) {
        for (var i = 0; i < scene.length; i++) {
            for (var j = 0; j < scene[i].points.length; j++) {
                scene[i].points[j] = math3D.scale(scene[i].points[j], vector);
            }
        }
    };

    this.rotateZ = function (alpha) {
        for (var i = 0; i < scene.length; i++) {
            for (var j = 0; j < scene[i].points.length; j++) {
                scene[i].points[j] = math3D.rotateZ(scene[i].points[j], alpha);
            }
        }
    };
    this.rotateX = function (alpha) {
        for (var i = 0; i < scene.length; i++) {
            for (var j = 0; j < scene[i].points.length; j++) {
                scene[i].points[j] = math3D.rotateX(scene[i].points[j], alpha);
            }
        }
    };
    this.rotateY = function (alpha) {
        for (var i = 0; i < scene.length; i++) {
            for (var j = 0; j < scene[i].points.length; j++) {
                scene[i].points[j] = math3D.rotateY(scene[i].points[j], alpha);
            }
        }
    };

    function animateScene() {
        for (var i = 0; i < scene.length; i++) {
            var figure = scene[i];
            if (figure && figure.animation && figure.animation.y) {
                for (var j = 0; j < figure.points.length; j++) {
                    figure.points[j] = math3D.rotateX(figure.points[j], figure.animation.x);
                    figure.points[j] = math3D.rotateY(figure.points[j], figure.animation.y);
                    figure.points[j] = math3D.rotateZ(figure.points[j], figure.animation.z);

                }
            }
        }
    }

    function init() {
        // Solar System
        var planet = sphere(20, 8, { x: 0, y: 0, z: 0 }, 0, 50, 0, new Point( 0, Math.PI * 2 / 360, 0));
        var satellite = sphere(20, 4, { x: 13, y: 0, z: 0 }, 50, 0, 0, new Point(Math.PI * 2 / 360 / 2, Math.PI * 2 / 360 / 2, Math.PI * 2 / 360 / 2));

        scene.push(planet);
        scene.push(satellite);

        setInterval(animateScene, 25);
        //scene.push(hyperParab(-5, -5, 10,10, 10));
        //scene.push(cube(3));
        //scene.push(parab(-5, -5, 10, 10, 10));
    }

    init();
}