function User(callbacks) {

    const authCallback = callbacks.authCallback;

    this.auth = () => {
        authCallback('vasya', '123');
    }

}