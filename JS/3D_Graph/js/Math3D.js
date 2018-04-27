function Math3D() {

    //матрица переноса
    var moveMatrix = [[1, 0, 0, 0],
                      [0, 1, 0, 0],
                      [0, 0, 1, 0],
                      [1, 1, 1, 1]];

    //матрица масштабирования
    var scaleMatrix = [[1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1]];

    //матрица вращение по Z
    var rotateZMatrix = [[1, 1, 0, 0],
                         [1, 1, 0, 0],
                         [0, 0, 1, 0],
                         [0, 0, 0, 1]];


    //матрица вращение по X
    var rotateXMatrix = [[1, 0, 0, 0],
                         [0, 1, 1, 0],
                         [0, 1, 1, 0],
                         [0, 0, 0, 1]];


    //матрица вращение по Y
    var rotateYMatrix = [[1, 0, 1, 0],
                         [0, 1, 0, 0],
                         [1, 0, 1, 0],
                         [0, 0, 0, 1]];

    this.fillMoveMatrix = function (vector) {
        moveMatrix[3][0] = vector.x;
        moveMatrix[3][1] = vector.y;
        moveMatrix[3][2] = vector.z;
    }

    this.fillScaleMatrix = function (vector) {
        scaleMatrix[0][0] = vector.x;
        scaleMatrix[1][1] = vector.y;
        scaleMatrix[2][2] = vector.z;
    
    }
    this.fillRotateZMatrix = function (alpha) {
        rotateZMatrix[0][0] = Math.cos(alpha);
        rotateZMatrix[0][1] = Math.sin(alpha);
        rotateZMatrix[1][0] = -Math.sin(alpha);
        rotateZMatrix[1][1] = Math.cos(alpha);
    }         
    this.fillRotateXMatrix = function (alpha) {
        rotateXMatrix[1][1] = Math.cos(alpha);
        rotateXMatrix[1][2] = -Math.sin(alpha);
        rotateXMatrix[2][1] = Math.sin(alpha);
        rotateXMatrix[2][2] = Math.cos(alpha);
    }
    this.fillRotateYMatrix = function (alpha) {
        rotateYMatrix[0][0] = Math.cos(alpha);
        rotateYMatrix[0][2] = -Math.sin(alpha);
        rotateYMatrix[2][0] = Math.sin(alpha);
        rotateYMatrix[2][2] = Math.cos(alpha);
    }         
    function mult(pointV, matrix) { 
        var result = [0,0,0,1];
        var sum = 0;
        for (var i = 0; i < result.length; i++) {
            sum = 0;
            for (var j = 0; j < matrix[i].length; j++) {
                    sum += pointV[j] * matrix[j][i];
            }
            result[i] = sum;
        }
        return new Point(result[0],result[1],result[2]);
    }
   
     
    //перенос точки на определнный вектор
    this.move = function (point, vector) {
        return mult([point.x, point.y, point.z, 1], moveMatrix);
    };

    this.scale = function (point, vector) {
        return mult([point.x, point.y, point.z, 1], scaleMatrix);

    };
    this.rotateZ= function (point, alpha) {
        return mult([point.x, point.y, point.z, 1], rotateZMatrix);
    };

    this.rotateX = function (point, alpha) {
        return mult([point.x, point.y, point.z, 1], rotateXMatrix);
    };

    this.rotateY = function (point, alpha) {
        return mult([point.x, point.y, point.z, 1], rotateYMatrix);
    };
}