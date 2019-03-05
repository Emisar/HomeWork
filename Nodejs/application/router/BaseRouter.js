class BaseRouter {

    constructor () {
        this.ERRORS = {
            101: 'Userlist is empty',
            322: 'Registration fail',
            323: 'Login fail',
            324: 'Logout fail',
            404: 'Error 404! Page not found!',
            9000: 'Unknown error'
        };
    }

    good(data) {
        return { result: 'ok', data: data };
    }

    error(code) {
        code = (this.ERRORS[code]) ? code : 9000;
        return { result: 'error', error: { code, text: this.ERRORS[code] } };
    }
}
module.exports = BaseRouter;