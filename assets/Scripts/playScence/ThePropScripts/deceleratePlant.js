cc.Class({
    extends: cc.Component,
    onCollisionEnter: function (other, self) {
        if (other.node.name == 'plant') {
            let move = other.node.getComponent('moving');
            move.toDecelerate();
        }
    },

    onCollisionExit: function (other, self) {
        if (other.node.name == 'plant') {
            let move = other.node.getComponent('moving');
            if (!move._isAccelerate && !move._isStop) {
                move.carBackToNormal();
            }
            move._isDecelerate = false;
        }
    },
});
