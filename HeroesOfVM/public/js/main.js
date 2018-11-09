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
<<<<<<< HEAD
        $("header").slideToggle(400);
=======
>>>>>>> 902057eec6ed81af815787194765c3b7346308b6
        offer.show();
    }

    // logout тоже
    function startPoint() {
<<<<<<< HEAD
        $("header").show();
=======
>>>>>>> 902057eec6ed81af815787194765c3b7346308b6
        user.show();
        game.hide();
        offer.hide();
        game.deinit();
    }

    // start point
    startPoint();
});