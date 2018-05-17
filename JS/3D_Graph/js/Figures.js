function cube(n) {
    var green = 200;
    return new Figure([
        new Point(n, n, n),
        new Point(n, n, -n),
        new Point(n, -n, n),
        new Point(n, -n, -n),
        new Point(-n, n, n),
        new Point(-n, n, -n),
        new Point(-n, -n, n),
        new Point(-n, -n, -n),
    ], [
            new Edge(0, 1), new Edge(1, 5), new Edge(5, 4), new Edge(4, 0),
            new Edge(2, 3), new Edge(3, 7), new Edge(7, 6), new Edge(6, 2),
            new Edge(0, 1), new Edge(1, 3), new Edge(3, 2), new Edge(2, 0),
            new Edge(5, 4), new Edge(4, 6), new Edge(6, 7), new Edge(7, 5)
        ], [
        new Polygon([0, 1, 3, 2]),
        new Polygon([2, 3, 7, 6]),
        new Polygon([0, 1, 5, 4]),
        new Polygon([0, 4, 6, 2]),
        new Polygon([1, 3, 7, 5]),
        new Polygon([5, 4, 6, 7])
    ]);
}

function sphere(n, r, center, red, green, blue, animation) {
    var points = [];
    var edges = [];
    var polygons = [];
    var a = 0;
    var da = 2 * Math.PI / n;
    var z = -r;
    var dz = 2 * r / n;
    //points
    for (var i = 0; i <= n; i++) {
        for (var j = 0; j < n; j++) {
            points.push(new Point(
                center.x + Math.sin(a) * Math.sqrt(Math.pow(r, 2) - Math.pow(z, 2)),
                center.y + Math.cos(a) * Math.sqrt(Math.pow(r, 2) - Math.pow(z, 2)),
                center.z + z));
            a += da;
        }
        z += dz;
    }
    //edges
    for (var i = 0; i < points.length; i++) {
        if (i <= points.length - 1) {
            if (i % n === 0) {
                if (i != 0) {
                    edges.push(new Edge(i - n, i - 1));
                }
            } else {
                edges.push(new Edge(i - 1, i));
            }
        }
        if (i + n <= points.length - 1) {
            edges.push(new Edge(i, i + n))
        }
    }
    edges.push(new Edge(points.length - 1, points.length - n));
    //polygons
    var red = red || 0;
    var green = green || 0;
    var blue = blue || 0;
    for (var i = 0; i < points.length; i++) {
        if (red > 0) { red++; };
        if (blue > 0) { blue++; };
        if (green > 0) { green++; };
        if ((i + 1) % n !== 0) {
            if (points[i] && points[i + 1] && points[i + n + 1] && points[i + n]) {
                polygons.push(new Polygon([i, i + 1, i + n + 1, i + n], { red: red, green: green, blue: blue }));
            }
        } else {
            if (points[i] && points[i + 1 - n] && points[i + 1] && points[i + n]) {
                polygons.push(new Polygon([i, i + 1 - n, i + 1, i + n], { red: red, green: green, blue: blue }));
            }
        }
    }
    return new Figure(points, edges, polygons, center, animation);
}

