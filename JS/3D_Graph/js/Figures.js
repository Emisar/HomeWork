function All(n, area, A, B, C, F, G, H, P, Q, R, D) {
    A = (isNaN(A)) ? 0 : A;
    B = (isNaN(B)) ? 0 : B;
    C = (isNaN(C)) ? 0 : C;
    F = (isNaN(F)) ? 0 : F;
    G = (isNaN(G)) ? 0 : G;
    H = (isNaN(H)) ? 0 : H;
    P = (isNaN(P)) ? 0 : P;
    Q = (isNaN(Q)) ? 0 : Q;
    R = (isNaN(R)) ? 0 : R;
    D = (isNaN(D)) ? 0 : D;
    var points = [];
    var edges = [];
    var polygons = [];
    // Ax2+By2+Cz2+2Fyz+2Gzx+2Hxy+2Px+2Qy+2Rz+D=0
    // fixed z, y
    var x, y, z;
    var dx, dy, dz;
    dz = (area.zn - area.z0) / n;
    dy = (area.yn - area.y0) / n;
    dx = (area.xn - area.x0) / n;
    x = area.x0;
    y = area.y0;
    z = area.z0;
    function addNPointsX() {
        x = area.x0;
        while (1) {
            if (x > area.xn) { break; }
            points.push(new Point(x, y, z));
            x += dx;
        }
    }

    function addNPointsY() {
        y = area.y0;
        while (1) {
            if (y > area.yn) { break; }
            points.push(new Point(x, y, z));
            y += dy;
        }
    }

    function addNPointsZ() {
        z = area.z0;
        while (1) {
            if (z > area.zn) { break; }
            points.push(new Point(x, y, z));
            z += dz;
        }
    }

    /***********/
    /* z->y->x */
    /***********/

    z = area.z0;
    while (1) {
        if (z > area.zn) { break; }
        y = area.y0;
        while (1) {
            if (y > area.yn) { break; }
            if (A !== 0) { // square function
                var As = A;
                var Bs = 2 * (G * z + H * y + P);
                var Cs = B * y * y + C * z * z + 2 * F * y * z + 2 * Q * y + 2 * R * z + D;
                // A*x^2 + Bx + C = 0
                // calcuate x1 and x2
                var Discr = Bs * Bs - 4 * As * Cs;
                if (Discr >= 0) {
                    x1 = (-Bs + Math.sqrt(Discr)) / (2 * As);
                    x2 = (-Bs - Math.sqrt(Discr)) / (2 * As);
                    points.push(new Point(x1, y, z));
                    points.push(new Point(x2, y, z));
                }
            } else if (G !== 0 || H !== 0 || P !== 0) { // line function
                var Bs = 2 * (G * z + H * y + P);
                var Cs = B * y * y + C * z * z + 2 * F * y * z + 2 * Q * y + 2 * R * z + D;
                // Bx + C = 0
                // calcuate x
                if (Bs !== 0) {
                    x = -Cs / Bs;
                    points.push(new Point(x, y, z));
                } else if (Cs === 0) {
                    addNPointsX(); // set n x points
                }
            } else if (B * y * y + C * z * z + 2 * F * y * z + 2 * Q * y + 2 * R * z + D === 0) { // const
                addNPointsX(); // set n x points
            }
            y += dy;
        }
        z += dz;
    }

    /***********/
    /* x->z->y */
    /***********/

    x = area.x0;
    while (1) {
        if (x > area.xn) { break; }
        z = area.z0;
        while (1) {
            if (z > area.zn) { break; }
            if (B !== 0) { // square function                
                var As = B;
                var Bs = 2 * (F * z + H * x + Q);
                var Cs = A * x * x + C * z * z + 2 * G * z * x + 2 * P * x + 2 * R * z + D;
                // A*y^2 + By + C = 0
                // calcuate x1 and x2
                var Discr = Bs * Bs - 4 * As * Cs;
                if (Discr >= 0) {
                    y1 = (-Bs + Math.sqrt(Discr)) / (2 * As);
                    y2 = (-Bs - Math.sqrt(Discr)) / (2 * As);
                    points.push(new Point(x, y1, z));
                    points.push(new Point(x, y2, z));
                }
            } else if (F !== 0 || H !== 0 || Q !== 0) { // line function
                var Bs = 2 * (F * z + H * x + Q);
                var Cs = A * x * x + C * z * z + 2 * G * z * x + 2 * P * x + 2 * R * z + D;
                // By + C = 0
                // calcuate x
                if (Bs !== 0) {
                    y = -Cs / Bs;
                    points.push(new Point(x, y, z));
                } else if (Cs === 0) {
                    addNPointsY(); // set n y points
                }
            } else if (A * x * x + C * z * z + 2 * G * z * x + 2 * P * x + 2 * R * z + D === 0) { // const
                addNPointsY(); // set n y points
            }
            z += dz;
        }
        x += dx;
    }

    /***********/
    /* y->x->z */
    /***********/

    y = area.y0;
    while (1) {
        if (y > area.yn) { break; }
        x = area.x0;
        while (1) {
            if (x > area.xn) { break; }
            if (B !== 0) { // square function                
                var As = C;
                var Bs = 2 * (F * y + G * x + R);
                var Cs = A * x * x + B * y * y + 2 * H * x * y + 2 * P * x + 2 * Q * y + D;
                // A*z^2 + Bz + C = 0
                // calcuate x1 and x2
                var Discr = Bs * Bs - 4 * As * Cs;
                if (Discr >= 0) {
                    z1 = (-Bs + Math.sqrt(Discr)) / (2 * As);
                    z2 = (-Bs - Math.sqrt(Discr)) / (2 * As);
                    points.push(new Point(x, y, z1));
                    points.push(new Point(x, y, z2));
                }
            } else if (F !== 0 || G !== 0 || R !== 0) { // line function
                var Bs = 2 * (F * y + G * x + R);;
                var Cs = A * x * x + B * y * y + 2 * H * x * y + 2 * P * x + 2 * Q * y + D;
                // Byz+ C = 0
                // calcuate x
                if (Bs !== 0) {
                    z = -Cs / Bs;
                    points.push(new Point(x, y, z));
                } else if (Cs === 0) {
                    addNPointsZ(); // set n y points
                }
            } else if (A * x * x + B * y * y + 2 * H * x * y + 2 * P * x + 2 * Q * y + D === 0) { // const
                addNPointsZ(); // set n y points
            }
            x += dx;
        }
        y += dy;
    }
    return new Figure(points, edges, polygons);
};

