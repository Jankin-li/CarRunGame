cc.Class({
    extends: cc.Component,

    properties: {
        durtinTime: 1,
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name == "car") {
            let move = other.node.getComponent('moving');
            move._isProtected = true;
            let call = cc.callFunc(() => {
                move._isProtected = false;
                this.node.destroy();
            });
            let sq = cc.sequence(cc.delayTime(this.durtinTime), call);
            other.node.runAction(sq);
        }
    },

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