function ellipsoid(n, xr, yr, zr, color, center) {
    var points = [];
    var edges = [];
    var polygons = [];
    var a = 0;
    var da = Math.PI * 2 / n;
    //points
    for (var z = 0; z < zr; z++) {
        var a = 0;
        for (var j = 0; j < n; j++) {
            points.push(new Point(
                center.x + Math.sin(a) * Math.sqrt(Math.pow(xr, 2) - Math.pow(z, 2)),
                center.y + Math.cos(a) * Math.sqrt(Math.pow(yr, 2) - Math.pow(z, 2)),
                center.z + z));
            (a == Math.PI * 2) ? a = 0 : a += da;
        }
    }
    for (var z = 0; z < zr; z++) {
        var a = 0;
        for (var j = 0; j < n; j++) {
            points.push(new Point(
                center.x + Math.sin(a) * Math.sqrt(Math.pow(xr, 2) - Math.pow(z, 2)),
                center.y + Math.cos(a) * Math.sqrt(Math.pow(yr, 2) - Math.pow(z, 2)),
                center.z - z));
            (a == Math.PI * 2) ? a = 0 : a += da;
        }
    }
    //edges
    for (var i = 0; i < points.length; i++) {
        if (i <= points.length - 1) {
            if (i % n === 0) {
                edges.push(new Edge(i, i + n - 1));
            } else {
                edges.push(new Edge(i - 1, i));
            }
        }
        if (i + n <= points.length - 1) {
            if (Math.floor(i / n) + 1 != z) {
                edges.push(new Edge(i, i + n));
            }
        }
    }
    var red = color.red || 0;
    var green = color.green || 0;
    var blue = color.blue || 0;
    for (var i = 0; i < points.length; i++) {
        if (red > 0) { red++; };
        if (blue > 0) { blue++; };
        if (green > 0) { green++; };
        if ((i + 1) % n !== 0) {
            if (points[i] && points[i + 1] && points[i + n + 1] && points[i + n] && Math.floor(i / n) + 1 != z) {
                polygons.push(new Polygon([i, i + 1, i + n + 1, i + n], { red: red, green: green, blue: blue }));
            }
        } else {
            if (points[i] && points[i + 1 - n] && points[i + 1] && points[i + n] && Math.floor(i / n) + 1 != z) {
                polygons.push(new Polygon([i, i + 1 - n, i + 1, i + n], { red: red, green: green, blue: blue }));
            }
        }
    }
    return new Figure(points, edges, polygons, center);
}

function cylinder(n, xr, yr, z, color, center) {
    var points = [];
    var edges = [];
    var polygons = [];
    var a = 0;
    var da = Math.PI * 2 / n;
    // points
    for (var i = 0; i < z; i++) {
        for (var j = 0; j < n; j++) {
            points.push(new Point(
                center.x + xr * Math.sin(a),
                center.y + yr * Math.cos(a),
                center.z + i));
            a += da;
        }
    }
    // edges
    for (var i = 0; i < points.length; i++) {
        // Паралельные
        if (i <= points.length - 1) {
            if (i % n === 0) {
                edges.push(new Edge(i, i + n - 1));
            } else {
                edges.push(new Edge(i - 1, i));
            }
        }
        // Перпердикулярные
        if (i <= points.length - 1 - n) {
            if (Math.floor(i / n) + 1 != z) {
                edges.push(new Edge(i, i + n));
            }
        }
    }
    // polygons
    var red = color.red || 0;
    var green = color.green || 0;
    var blue = color.blue || 0;
    for (var i = 0; i < points.length; i++) {
        if (red > 0) { red++; };
        if (blue > 0) { blue++; };
        if (green > 0) { green++; };
        if ((i + 1) % n !== 0) {
            if (points[i] && points[i + 1] && points[i + n + 1] && points[i + n]) {
                polygons.push(new Polygon([i, i + 1, i + n + 1, i + n], { red: red, green: green, blue: blue }));
            }
        } else {
            if (points[i] && points[i + 1 - n] && points[i + 1] && points[i + n]) {
                polygons.push(new Polygon([i, i + 1 - n, i + 1, i + n], { red: red, green: green, blue: blue }));
            }
        }
    }
    return new Figure(points, edges, polygons, center);
}

