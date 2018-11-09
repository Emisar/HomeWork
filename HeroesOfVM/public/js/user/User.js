<<<<<<< HEAD
function User(options) {
    var options = (options instanceof Object) ? options : {};
    const DOM_ID = options.id;
    const server = options.server;
    const callbacks = options.callbacks;

    const loginSuccess  = (callbacks.loginSuccess instanceof  Function ) ? callbacks.loginSuccess  : function() {};
    const logoutSuccess = (callbacks.logoutSuccess instanceof  Function) ? callbacks.logoutSuccess : function() {};

    let name;

    this.show = () => $(DOM_ID).show();
    this.hide = () => $(DOM_ID).hide();

    function init() {
        $('#auth').on('click', async () => {
            const login = $('#login').val();
            const password = $('#password').val();
            if (login && password) {
                name = await server.login(login, password);
                if (name) {
                    $('#login').val('');
                    $('#password').val('');
                    loginSuccess();
                } else {
                    alert('Ошибка авторизации!');
                }
            } else {
                alert('Введите логин/пароль!');
            }
        });

        $('.logout').on('click', async () => {
            const result = await server.logout();
            if (result.result) {
                logoutSuccess();
            }
        });
    }
    init();
=======
function User(options) {
    var options = (options instanceof Object) ? options : {};
    const DOM_ID = options.id;
    const server = options.server;
    const callbacks = options.callbacks;

    const loginSuccess  = (callbacks.loginSuccess instanceof  Function ) ? callbacks.loginSuccess  : function() {};
    const logoutSuccess = (callbacks.logoutSuccess instanceof  Function) ? callbacks.logoutSuccess : function() {};

    let name;

    this.show = () => $(DOM_ID).show();
    this.hide = () => $(DOM_ID).hide();

    function init() {
        $('#auth').on('click', async () => {
            const login = $('#login').val();
            const password = $('#password').val();
            if (login && password) {
                name = await server.login(login, password);
                if (name) {
                    $('#login').val('');
                    $('#password').val('');
                    loginSuccess();
                } else {
                    alert('Ошибка авторизации!');
                }
            } else {
                alert('Введите логин/пароль!');
            }
        });

        $('.logout').on('click', async () => {
            const result = await server.logout();
            if (result.result) {
                logoutSuccess();
            }
        });
    }
    init();
>>>>>>> 902057eec6ed81af815787194765c3b7346308b6
}