function cube(n, center, color) {
    var red = color.red || 0;
    var green = color.green || 0;
    var blue = color.blue || 0;
    return new Figure([
        new Point(center.x + n, center.y + n, center.z + n),
        new Point(center.x + n, center.y + n, center.z - n),
        new Point(center.x + n, center.y - n, center.z + n),
        new Point(center.x + n, center.y - n, center.z - n),
        new Point(center.x - n, center.y + n, center.z + n),
        new Point(center.x - n, center.y + n, center.z - n),
        new Point(center.x - n, center.y - n, center.z + n),
        new Point(center.x - n, center.y - n, center.z - n),
    ], [
            new Edge(0, 1), new Edge(1, 5), new Edge(5, 4), new Edge(4, 0),
            new Edge(2, 3), new Edge(3, 7), new Edge(7, 6), new Edge(6, 2),
            new Edge(0, 1), new Edge(1, 3), new Edge(3, 2), new Edge(2, 0),
            new Edge(5, 4), new Edge(4, 6), new Edge(6, 7), new Edge(7, 5)
        ], [
        /*
        new Polygon([0, 1, 3, 2], { red: red, green: green, blue: blue }),
        new Polygon([2, 3, 7, 6], { red: red, green: green, blue: blue }),
        new Polygon([0, 1, 5, 4], { red: red, green: green, blue: blue }),
        new Polygon([0, 4, 6, 2], { red: red, green: green, blue: blue }),
        new Polygon([1, 3, 7, 5], { red: red, green: green, blue: blue }),
        new Polygon([5, 4, 6, 7], { red: red, green: green, blue: blue })
        */
    ]);
};

