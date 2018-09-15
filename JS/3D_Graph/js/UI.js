function UI(options) {
    options = (options instanceof Object) ? options : {};

    var callback = (options instanceof Object) ? options.callback : {};
    var keyDown = (callback.keyDown instanceof Function) ? callback.keyDown : function () { };
    var showPoints = (callback.showPoints instanceof Function) ? callback.showPoints : function () { };
    var showEdges = (callback.showEdges instanceof Function) ? callback.showEdges : function () { };
    var showPolygons = (callback.showPolygons instanceof Function) ? callback.showPolygons : function () { };
	
    var setFigureCallback = (callback.setFigure instanceof Function) ? callback.setFigure : function () { };

    var checkBox_Point = document.getElementById('show-points-checkbox'),
        checkBox_Edge = document.getElementById('show-edges-checkbox'),
        checkBox_Poly = document.getElementById('show-polygons-checkbox'),
        label_FPS = document.getElementById('FPS-counter-label');
	var input = document.getElementsByClassName('input-js');

	var count = 0;
    var pointsCount = 10,
        red = 0,
        green = 0,
        blue = 0;
    var position = { x: 0, y: 0, z: 0 },
        radius = { xr: 5, yr: 5, zr: 5 },
		degree = 5,
		width = 10,
        height = {h: -10, H: 10};
	var universal = {A: 0, B: 0, C: 0, F: 0, G: 0, H: 0, P: 0, Q: 0, R: 0, D: 0};
	var area = {x0: -5, y0: -5, z0: -5, xn: 5, yn: 5, zn: 5};
	
    this.showFPS = function (fps) {
        label_FPS.innerHTML = 'FPS: ' + fps;
    }
	
    function printFigure() {
        setFigureCallback(
            count,
            {
                pointsCount: pointsCount,
                color: { red: red, green: green, blue: blue },
                position: position,
                radius: radius,
                height: height,
				width: width,
				degree: degree,
				universal: {
					A: position.x, 
					B: position.y, 
					C: position.z, 
					F: radius.xr, 
					G: radius.yr, 
					H: radius.zr, 
					P: width, 
					Q: height.h, 
					R: height.H, 
					D: degree
				},
				area: area
            });
    }
	
	function inputDisabled() {
        for (var i = 0; i < input.length; i++) {
            input[i].setAttribute('disabled', '1');
            input[i].value = '';
        }
    };

    function eventHandler() {
		
		var mode = {
			1: function() {
				inputDisabled();
				for (var i = 0; i < input.length; i++) {
					input[i].removeAttribute('disabled');
				}
			},
			2: function() {
				inputDisabled();
				for (var i = 0; i < 4; i++) {
					input[i].removeAttribute('disabled');
				}
			},
			3: function() {
				inputDisabled();
				for (var i = 0; i < 6; i++) {
					input[i].removeAttribute('disabled');
				}
			},
			4: function() {
				inputDisabled();
				for (var i = 0; i < 6; i++) {
					input[i].removeAttribute('disabled');
				}
				input[7].removeAttribute('disabled');
				input[8].removeAttribute('disabled');
			},
			5: function() {
				inputDisabled();
				for (var i = 0; i < 5; i++) {
					input[i].removeAttribute('disabled');
				}
				input[7].removeAttribute('disabled');
			},
			6: function() {
				inputDisabled();
				for (var i = 0; i < 5; i++) {
					input[i].removeAttribute('disabled');
				}
				input[7].removeAttribute('disabled');
			},
			7: function() {
				inputDisabled();
				for (var i = 0; i < 3; i++) {
					input[i].removeAttribute('disabled');
				}
				input[7].removeAttribute('disabled');
				input[input.length - 1].removeAttribute('disabled');
			},
			8: function() {
				inputDisabled();
				for (var i = 0; i < 6; i++) {
					input[i].removeAttribute('disabled');
				}
				input[7].removeAttribute('disabled');
			},
			9: function() {
				inputDisabled();
				for (var i = 0; i < 6; i++) {
					input[i].removeAttribute('disabled');
				}
				input[7].removeAttribute('disabled');
				input[8].removeAttribute('disabled');
			},
			10: function() {
				inputDisabled();
				for (var i = 0; i < 3; i++) {
					input[i].removeAttribute('disabled');
				}
				input[7].removeAttribute('disabled');
				input[6].removeAttribute('disabled');
			},
			11: function() {
				inputDisabled();
				for (var i = 0; i < 5; i++) {
					input[i].removeAttribute('disabled');
				}
				input[7].removeAttribute('disabled');
            }
		}
		
		// checkboxes
        document.addEventListener('keydown', keyDown);
        checkBox_Point.addEventListener('change', function () { showPoints(checkBox_Point.checked) });
        checkBox_Edge.addEventListener('change', function () { showEdges(checkBox_Edge.checked) });
        checkBox_Poly.addEventListener('change', function () { showPolygons(checkBox_Poly.checked) });
		
		// inputs
		document.getElementById('inputA').addEventListener('keyup', function () {
			position.x = this.value - 0;
			printFigure();
		});
		
		document.getElementById('inputB').addEventListener('keyup', function () {
			position.y = this.value - 0;
			printFigure();
		});
		
		document.getElementById('inputC').addEventListener('keyup', function () {
			position.z = this.value - 0;
			printFigure();
		});
		
		document.getElementById('inputF').addEventListener('keyup', function () {
			radius.xr = this.value - 0;
			printFigure();
		});
		
		document.getElementById('inputG').addEventListener('keyup', function () {
			radius.yr = this.value - 0;
			printFigure();
		});
		
		document.getElementById('inputH').addEventListener('keyup', function () {
			radius.zr = this.value - 0;
			printFigure();
		});
		
		document.getElementById('inputP').addEventListener('keyup', function () {
			width = this.value - 0;
			printFigure();
		});
		
		document.getElementById('inputQ').addEventListener('keyup', function () {
			height.h = this.value - 0;
			printFigure();
		});
		
		document.getElementById('inputR').addEventListener('keyup', function () {
			height.H = this.value - 0;
			printFigure();
		});
		
		document.getElementById('inputD').addEventListener('keyup', function () {
			degree = this.value - 0;
			printFigure();
		});
		
		// ranges
		document.getElementById('set-points-count').addEventListener('input', function () {
            pointsCount = this.value - 0;
            printFigure();
        });
        
        document.getElementById('set-color-red').addEventListener('input', function () {
            red = this.value - 0;
            printFigure();
        });

        document.getElementById('set-color-green').addEventListener('input', function () {
            green = this.value - 0;
            printFigure();
        });

        document.getElementById('set-color-blue').addEventListener('input', function () {
            blue = this.value - 0;
            printFigure();
        });

		// selector
        document.getElementById('select-figure').addEventListener('change', function () {
            count = this.value - 0;
            if (mode[count] instanceof Function) {
                mode[count]();
                printFigure();
            }
        });
    }

    function init() {
        eventHandler();
    };
    init();
}