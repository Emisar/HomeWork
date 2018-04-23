function Calculators() {
    BaseRouter.call(this);

    var supportFunction = new SupportFunction();

    var data = {
        classic: {
            name: 'Classic Calculator',
            input: [{ class: 'input-field', placeholder: 'First number' }, { class: 'input-field', placeholder: 'Second number' }],
            select: { class: 'selector', option: ['+', '-', '*', '/'] },
            button: { class: 'enter-button', value: 'Enter' },
            output: { class: 'output-field', placeholder: 'Your answer' }
        },
        complex: {
            name: 'Complex Calculator',
            input: [[{ class: 'input-field', placeholder: 'Re number' }, { class: 'input-field', placeholder: 'Im number' }],
            [{ class: 'input-field', placeholder: 'Re number' }, { class: 'input-field', placeholder: 'Im number' }]],
            select: { class: 'selector', option: ['+', '-', '*', '/'] },
            button: { class: 'enter-button', value: 'Enter' },
            output: [{ class: 'output-field', placeholder: 'Re number' }, { class: 'output-field', placeholder: 'Im number' }]
        },
        matrix: {
            name: 'Matrix Calculator',
            field: { class: 'matrix-field' },
            input: [{ class: 'input-field', placeholder: 'Enter number' }, { class: 'matrix-elem' }],
            select: { class: 'selector', option: ['+', '-', '*'] },
            button: { class: 'enter-button', value: 'Enter' },
            output: { class: 'matrix-elem' }
        },
        matrixComplex: {
            name: 'Matrix-Complex Calculator',
            field: { class: 'matrix-field' },
            input: [{ class: 'input-field', placeholder: 'Enter number' }, { class: 'matrix-elem' }],
            select: { class: 'selector', option: ['+', '-', '*'] },
            button: { class: 'enter-button', value: 'Enter' },
            output: { class: 'matrix-elem' }
        }
    }

    var self = this;

    this.eventHandler = function () {
        supportFunction.MenuButton.eventHandler(self);

        document.getElementById('calc_field').innerHTML = supportFunction.CalculatorTemplate.classic.template(data.classic);
        supportFunction.CalculatorTemplate.classic.eventHandler();

        document.getElementById('calc_select').addEventListener('change', function (event) {
            if (supportFunction.CalculatorTemplate[event.target.value]) {
                var temp = supportFunction.CalculatorTemplate[event.target.value];
                document.getElementById('calc_field').innerHTML = temp.template(data[event.target.value]);
                temp.eventHandler(data[event.target.value]);
            }
        })
    }

    this.eventRemove = function () {
        supportFunction.MenuButton.eventRemove();
    }

    this.render = function () {
        return supportFunction.MenuButton.template('Main Menu') + '</br>' +
            '<select id="calc_select">' +
            '<option value="classic">Classic Calculator</option>' +
            '<option value="complex">Complex Calcuator</option>' +
            '<option value="matrix">Matrix Calcuator</option>' +
            '<option value="matrixComplex">Matrix-Complex Calcuator</option>' +
            '</select>' +
            '<div id="calc_field"></div>';
    }
}