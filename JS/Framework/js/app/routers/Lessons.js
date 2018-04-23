function Lessons() {
    BaseRouter.call(this);

    var supportFunction = new SupportFunction();

    var data = {
        lesson1: {
            name: 'L1. Targets',
            exercises: [
                {
                    name: 'Ex1. Graph 1',
                    input: [{ class: 'input-field', placeholder: 'Input Number!' }],
                    button: [{ class: 'enter-button', value: 'Enter' }],
                    output: [{ class: 'output-field', placeholder: 'Your answer!' }]
                },
                {
                    name: 'Ex2. Graph 2',
                    input: [{ class: 'input-field', placeholder: 'Input Number!' }],
                    button: [{ class: 'enter-button', value: 'Enter' }],
                    output: [{ class: 'output-field', placeholder: 'Your answer!' }]
                },
                {
                    name: 'Ex3. Sqr Aim',
                    input: [{ class: 'input-field', placeholder: 'Input X!' }, { class: 'input-field', placeholder: 'Input Y!' }],
                    button: [{ class: 'enter-button', value: 'Enter' }],
                    output: [{ class: 'output-field', placeholder: 'Your answer!' }]
                },
                {
                    name: 'Ex4. Round Aim',
                    input: [{ class: 'input-field', placeholder: 'Input X!' }, { class: 'input-field', placeholder: 'Input Y!' }],
                    button: [{ class: 'enter-button', value: 'Enter' }],
                    output: [{ class: 'output-field', placeholder: 'Your answer!' }]
                },
                {
                    name: 'Ex5. Broken Round Aim',
                    input: [{ class: 'input-field', placeholder: 'Input X!' }, { class: 'input-field', placeholder: 'Input Y!' }],
                    button: [{ class: 'enter-button', value: 'Enter' }],
                    output: [{ class: 'output-field', placeholder: 'Your answer!' }]
                },
                {
                    name: 'Ex6. Sqr & Round Broken Round Aim',
                    input: [{ class: 'input-field', placeholder: 'Input X!' }, { class: 'input-field', placeholder: 'Input Y!' }],
                    button: [{ class: 'enter-button', value: 'Enter' }],
                    output: [{ class: 'output-field', placeholder: 'Your answer!' }]
                }
            ]
        },
        lesson2: {
            name: 'L2. Quadratic equation',
            exercises: [
                {
                    name: 'Ex1. Sqrt of number',
                    input: [{ class: 'input-field', placeholder: 'Input Number!' }],
                    button: [{ class: 'enter-button', value: 'Enter' }],
                    output: [{ class: 'output-field', placeholder: 'Your answer!' }]
                },
                {
                    name: 'Ex2. Sqr equtation',
                    input: [{ class: 'input-field', placeholder: 'Input First Number' },
                    { class: 'input-field', placeholder: 'Input Second Number' },
                    { class: 'input-field', placeholder: 'Input Third Number' }],
                    button: [{ class: 'enter-button', value: 'Enter' }],
                    output: [{ class: 'output-field', placeholder: 'Your answer!' }]
                }
            ]
        },
        lesson3: {
            name: 'L3. Cycle',
            exercises: [
                {
                    name: 'Ex1. Sum 1',
                    input: [{ class: 'input-field', placeholder: 'Input Number!' }],
                    button: [{ class: 'enter-button', value: 'Enter' }],
                    output: [{ class: 'output-field', placeholder: 'Your answer!' }]
                },
                {
                    name: 'Ex2. Sum 2',
                    input: [{ class: 'input-field', placeholder: 'Input Number!' }],
                    button: [{ class: 'enter-button', value: 'Enter' }],
                    output: [{ class: 'output-field', placeholder: 'Your answer!' }]
                },
                {
                    name: 'Ex3. Sum 3',
                    input: [{ class: 'input-field', placeholder: 'Input Number!' }],
                    button: [{ class: 'enter-button', value: 'Enter' }],
                    output: [{ class: 'output-field', placeholder: 'Your answer!' }]
                },
                {
                    name: 'Ex4. Product 1',
                    input: [{ class: 'input-field', placeholder: 'Input Number!' }],
                    button: [{ class: 'enter-button', value: 'Enter' }],
                    output: [{ class: 'output-field', placeholder: 'Your answer!' }]
                },
                {
                    name: 'Ex5. Product 2',
                    input: [{ class: 'input-field', placeholder: 'Input Number!' }],
                    button: [{ class: 'enter-button', value: 'Enter' }],
                    output: [{ class: 'output-field', placeholder: 'Your answer!' }]
                },
                {
                    name: 'Ex6. Product 3',
                    input: [{ class: 'input-field', placeholder: 'Input Number!' }],
                    button: [{ class: 'enter-button', value: 'Enter' }],
                    output: [{ class: 'output-field', placeholder: 'Your answer!' }]
                },
            ]
        }
    };

    var self = this;

    this.eventHandler = function () {
        supportFunction.MenuButton.eventHandler(self);

        document.getElementById('lesson_field').innerHTML = supportFunction.LessonTemplate.template.common(data.lesson1);
        supportFunction.LessonTemplate.eventHandler.lesson1();

        document.getElementById('lesson_select').addEventListener('change', function (event) {
            if (supportFunction.LessonTemplate.eventHandler[event.target.value]) {
                var temp = supportFunction.LessonTemplate;
                document.getElementById('lesson_field').innerHTML = temp.template.common(data[event.target.value]);
                temp.eventHandler[event.target.value]();
            }
        })

    }

    this.eventRemove = function () {
        supportFunction.MenuButton.eventRemove();
    }

    this.render = function () {
        return supportFunction.MenuButton.template('Main Menu') + '</br>' +
            '<select id="lesson_select">' +
                '<option value="lesson1">L1. Targets</option>' +
                '<option value="lesson2">L2. Quadratic equation</option>' +
                '<option value="lesson3">L3. Cycle</option>' +
            '</select>' +
            '<div id="lesson_field"></div>';
    }
}