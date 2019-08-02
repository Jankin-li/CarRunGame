cc.Class({
    extends: cc.Component,

    properties: {
        durinTime: 3,
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name == 'car') {
            let move = other.node.getComponent('moving');
            move.isAccelerate = true;
            let call = cc.callFunc(() => {
                move.isAccelerate = false;
                this.node.destroy();
            });
            let sq = cc.sequence(cc.delayTime(this.durtinTime), call);
            other.node.runAction(sq);
        }
    },
});
