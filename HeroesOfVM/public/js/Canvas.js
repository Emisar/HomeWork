function Canvas(width, height) {

<<<<<<< HEAD
    var canvas = document.getElementById('lawer');
=======
    var canvas = document.getElementById('game-field');
>>>>>>> fc91d1913d4f624341fe170525fe54e9fdcbb12c
    canvas.width = width || 300;
    canvas.height = height || 300;
    var context = canvas.getContext("2d");

    this.fillRect = function (color) {
        context.fillStyle = color || "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    this.line = function (x1, y1, x2, y2, color) {
        context.beginPath();
        context.strokeStyle = color || "black";
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    };

    this.circle = function (x, y, r, color) {
        context.beginPath();
        context.strokeStyle = color || "black";
        context.arc(x, y, r, 0, 2 * Math.PI);
        context.stroke();
    };

    this.rect = function (x, y, width, height, color) {
        context.beginPath();
        context.strokeStyle = color || "black";
        context.rect(x, y, width, height);
        context.stroke();
    };

    this.fillSmallRect = function (x, y, width, height, color) {
        context.beginPath();
        context.strokeStyle = color || "black";
        context.fillStyle   = color || "black";
        context.fillRect(x, y, width, height);
        context.stroke();
    };

    this.text = function (text, x, y, color, size) {
        context.fillStyle = color || "black";
        context.font = (size || 50) + "px Georgia";
        context.fillText(text, x, y);
    };

    this.sprite = function (img, sx, sy, swidth, sheight, x, y, width, height) {
        context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
    };

    this.rotate = function(val){
        context.rotate(val);
    };

    this.restore = function(){
        context.restore();
    };

    this.save = function(){
        context.save();
    };

    this.translate = function(x, y){
        context.translate(x, y);
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> fc91d1913d4f624341fe170525fe54e9fdcbb12c
