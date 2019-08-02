cc.Class({
    extends: cc.Component,

    properties: {
        _backSpeed: 0,
        slowSpeed: 4,
        durtinTime: 1,
    },
    onCollisionEnter: function (other, self) {
        if (other.node.name == "car") {
            let move = other.node.getComponent('moving');
            this._backSpeed = move.speed;
            move.speed = move.speed - this.slowSpeed;
        }
    },
    onCollisionExit(other, self) {
        if (other.node.name == "car") {
            let move = other.node.getComponent('moving');
            let call = cc.callFunc(() => {
                move.speed = this._backSpeed;
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