function hyperCylinder(n, xr, yr, z, color, center) {
    var points = [];
    var edges = [];
    var polygons = [];
    var a = -Math.PI / 2;
    var da = Math.PI / n;
    // points
    // Положительная полуось
    for (var i = 0; i < z; i++) {
        a = -Math.PI / 2 + da / 2;
        for (var j = 0; j < n; j++) {
            points.push(new Point(
                center.x + xr * Math.cosh(a),
                center.y + yr * Math.sinh(a),
                center.z + i));
            a += da;
        }
    }
    // Отрицательная полуось
    for (var i = 0; i < z; i++) {
        a = -Math.PI / 2 + da / 2;
        for (var j = 0; j < n; j++) {
            points.push(new Point(
                center.x - xr * Math.cosh(a),
                center.y - yr * Math.sinh(a),
                center.z + i));
            a += da;
        }
    }
    // edges
    for (var i = 0; i < points.length; i++) {
        // Паралельные
        if (i <= points.length - 1) {
            if (i % n !== 0) {
                edges.push(new Edge(i - 1, i));
            }
        }
        // Перпердикулярные
        if (i <= points.length - 1 - n) {
            if (Math.floor(i / n) + 1 != z) {
                edges.push(new Edge(i, i + n));
            }
        }
    }
    // polygons
    var red = color.red || 0;
    var green = color.green || 0;
    var blue = color.blue || 0;
    for (var i = 0; i < points.length; i++) {
        if (red > 0) { red++; };
        if (blue > 0) { blue++; };
        if (green > 0) { green++; };
        if ((i + 1) % n !== 0 && Math.floor(i / n) + 1 != z) {
            if (points[i] && points[i + 1] && points[i + n + 1] && points[i + n]) {
                polygons.push(new Polygon([i, i + 1, i + n + 1, i + n], { red: red, green: green, blue: blue }));
            }
        }
    }
    return new Figure(points, edges, polygons, center);
}

function parabCylinder(n, p, z, color, center) {
    var points = [];
    var edges = [];
    var polygons = [];
    // points
    for (var i = 0; i < z; i++) {
        for (var j = 0; j < n; j++) {
            points.push(new Point(
                center.x + j,
                center.y + j * j / (2 * p),
                center.z + i));
        }
    }
    for (var i = 0; i < z; i++) {
        for (var j = 0; j < n; j++) {
            points.push(new Point(
                center.x - j,
                center.y + j * j / (2 * p),
                center.z + i));
        }
    }
    // edges
    for (var i = 0; i < points.length; i++) {
        // Паралельные
        if (i <= points.length - 1) {
            if (i % n !== 0) {
                edges.push(new Edge(i - 1, i));
            }
        }
        // Перпердикулярные
        if (i <= points.length - 1 - n) {
            if (Math.floor(i / n) + 1 != z) {
                edges.push(new Edge(i, i + n));
            }
        }
    }
    // polygons
    var red = color.red || 0;
    var green = color.green || 0;
    var blue = color.blue || 0;
    for (var i = 0; i < points.length; i++) {
        if (red > 0) { red++; };
        if (blue > 0) { blue++; };
        if (green > 0) { green++; };
        if ((i + 1) % n !== 0 && Math.floor(i / n) + 1 != z) {
            if (points[i] && points[i + 1] && points[i + n + 1] && points[i + n]) {
                polygons.push(new Polygon([i, i + 1, i + n + 1, i + n], { red: red, green: green, blue: blue }));
            }
        }
    }
    return new Figure(points, edges, polygons, center);
}

function hyperParab(left, bottom, width, height, count) {
    var points = [];
    var edges = [];
    var polygons = [];
    var dx = width / count;
    var dy = height / count;
    var x = left;
    var y = bottom;
    //points 
    while (x < width + left) {
        y = bottom;
        while (y < height + bottom) {
            points.push(new Point(x, y, x * x - y * y));
            y += dy;
        }
        x += dx;
    }
    //edges 
    for (var i = 0; i <= points.length; i++) {
        if (i <= points.length - 1) {
            if (i % count === 0) {
            } else {
                edges.push(new Edge(i - 1, i));
            }
        }
        if (i + count <= points.length - 1) {
            edges.push(new Edge(i, i + count))
        }
    }
    //polygons 
    var red = 50;
    for (var i = 0; i < points.length; i++) {
        red += 1;
        if (i % count - (count - 1) !== 0 &&
            points[i + 1] && points[i + count] && points[i + 1 + count]) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], 'rgb(' + red + ',0,0)'));
        }
    }
    return new Figure(points, edges, polygons);
}

