//git added by version 1
var game = {
    data: null,
    RN: 4, CN: 4,
    status: 1,
    GAMEOVER: 0,
    RUNNING: 1,
    score: 0,
    gameStart: function () {
        this.data = [];
        this.status = this.RUNNING;
        for (var r = 0; r < this.RN; r++) {
            this.data[r] = [];
            for (var c = 0; c < this.CN; c++) {
                this.data[r][c] = 0;
            }
        }
        this.randomNum();
        this.randomNum();
        this.score = 0;
        

        this.updateView();

        document.onkeydown = function (e) {
            switch (e.keyCode) {
                case 37:
                    this.moveLeft();
                    break;
                case 38:
                    this.moveUp();
                    break; //up
                case 39:
                    this.moveRight();
                    break; //right
                case 40:
                    this.moveDown();
                    break; //down 
            }
        }.bind(this);
    },
    randomNum: function () {
        while (true) {
            // 0 1 2 3
            var r = Math.floor(Math.random() * this.RN);
            var c = Math.floor(Math.random() * this.CN);
            if (this.data[r][c] == 0) {
                this.data[r][c] = Math.random() > 0.5 ? 2 : 4;
                this.score += this.data[r][c];
 
                break;
            }
        }
    },
    updateView: function () {
        var div = null;
        for (var r = 0; r < this.RN; r++) {
            for (var c = 0; c < this.CN; c++) {
                div = document.getElementById('c' + r + c);
                if (this.data[r][c] == 0) {
                    div.innerHTML = '';
                    div.className = 'cell';
                } else {
                    div.innerHTML = this.data[r][c];
                    div.className = 'cell n' + this.data[r][c];
                }
            }
        }
        document.getElementById('score').innerHTML = this.score;
        if(this.status == this.RUNNING){
            document.getElementById('gameover').style.display = 'none';
        }
    },
    isGameOver: function () {
        for (var r = 0; r < this.RN; r++) {
            for (var c = 0; c < this.CN; c++) {
                if (this.data[r][c] == 0) return false;
                if (c < this.CN - 1 && this.data[r][c] == this.data[r][c + 1])
                    return false;
                if (r < this.RN - 1 && this.data[r][c] == this.data[r + 1][c])
                    return false;
            }
        }
        return true;
    },
    moveAction: function (callback) {
        var before = String(this.data);
        callback();
        var after = String(this.data);
        if (before != after) {
            this.randomNum();
            this.updateView();
            if(this.isGameOver()){
                document.getElementById('gameover').style.display = 'block';
                document.getElementById('final').innerHTML = this.score;
            }
        }
    },
    moveLeft: function () {
        this.moveAction(function () {
            for (var r = 0; r < this.RN; r++) {
                this.moveLeftByRow(r);
            }
        }.bind(this));

    },
    moveLeftByRow: function (r) {
        for (var c = 0; c < this.CN - 1; c++) {
            var nextc = this.getNextC(r, c);
            if (nextc == -1) return;

            if (this.data[r][c] == 0) {
                this.data[r][c] = this.data[r][nextc];
                this.data[r][nextc] = 0;
            } else {
                if (this.data[r][c] == this.data[r][nextc]) {
                    this.data[r][c] = this.data[r][nextc] * 2;
                    this.data[r][nextc] = 0;
                }
            }

        }
    },
    getNextC(r, c) {
        for (var i = c + 1; i < this.CN; i++) {
            if (this.data[r][i] != 0) {
                return i;
            }
        }
        return -1;
    },
    moveRight: function () {
        this.moveAction(function () {
            for (var r = 0; r < this.RN; r++) {
                this.moveRightByRow(r);
            }
        }.bind(this));
    },
    moveRightByRow: function (r) {
        for (var c = this.CN - 1; c > 0; c--) {
            var prevc = this.getPrevC(r, c);
            if (prevc == -1) return;

            if (this.data[r][c] == 0) {
                this.data[r][c] = this.data[r][prevc];
                this.data[r][prevc] = 0;
            } else {
                if (this.data[r][c] == this.data[r][prevc]) {
                    this.data[r][c] = this.data[r][prevc] * 2;
                    this.data[r][prevc] = 0;
                }
            }

        }
    },
    getPrevC: function (r, c) {
        for (var i = c - 1; i >= 0; i--) {
            if (this.data[r][i] != 0) {
                return i;
            }
        }
        return -1;
    },

    moveUp: function () {
        this.moveAction(function () {
            for (var c = 0; c < this.CN; c++) {
                this.moveUpByCol(c);
            }
        }.bind(this));
    },
    moveDownByCol: function (c) {
        for (var r = this.RN - 1; r > 0; r--) {
            var prevR = this.getPrevR(r, c);
            if (prevR == -1) return;

            if (this.data[r][c] == 0) {
                this.data[r][c] = this.data[prevR][c];
                this.data[prevR][c] = 0;
            } else {
                if (this.data[r][c] == this.data[prevR][c]) {
                    this.data[r][c] = this.data[prevR][c] * 2;
                    this.data[prevR][c] = 0;
                }
            }

        }
    },
    getPrevR: function (r, c) {
        for (var i = r - 1; i >= 0; i--) {
            if (this.data[i][c] != 0) {
                return i;
            }
        }
        return -1;
    },
    moveDown: function () {
        this.moveAction(function () {
            for (var c = 0; c < this.CN; c++) {
                this.moveDownByCol(c);
            }
        }.bind(this));
    },
    moveUpByCol: function (c) {
        for (var r = 0; r < this.RN - 1; r++) {
            var prevR = this.getNextR(r, c);
            if (prevR == -1) return;

            if (this.data[r][c] == 0) {
                this.data[r][c] = this.data[prevR][c];
                this.data[prevR][c] = 0;
            } else {
                if (this.data[r][c] == this.data[prevR][c]) {
                    this.data[r][c] = this.data[prevR][c] * 2;
                    this.data[prevR][c] = 0;
                }
            }

        }
    },
    getNextR: function (r, c) {
        for (var i = r + 1; i < this.RN; i++) {
            if (this.data[i][c] != 0) {
                return i;
            }
        }
        return -1;
    }
}
//Game start function
game.gameStart();