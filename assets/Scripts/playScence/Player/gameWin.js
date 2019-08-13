
cc.Class({
    extends: cc.Component,
    onCollisionEnter: function (other, self) {
        if (other.node.name == "plant") {
            let move = other.node.getComponent('moving');
            move._theStateSec = 1; 
            cc.director.emit('winTheGame', true)//游戏胜利,
        }
    },

    onDestroy() {
        cc.director.targetOff(this);
    },
});
