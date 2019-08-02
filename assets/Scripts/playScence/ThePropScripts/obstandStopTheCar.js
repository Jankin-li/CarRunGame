cc.Class({
    extends: cc.Component,

    properties: {
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name == 'car') {
            let move = other.node.getComponent('moving');
            if (move.isProtected) {
                move.runAllow = true;
                this.node.destroy();
            } else {
                move.runAllow = false;
            }
            cc.log("==========HitTheObstand!");
        }
    },
    onCollisionExit: function (other, self) {
        if (other.node.name == 'car') {
            let move = other.node.getComponent('moving');
            move.runAllow = true;
            move._stoppedTheCar = false;
        }
    },
    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