function sphere(n, r, center, color, animation) {
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
    var red = color.red || 0;
    var green = color.green || 0;
    var blue = color.blue || 0;
    for (var i = 0; i < points.length; i++) {
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
};

function ellipsoid(n, xr, yr, zr, center, color) {
    var points = [];
    var edges = [];
    var polygons = [];
	
    //points
	const ni = Math.trunc(n / 2);
    for (var i = 0; i <= ni; i++) {
		var u = Math.PI * i / ni;
        var z = center.z + zr * Math.cos(u);
        for (var j = 0; j < n; j++) {
			var v = 2 * Math.PI * j / ni;
            points.push(new Point(
                center.x + xr * Math.sin(u) * Math.sin(v),
                center.y + yr * Math.sin(u) * Math.cos(v),
                z));
        }
    }
	
    //edges
    for (var i = 0; i < points.length; i++) {
		if (i > 0) {
			if (i % n != 0) {
                edges.push(new Edge(i - 1, i));
			} else {
                edges.push(new Edge(i - n, i - 1));
            }
		}
		if (i >= n) {
			edges.push(new Edge(i - n, i));
		}
    }
	
	//polygons
    var red = color.red || 0;
    var green = color.green || 0;
    var blue = color.blue || 0;
    for (var i = 0; i < points.length; i++) {
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
};

function conus(n, height, xr, yr, zr, center, color) {
    var points = [];
    var edges = [];
    var f;
    var df = 2 * Math.PI / n;
    var polygons = [];

    //points
    for (var z = height.h; z <= height.H; z++) {
        f = 0;
        while (1) {
            if (f >= 2 * Math.PI) { break; }
            points.push(new Point(
                center.x + Math.sqrt(xr * xr * z * z / zr / zr) * Math.cos(f),
                center.y + Math.sqrt(yr * yr * z * z / zr / zr) * Math.sin(f),
                center.z + z));
            f += df;
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
            edges.push(new Edge(i, i + n))
        }
    }

    // polygons
    var red = color.red || 0;
    var green = color.green || 0;
    var blue = color.blue || 0;
    for (var i = 0; i < points.length; i++) {
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
};

function cylinder(n, xr, yr, z, center, color) {
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
        // ѕаралельные
        if (i <= points.length - 1) {
            if (i % n === 0) {
                edges.push(new Edge(i, i + n - 1));
            } else {
                edges.push(new Edge(i - 1, i));
            }
        }
        // ѕерпердикул€рные
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
};

function hyperCylinder(n, xr, yr, z, center, color) {
    var points = [];
    var edges = [];
    var polygons = [];
    var a = -Math.PI / 2;
    var da = Math.PI / n;
    // points
    // ѕоложительна€ полуось
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
    // ќтрицательна€ полуось
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
        // ѕаралельные
        if (i <= points.length - 1) {
            if (i % n !== 0) {
                edges.push(new Edge(i - 1, i));
            }
        }
        // ѕерпердикул€рные
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
        if ((i + 1) % n !== 0 && Math.floor(i / n) + 1 != z) {
            if (points[i] && points[i + 1] && points[i + n + 1] && points[i + n]) {
                polygons.push(new Polygon([i, i + 1, i + n + 1, i + n], { red: red, green: green, blue: blue }));
            }
        }
    }
    return new Figure(points, edges, polygons, center);
};

function parabCylinder(n, p, z, center, color) {
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
        if ((i + 1) % n !== 0 && Math.floor(i / n) + 1 != z) {
            if (points[i] && points[i + 1] && points[i + n + 1] && points[i + n]) {
                polygons.push(new Polygon([i, i + 1, i + n + 1, i + n], { red: red, green: green, blue: blue }));
            }
        }
    }
    return new Figure(points, edges, polygons, center);
};

function hyperboloid(n, h, xr, yr, zr, center, color) {
    var points = [];
    var edges = [];
    var f;
    var df = 2 * Math.PI / n;
    var polygons = [];
    for (var z = -h; z <= h; z++) {
        f = 0;
        while (1) {
            if (f >= 2 * Math.PI) { break; }
            points.push(new Point(
                center.x + Math.sqrt(xr * xr * (z * z / zr / zr + 1)) * Math.cos(f),
                center.y + Math.sqrt(yr * yr * (z * z / zr / zr + 1)) * Math.sin(f),
                center.z + z));
            f += df;
        }
    };

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
};

function twoCavityHyperbol(n, height, xr, yr, zr, center, color) {
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
                center.x + Math.sqrt(xr * xr * (z * z / zr / zr - 1)) * Math.cos(f),
                center.y + Math.sqrt(yr * yr * (z * z / zr / zr - 1)) * Math.sin(f),
                center.z + z));
            f += df;
        }
    }

    for (var z = zr; z <= height.H; z++) {
        f = 0;
        while (1) {
            if (f >= 2 * Math.PI) { break; }
            points.push(new Point(
                center.x + Math.sqrt(xr * xr * (z * z / zr / zr - 1)) * Math.cos(f),
                center.y + Math.sqrt(yr * yr * (z * z / zr / zr - 1)) * Math.sin(f),
                center.z + z));
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
};

function hyperParaboloid(count, left, bottom, width, height, center, color) {
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
            points.push(new Point(center.x + x, center.y + y, center.z + x * x - y * y));
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
    var red = color.red || 0;
    var green = color.green || 0;
    var blue = color.blue || 0;
    for (var i = 0; i < points.length; i++) {
        red += 1;
        if (i % count - (count - 1) !== 0 &&
            points[i + 1] && points[i + count] && points[i + 1 + count]) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], { red: red, green: green, blue: blue }));
        }
    }
    return new Figure(points, edges, polygons);
};

function elepticParab(n, h, xr, yr, center, color) {
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
                center.x + Math.sqrt(xr * xr * z) * Math.cos(f),
                center.y + Math.sqrt(yr * yr * z) * Math.sin(f),
                center.z + z));
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
};