function diHyperbol(n, height, xr, yr, zr, color) {
    var points = [];
    var edges = [];
    var f;
    var df = 2 * Math.PI / n;
    var polygons = [];

    // points 
    for (var z = height.h; z <= -zr; z++) {
        f = 0;
        while (1) {
            if (f >= 2 * Math.PI) { break; }
            points.push(new Point(
                Math.sqrt(xr * xr * (z * z / zr / zr - 1)) * Math.cos(f),
                Math.sqrt(yr * yr * (z * z / zr / zr - 1)) * Math.sin(f),
                z));
            f += df;
        }
    }

    for (var z = zr; z <= height.H; z++) {
        f = 0;
        while (1) {
            if (f >= 2 * Math.PI) { break; }
            points.push(new Point(
                Math.sqrt(xr * xr * (z * z / zr / zr - 1)) * Math.cos(f),
                Math.sqrt(yr * yr * (z * z / zr / zr - 1)) * Math.sin(f),
                z));
            f += df;
        }
    }

    //edges 
    for (var i = 0; i < points.length / 2; i++) {
        if (i < points.length / 2 - 1) {
            if (i % n === 0) {
                if (i != 0) {
                    edges.push(new Edge(i - n, i - 1));
                }
            } else {
                edges.push(new Edge(i - 1, i));
            }
        }
        if (i + n <= points.length / 2 - 1) {
            edges.push(new Edge(i, i + n))
        }
    }

    for (var i = points.length / 2; i < points.length; i++) {
        if (i <= points.length - 1) {
            if (i % n === 0) {
                if (i != 0) {
                    edges.push(new Edge(i, i + n - 1));
                }
            } else {
                edges.push(new Edge(i - 1, i));
            }
        }
        if (i + n <= points.length - 1) {
            edges.push(new Edge(i, i + n))
        }
    }

    // polygons
    var red = color.red || 0;
    var green = color.green || 0;
    var blue = color.blue || 0;
    for (var i = 0; i < points.length; i++) {
        if (red > 0) { red++; };
        if (blue > 0) { blue++; };
        if (green > 0) { green++; };
        if ((i + 1) % n !== 0) {
            if (points[i] && points[i + 1] && points[i + n + 1] && points[i + n]) {
                polygons.push(new Polygon([i, i + 1, i + n + 1, i + n], { red: red, green: green, blue: blue }));
            }
        } else {
            if (points[i] && points[i + 1 - n] && points[i + 1] && points[i + n]) {
                polygons.push(new Polygon([i, i + 1 - n, i + 1, i + n], { red: red, green: green, blue: blue }));
            }
        }
    }
    return new Figure(points, edges, polygons);
}

function elepticParab(n, h, xr, yr, color) {
    var points = [];
    var edges = [];
    var f;
    var df = 2 * Math.PI / n;
    var polygons = [];

    //points 
    for (var z = 0; z <= h; z++) {
        f = 0;
        while (1) {
            if (f >= 2 * Math.PI) { break; }
            points.push(new Point(
                Math.sqrt(xr * xr * z) * Math.cos(f),
                Math.sqrt(yr * yr * z) * Math.sin(f),
                z));
            f += df;
        }
    }

    //edges 
    for (var i = 0; i < points.length; i++) {
        if (i <= points.length - 1) {
            if (i % n === 0) {
                if (i != 0) {
                    edges.push(new Edge(i, i + n - 1));
                }
            } else {
                edges.push(new Edge(i - 1, i));
            }
        }
        if (i + n <= points.length - 1) {
            edges.push(new Edge(i, i + n))
        }
    }

    // polygons
    var red = color.red || 0;
    var green = color.green || 0;
    var blue = color.blue || 0;
    for (var i = 0; i < points.length; i++) {
        if (red > 0) { red++; };
        if (blue > 0) { blue++; };
        if (green > 0) { green++; };
        if ((i + 1) % n !== 0) {
            if (points[i] && points[i + 1] && points[i + n + 1] && points[i + n]) {
                polygons.push(new Polygon([i, i + 1, i + n + 1, i + n], { red: red, green: green, blue: blue }));
            }
        } else {
            if (points[i] && points[i + 1 - n] && points[i + 1] && points[i + n]) {
                polygons.push(new Polygon([i, i + 1 - n, i + 1, i + n], { red: red, green: green, blue: blue }));
            }
        }
    }
    return new Figure(points, edges, polygons);
}
