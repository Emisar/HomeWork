function Polygon(points, color) {
    this.points = points;
    this.middle = new Point(0, 0, 0);
    this.distance = 0;
    this.color = color || { red: 125, green: 0, blue: 0 };
    this.lumen = 0;
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
    this.center = center || new Point(0, 0, 0);
    this.animation = animation || new Point(0, 0, 0);
}

function Logic3D(options) {
    options = (options instanceof Object) ? options : {};
    var area = options.area || { left: 0, bottom: 0, width: 0, height: 0, z: 0 };
	
	var camera = options.camera || { x: 0, y: 0, z: 0 };
    
    var lights = [];
    var math3D = new Math3D();
    var scene = [];
    
    function xs(point) {
        return (area.z - camera.z) * point.x / (point.z - camera.z);
    }
    function ys(point) {
        return (area.z - camera.z) * point.y / (point.z - camera.z);
    }

	this.rotateCameraX = function(y) {
		// Поворот камеры по X
	}
	
	this.rotateCameraZ = function(y) {
		// Поворот камеры по Z
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

    this.setLights = function () {
        for (var i = 0; i < lights.length; i++) {
            var light = lights[i];
            for (var j = 0; j < scene.length; j++) {
                var figure = scene[j];
                var polygons = figure.polygons;
                var points = figure.points;
                for (var k = 0; k < polygons.length; k++) {
                    if (polygons[k].points.length) {
                        polygons[k].middle.x = 0;
                        polygons[k].middle.y = 0;
                        polygons[k].middle.z = 0;
                        for (var n = 0; n < polygons[k].points.length; n++) {
                            polygons[k].middle.x += points[polygons[k].points[n]].x;
                            polygons[k].middle.y += points[polygons[k].points[n]].y;
                            polygons[k].middle.z += points[polygons[k].points[n]].z;
                        }
                        polygons[k].middle.x /= polygons[k].points.length;
                        polygons[k].middle.y /= polygons[k].points.length;
                        polygons[k].middle.z /= polygons[k].points.length;
                        polygons[k].middle.x2D = xs(polygons[k].middle);
                        polygons[k].middle.y2D = ys(polygons[k].middle);
                    }
                    var distance =
                        Math.sqrt(Math.pow(polygons[k].middle.x - camera.x, 2) +
                        Math.pow(polygons[k].middle.y - camera.y, 2) +
                        Math.pow(polygons[k].middle.z - camera.z, 2));
                    var lumen = light.watt / Math.pow(distance, 2);
                    lumen = (lumen > 1) ? 1 : lumen;
                    polygons[k].lumen = lumen;
                    polygons[k].lumen = (polygons[k].lumen > 1) ? 1 : polygons[k].lumen;
                }    
            }       
        }
    };

    this.getScene = function () {
        recalcToArea();
        return scene;
    };

    this.move = function (vector) {
        math3D.fillMoveMatrix(vector);
        for (var i = 0; i < scene.length; i++) {
            for (var j = 0; j < scene[i].points.length; j++) {
                scene[i].points[j] = math3D.move(scene[i].points[j], vector);
            }
            scene[i].center = math3D.move(scene[i].center, vector);
        }
    };

    this.scale = function (vector) {
        math3D.fillScaleMatrix(vector);
        for (var i = 0; i < scene.length; i++) {
            for (var j = 0; j < scene[i].points.length; j++) {
                scene[i].points[j] = math3D.scale(scene[i].points[j], vector);
            }
            scene[i].center = math3D.scale(scene[i].center, vector);
        }
    };

    this.rotateZ = function (alpha) {
        math3D.fillRotateZMatrix(alpha);
        for (var i = 0; i < scene.length; i++) {
            for (var j = 0; j < scene[i].points.length; j++) {
                scene[i].points[j] = math3D.rotateZ(scene[i].points[j], alpha);
            }
            scene[i].center = math3D.rotateZ(scene[i].center, alpha);
        }
    };
    this.rotateX = function (alpha) {
        math3D.fillRotateXMatrix(alpha);
        for (var i = 0; i < scene.length; i++) {
            for (var j = 0; j < scene[i].points.length; j++) {
                scene[i].points[j] = math3D.rotateX(scene[i].points[j], alpha);
            }
            scene[i].center = math3D.rotateX(scene[i].center, alpha);
        }
    };
    this.rotateY = function (alpha) {
        math3D.fillRotateYMatrix(alpha);
        for (var i = 0; i < scene.length; i++) {
            for (var j = 0; j < scene[i].points.length; j++) {
                scene[i].points[j] = math3D.rotateY(scene[i].points[j], alpha);
            }
            scene[i].center = math3D.rotateY(scene[i].center, alpha);
        }
    };

    function animateScene() {
        var a = 0, b = 0;
        for (var i = 0; i < scene.length; i++) {
            var figure = scene[i];
            if (figure) {
                if (figure.animation) {
                    math3D.fillMoveMatrix({ x: -figure.center.x, y: -figure.center.y, z: -figure.center.z });
                    for (var j = 0; j < figure.points.length; j++) {
                        figure.points[j] = math3D.move(figure.points[j], { x: -figure.points[j].x, y: -figure.points[j].y, z: -figure.points[j].z });
                    }
                    math3D.fillRotateYMatrix(figure.animation.y);
                    math3D.fillRotateXMatrix(figure.animation.x);
                    math3D.fillRotateZMatrix(figure.animation.z);
                    for (var j = 0; j < figure.points.length; j++) {
                        if (figure.animation.y) {
                            figure.points[j] = math3D.rotateY(figure.points[j], figure.animation.y);
                        }
                        if (figure.animation.x) {
                            figure.points[j] = math3D.rotateX(figure.points[j], figure.animation.x);
                        }
                        if (figure.animation.z) {
                            figure.points[j] = math3D.rotateZ(figure.points[j], figure.animation.z);
                        }
                    }
                    math3D.fillMoveMatrix({ x: figure.center.x, y: figure.center.y, z: figure.center.z });
                    for (var j = 0; j < figure.points.length; j++) {
                        figure.points[j] = math3D.move(figure.points[j], { x: figure.points[j].x, y: figure.points[j].y, z: figure.points[j].z });
                    }
                }
            }
        }
    }
	
	this.universal = function(options) {
		var n = (isNaN(options.pointsCount)) ? 0 : options.pointsCount;
		var A = (isNaN(options.universal.A)) ? 0 : options.universal.A;
		var B = (isNaN(options.universal.B)) ? 0 : options.universal.B;
		var C = (isNaN(options.universal.C)) ? 0 : options.universal.C;
		var F = (isNaN(options.universal.F)) ? 0 : options.universal.F;
		var G = (isNaN(options.universal.G)) ? 0 : options.universal.G;
		var H = (isNaN(options.universal.H)) ? 0 : options.universal.H;
		var P = (isNaN(options.universal.P)) ? 0 : options.universal.P;
		var Q = (isNaN(options.universal.Q)) ? 0 : options.universal.Q;
		var R = (isNaN(options.universal.R)) ? 0 : options.universal.R;
		var D = (isNaN(options.universal.D)) ? 0 : options.universal.D;
		var zone = {
			x0: (isNaN(options.area.x0)) ? -5 : options.area.x0,
			y0: (isNaN(options.area.y0)) ? -5 : options.area.y0,
			z0: (isNaN(options.area.z0)) ? -5 : options.area.z0,
			xn: (isNaN(options.area.xn)) ? 5 : options.area.xn,
			yn: (isNaN(options.area.yn)) ? 5 : options.area.yn,
			zn: (isNaN(options.area.zn)) ? 5 : options.area.zn
		};
		scene[0] = All(n, {x0: -5, y0: -5, z0: -5, xn: 5, yn: 5, zn: 5}, A, B, C, F, G, H, P, Q, R, D);
	};
	
	this.sphere = function(options) {
		var n = (isNaN(options.pointsCount)) ? 0 : options.pointsCount;
		var r = (isNaN(options.radius.xr)) ? 0 : options.radius.xr;
		var center = {
			x: (isNaN(options.position.x)) ? 0 : options.position.x,
			y: (isNaN(options.position.y)) ? 0 : options.position.y,
			z: (isNaN(options.position.z)) ? 0 : options.position.z
		};
		var color = {
			red: (isNaN(options.color.red)) ? 0 : options.color.red,
			green: (isNaN(options.color.green)) ? 0 : options.color.green,
			blue: (isNaN(options.color.blue)) ? 0 : options.color.blue
		}
        scene[0] = sphere(n, r, center, color);
        var size = r * 2;
        scene[1] = cube(size, center, color);
	};
	
	this.ellipsoid = function(options) {
		var n = (isNaN(options.pointsCount)) ? 0 : options.pointsCount;
		var xr = (isNaN(options.radius.xr)) ? 0 : options.radius.xr;
		var yr = (isNaN(options.radius.yr)) ? 0 : options.radius.yr;
		var zr = (isNaN(options.radius.zr)) ? 0 : options.radius.zr;
		var center = {
			x: (isNaN(options.position.x)) ? 0 : options.position.x,
			y: (isNaN(options.position.y)) ? 0 : options.position.y,
			z: (isNaN(options.position.z)) ? 0 : options.position.z
		};
		var color = {
			red: (isNaN(options.color.red)) ? 0 : options.color.red,
			green: (isNaN(options.color.green)) ? 0 : options.color.green,
			blue: (isNaN(options.color.blue)) ? 0 : options.color.blue
		}
        scene[0] = ellipsoid(n, xr, yr, zr, center, color);
        var size = (yr * 2 > xr * 2) ? yr * 2 : xr * 2;
        size = (size > zr * 2) ? size : zr * 2;
        scene[1] = cube(size, center, color);
	};
	
	this.conus = function(options) {
		var n = (isNaN(options.pointsCount)) ? 0 : options.pointsCount;
		var h = {
			h: (isNaN(options.height.h)) ? 0 : options.height.h,
			H: (isNaN(options.height.H)) ? 0 : options.height.H
		};
		var xr = (isNaN(options.radius.xr)) ? 0 : options.radius.xr;
		var yr = (isNaN(options.radius.yr)) ? 0 : options.radius.yr;
		var zr = (isNaN(options.radius.zr)) ? 0 : options.radius.zr;
		var center = {
			x: (isNaN(options.position.x)) ? 0 : options.position.x,
			y: (isNaN(options.position.y)) ? 0 : options.position.y,
			z: (isNaN(options.position.z)) ? 0 : options.position.z
		};
		var color = {
			red: (isNaN(options.color.red)) ? 0 : options.color.red,
			green: (isNaN(options.color.green)) ? 0 : options.color.green,
			blue: (isNaN(options.color.blue)) ? 0 : options.color.blue
		}
        scene[0] = conus(n, h, xr, yr, zr, center, color);
        var size = (Math.abs(h.h - h.H) > xr * 2) ? Math.abs(h.h - h.H) : xr * 2;
        size = (size > yr * 2) ? size : yr * 2;
        size = (size > zr * 2) ? size : zr * 2;
        scene[1] = cube(size, center, color);
	};
	
	this.сylinder = function(options) {
        var n = (isNaN(options.pointsCount)) ? 0 : options.pointsCount;
		var xr = (isNaN(options.radius.xr)) ? 0 : options.radius.xr;
		var yr = (isNaN(options.radius.yr)) ? 0 : options.radius.yr;
		var z = (isNaN(options.height.h)) ? 0 : options.height.h;
		var center = {
			x: (isNaN(options.position.x)) ? 0 : options.position.x,
			y: (isNaN(options.position.y)) ? 0 : options.position.y,
			z: (isNaN(options.position.z)) ? 0 : options.position.z
		}
		var color = {
			red: (isNaN(options.color.red)) ? 0 : options.color.red,
			green: (isNaN(options.color.green)) ? 0 : options.color.green,
			blue: (isNaN(options.color.blue)) ? 0 : options.color.blue
		}
        scene[0] = cylinder(n, xr, yr, z, center, color);
        var size = (z > xr) ? z : xr;
        size = (size > yr) ? size : yr;
        scene[1] = cube(size, center, color);
	};
	
	this.hyperCylinder = function(options) {
        var n = (isNaN(options.pointsCount)) ? 0 : options.pointsCount;
		var xr = (isNaN(options.radius.xr)) ? 0 : options.radius.xr;
		var yr = (isNaN(options.radius.yr)) ? 0 : options.radius.yr;
		var z = (isNaN(options.height.h)) ? 0 : options.height.h;
		var center = {
			x: (isNaN(options.position.x)) ? 0 : options.position.x,
			y: (isNaN(options.position.y)) ? 0 : options.position.y,
			z: (isNaN(options.position.z)) ? 0 : options.position.z
		}
		var color = {
			red: (isNaN(options.color.red)) ? 0 : options.color.red,
			green: (isNaN(options.color.green)) ? 0 : options.color.green,
			blue: (isNaN(options.color.blue)) ? 0 : options.color.blue
		}
        scene[0] = hyperCylinder(n, xr, yr, z, center, color);
        var size = (z > xr * 3) ? z : xr * 3;
        size = (size > yr * 3) ? size : yr * 3;
        scene[1] = cube(size, center, color);
	}
	
	this.parabCylinder = function(options) {
        var n = (isNaN(options.pointsCount)) ? 0 : options.pointsCount;
		var p = (isNaN(options.degree)) ? 0 : options.degree;
		var z = (isNaN(options.height.h)) ? 0 : options.height.h;
		var center = {
			x: (isNaN(options.position.x)) ? 0 : options.position.x,
			y: (isNaN(options.position.y)) ? 0 : options.position.y,
			z: (isNaN(options.position.z)) ? 0 : options.position.z
		}
		var color = {
			red: (isNaN(options.color.red)) ? 0 : options.color.red,
			green: (isNaN(options.color.green)) ? 0 : options.color.green,
			blue: (isNaN(options.color.blue)) ? 0 : options.color.blue
		}
        scene[0] = parabCylinder(n, p, z, center, color);
        scene[1] = cube(z * 2, center, color);
	}
	
	this.hyperboloid = function(options) {
		var n = (isNaN(options.pointsCount)) ? 0 : options.pointsCount;
		var h = (isNaN(options.height.h)) ? 0 : options.height.h;
		var xr = (isNaN(options.radius.xr)) ? 0 : options.radius.xr;
		var yr = (isNaN(options.radius.yr)) ? 0 : options.radius.yr;
		var zr = (isNaN(options.radius.zr)) ? 0 : options.radius.zr;
		var center = {
			x: (isNaN(options.position.x)) ? 0 : options.position.x,
			y: (isNaN(options.position.y)) ? 0 : options.position.y,
			z: (isNaN(options.position.z)) ? 0 : options.position.z
		};
		var color = {
			red: (isNaN(options.color.red)) ? 0 : options.color.red,
			green: (isNaN(options.color.green)) ? 0 : options.color.green,
			blue: (isNaN(options.color.blue)) ? 0 : options.color.blue
		}
        scene[0] = hyperboloid(n, h, xr, yr, zr, center, color);
        var size = (h > xr * 2) ? h : xr * 2;
        size = (size > yr * 2) ? size : yr * 2;
        size = (size > zr * 2) ? size : zr * 2;
        scene[1] = cube(size, center, color);
	}
	
	this.twoCavityHyperbol = function(options) {
		var n = (isNaN(options.pointsCount)) ? 0 : options.pointsCount;
		var h = {
			h: (isNaN(options.height.h)) ? 0 : options.height.h,
			H: (isNaN(options.height.H)) ? 0 : options.height.H
		};
		var xr = (isNaN(options.radius.xr)) ? 0 : options.radius.xr;
		var yr = (isNaN(options.radius.yr)) ? 0 : options.radius.yr;
		var zr = (isNaN(options.radius.zr)) ? 0 : options.radius.zr;
		var center = {
			x: (isNaN(options.position.x)) ? 0 : options.position.x,
			y: (isNaN(options.position.y)) ? 0 : options.position.y,
			z: (isNaN(options.position.z)) ? 0 : options.position.z
		};
		var color = {
			red: (isNaN(options.color.red)) ? 0 : options.color.red,
			green: (isNaN(options.color.green)) ? 0 : options.color.green,
			blue: (isNaN(options.color.blue)) ? 0 : options.color.blue
		}
        scene[0] = twoCavityHyperbol(n, h, xr, yr, zr, center, color);
        scene[1] = cube(Math.abs(h.h - h.H), center, color);
	}
	
	this.hyperParaboloid = function(options) {
		var n = (isNaN(options.pointsCount)) ? 0 : options.pointsCount;
		var left = (isNaN(options.position.x)) ? 0 : options.position.x;
		var bottom = (isNaN(options.position.y)) ? 0 : options.position.y;
		var width = (isNaN(options.width)) ? 0 : options.width;
		var height = (isNaN(options.height.h)) ? 0 : options.height.h;
		var center = {
			x: (isNaN(options.position.x)) ? 0 : options.position.x,
			y: (isNaN(options.position.y)) ? 0 : options.position.y,
			z: (isNaN(options.position.z)) ? 0 : options.position.z
		};
		var color = {
			red: (isNaN(options.color.red)) ? 0 : options.color.red,
			green: (isNaN(options.color.green)) ? 0 : options.color.green,
			blue: (isNaN(options.color.blue)) ? 0 : options.color.blue
		}
        scene[0] = hyperParaboloid(n, left, bottom, width, height, center, color);
        var size = (Math.abs(left - width) > Math.abs(bottom - height)) ? Math.abs(left - width) : Math.abs(bottom - height);
        scene[1] = cube(size * 2, center, color);
	}
		
	this.ellepticParaboloid = function(options) {
		var n = (isNaN(options.pointsCount)) ? 0 : options.pointsCount;
		var h = (isNaN(options.h)) ? 0 : options.h;
		var xr = (isNaN(options.radius.xr)) ? 0 : options.radius.xr;
		var yr = (isNaN(options.radius.yr)) ? 0 : options.radius.yr;
		var center = {
			x: (isNaN(options.position.x)) ? 0 : options.position.x,
			y: (isNaN(options.position.y)) ? 0 : options.position.y,
			z: (isNaN(options.position.z)) ? 0 : options.position.z
		};
		var color = {
			red: (isNaN(options.color.red)) ? 0 : options.color.red,
			green: (isNaN(options.color.green)) ? 0 : options.color.green,
			blue: (isNaN(options.color.blue)) ? 0 : options.color.blue
		}
        scene[0] = elepticParab(n, h, xr, yr, center, color);
        scene[1] = cube(h, center, color);
	}

    function init() {
        var light1 = new Point(-10, 4, 0);
        light1.watt = 100;
        lights.push(light1);
    }

    init();
}