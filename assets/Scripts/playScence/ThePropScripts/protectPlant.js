cc.Class({
    extends: cc.Component,

    properties: {
        durtinTime: 1,
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name == "plant") {
            let move = other.node.getComponent('moving');
            move._theStateFir = 1;
            let call = cc.callFunc(() => {
                this.node.destroy();
            });
            let sq = cc.sequence(cc.delayTime(0.2), call);
            other.node.runAction(sq);
        }
    },

});
