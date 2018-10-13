function Server() {

    this.getStruct = () => { return $.get('api', { method: 'getStruct'}) };

    this.endTurn = function (id) {
        return $.get('api', { method: 'endTurn', id});
    };

}