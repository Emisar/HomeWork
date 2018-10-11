function Server() {

    this.endTurn = function (id) {
        return $.get('api', { method: 'endTurn', id});
    };

}