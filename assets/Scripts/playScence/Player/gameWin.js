var coin;
var time;
cc.Class({
    extends: cc.Component,
    onCollisionEnter: function (other, self) {
        if (other.node.name == "plant") {
            cc.director.emit('winTheGame', true, coin, time)//游戏胜利,
        }
    },

    onLoad() {
        cc.director.on('coinAndTime', (value, value2) => {
            coin = value;
            time = value2;
        }, this)
    },
    onDestroy() {
        cc.director.targetOff(this);
    },
});
