<<<<<<< HEAD
function Offer(options) {
    var options = (options instanceof Object) ? options : {};
    const DOM_ID = options.id;
    const server = options.server;
    const callbacks = options.callbacks;

    const findGameSuccess  = (callbacks.findGameSuccess instanceof  Function ) ? callbacks.findGameSuccess  : function() {};

    this.show = () => $(DOM_ID).show();
    this.hide = () => $(DOM_ID).hide();

    function init() {
        $('#continueGame').on('click', async () => {
            const result = await server.findGame();
            if (result) {
                findGameSuccess();
            } else {
                alert(result.error);
            }
        });
    }
    init();
=======
function Offer(options) {
    var options = (options instanceof Object) ? options : {};
    const DOM_ID = options.id;
    const server = options.server;
    const callbacks = options.callbacks;

    const findGameSuccess  = (callbacks.findGameSuccess instanceof  Function ) ? callbacks.findGameSuccess  : function() {};

    this.show = () => $(DOM_ID).show();
    this.hide = () => $(DOM_ID).hide();

    function init() {
        $('#continueGame').on('click', async () => {
            const result = await server.findGame();
            if (result) {
                findGameSuccess();
            } else {
                alert(result.error);
            }
        });
    }
    init();
>>>>>>> 902057eec6ed81af815787194765c3b7346308b6
}