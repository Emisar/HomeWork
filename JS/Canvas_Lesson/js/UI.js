function UI(options) {
    options = (options instanceof Object) ? options : {};
    
    var callbacks = (options.callbacks instanceof Object) ? options.callbacks : {};
    var inputFuncCallback = (callbacks.inputFunc instanceof Function) ? callbacks.inputFunc : function () { };
    var inputColorCallback = (callbacks.inputColor instanceof Function) ? callbacks.inputColor : function () { };
    var inputSizeCallback = (callbacks.inputSize instanceof Function) ? callbacks.inputSize : function () { };
    var addFuncCallback = (callbacks.addFunc instanceof Function) ? callbacks.addFunc : function () { };
    var remFuncCallback = (callbacks.remFunc instanceof Function) ? callbacks.remFunc : function () { };
    var selectFuncCallback = (callbacks.selectFunc instanceof Function) ? callbacks.selectFunc : function () { };
    var setSizePolyCallBack = (callbacks.setSizePoly instanceof Function) ? callbacks.setSizePoly : function () { };
    var showOXYCallBack = (callbacks.showOXY instanceof Function) ? callbacks.showOXY : function () { };
    var showSquareCallBack = (callbacks.showSquare instanceof Function) ? callbacks.showSquare : function () { };

    var funcCnt = 0;
    var checkCnt = 0;

    function cos(x) { return Math.cos(x); }
    function sin(x) { return Math.sin(x); }
    function tg(x) { return Math.tan(x); }
    function ctg(x) { return 1 / Math.tan(x); }

    function setSizePolygon(left, right) {
        if (!isNaN(left) && !isNaN(right)) {
            (left) ? left = left : left = 0;
            (right) ? right = right : right = 0;
            setSizePolyCallBack(left, right);
        }
    }

    function addFunction() {

        addFuncCallback(funcCnt);

        var checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');

        var input = document.createElement('input');
        input.setAttribute('placeholder', 'function');

        var size = document.createElement('input');
        size.setAttribute('placeholder', 'size');

        var color = document.createElement('input');
        color.setAttribute('placeholder', 'color');

        var remButton = document.createElement('input');
        remButton.setAttribute('type', 'button');
        remButton.setAttribute('value', 'remove function');

        var div = document.createElement('div');
        div.appendChild(checkbox);
        div.appendChild(input);
        div.appendChild(size);
        div.appendChild(color);
        div.appendChild(remButton);
        document.querySelector('body').appendChild(div);

        (function (funcCnt) {
            checkbox.addEventListener('change', function () {
                selectFunction(checkbox, funcCnt);
            });
            input.addEventListener('keyup', function () {
                setFunction(input.value, funcCnt);
            });
            size.addEventListener('keyup', function () {
                setSize(size.value, funcCnt);
            });
            color.addEventListener('keyup', function () {
                setColor(color.value, funcCnt);
            });
            remButton.addEventListener('click', function () {
                removeFunction(div, funcCnt);
                checkbox.checked = false;
                selectFunction(checkbox, funcCnt);
            });
        })(funcCnt);
        funcCnt++;
    }

    function selectFunction(elem, num) {
        if (elem.checked) {
            if (checkCnt != 2) {
                selectFuncCallback(num, elem.checked);
                checkCnt++;
            } else {
                elem.checked = false;
                alert('Two functions are selected already!');
            }
        } else {
            selectFuncCallback(num, elem.checked);
            checkCnt--;
        }
    }

    function removeFunction(elem, num) {
        remFuncCallback(num);
        elem.remove();
    }

    function setFunction(value, num) {
        var f;
        try {
            eval('f = function (x) { return ' + value + ' };');
        } catch (e) {
            f = function () { return 0 };
        }
        inputFuncCallback(f, num);
    }

    function setColor(value, num) {
        var c;
        try {
            eval('c = \'' + value + '\';');
        } catch (e) {
            c = 'black';
        }
        inputColorCallback(c, num);
    }

    function setSize(value, num) {
        var s;
        try {
            eval('s = ' + value);
        } catch (e) {
            s = 1;
        }
        inputSizeCallback(s, num);
    }

    this.square = function (num) {
        document.getElementById('outputSquare').value = num;
    }

    function init() {

        var checkBoxOXY = document.createElement('input');
        checkBoxOXY.setAttribute('type', 'checkbox');
        checkBoxOXY.checked = true;

        var spanShowOXY = document.createElement('span');
        spanShowOXY.innerHTML = 'Show OXY';
        
        var checkBoxSquare = document.createElement('input');
        checkBoxSquare.setAttribute('type', 'checkbox');

        var spanShowSquare = document.createElement('span');
        spanShowSquare.innerHTML = 'Show Square';

        var div = document.createElement('div');
        div.appendChild(checkBoxOXY);
        div.appendChild(spanShowOXY);
        div.appendChild(checkBoxSquare);
        div.appendChild(spanShowSquare);

        document.querySelector('body').appendChild(div);

        var spanSquare = document.createElement('span');
        spanSquare.innerHTML = 'Square = ';

        var outputSquare = document.createElement('input');
        outputSquare.setAttribute('disabled', true);
        outputSquare.setAttribute('id', 'outputSquare');

        var div = document.createElement('div');
        div.appendChild(spanSquare);
        div.appendChild(outputSquare);

        document.querySelector('body').appendChild(div);

        var addButton = document.createElement('input');
        addButton.setAttribute('type', 'button');
        addButton.setAttribute('value', 'add function');

        var inputA = document.createElement('input');
        inputA.setAttribute('placeholder', 'A');

        var inputB = document.createElement('input');
        inputB.setAttribute('placeholder', 'B');

        var div = document.createElement('div');
        div.appendChild(inputA);
        div.appendChild(inputB);
        div.appendChild(addButton);

        document.querySelector('body').appendChild(div);

        addButton.addEventListener('click', addFunction);
        inputA.addEventListener('keyup', function () {
            setSizePolygon(inputA.value - 0, inputB.value - 0);
        });
        inputB.addEventListener('keyup', function () {
            setSizePolygon(inputA.value - 0, inputB.value - 0);
        });
        checkBoxOXY.addEventListener('change', function () {
            showOXYCallBack(checkBoxOXY.checked);
        });
        checkBoxSquare.addEventListener('change', function () {
            showSquareCallBack(checkBoxSquare.checked);
        });
    }
    init();
}