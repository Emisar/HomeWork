$(document).ready(async () => {
    const server = new Server();
    const user = new User({ id: '#user', server, callbacks: { loginSuccess, logoutSuccess } });
    const game = new Game({ id: '#game', server, callbacks: {} });

    function loginSuccess() {
        user.hide();
        game.show();
    }

    function logoutSuccess() {
        user.show();
        game.hide();
    }

    // start point
    user.show();
    game.hide();
});