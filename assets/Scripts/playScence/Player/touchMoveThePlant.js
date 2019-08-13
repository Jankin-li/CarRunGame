let move;
cc.Class({
    extends: cc.Component,

    properties: {
        thePant: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        move = this.thePant.getComponent('moving');
        this.node.on(cc.Node.EventType.TOUCH_END, (t) => {
            let charge = t.getLocation().x - t.getStartLocation().x;
            cc.log(charge);
            if (charge > 0) {
                move.carTurnRight();
            } else if (charge < 0) {
                move.carTurnLeft();
            }
        }, this)
    },

    // update (dt) {},
});
