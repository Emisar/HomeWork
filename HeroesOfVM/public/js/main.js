$(document).ready(async () => {
    const server = new Server();
    const user  = new User({ id: '#user', server, callbacks: { loginSuccess, logoutSuccess: startPoint } });
    const offer = new Offer({ id: '#offer', server, callbacks: { findGameSuccess } });
    const game  = new Game({ id: '#game', server, callbacks: {} });

    function findGameSuccess() {
        user.hide();
        game.show();
        offer.hide();
        game.init();
    }

    function loginSuccess() {
        user.hide();
        game.hide();
        $("header").slideToggle(600);
        offer.show();
    }

    // logout тоже
    function startPoint() {
        $("header").show();
        user.show();
        game.hide();
        offer.hide();
        game.deinit();
    }

    // start point
    startPoint();
});