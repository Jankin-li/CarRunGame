cc.Class({
    extends: cc.Component,

    properties: {
        coinWorth: 50,
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name == "plant") {
            let worldPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
            cc.director.emit('coinGetOne', this.coinWorth, worldPos);
            let call = cc.callFunc(() => {
                this.node.destroy();
            });
            let sq = cc.sequence(cc.delayTime(0.2), call);
            other.node.runAction(sq);
        }
    },
})

