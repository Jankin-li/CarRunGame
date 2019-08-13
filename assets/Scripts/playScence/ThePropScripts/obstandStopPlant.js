cc.Class({
    extends: cc.Component,
    onCollisionEnter: function (other, self) {
        if (other.node.name == 'plant') {
            let move = other.node.getComponent('moving');
            move.toStop();
        }
    },
    onCollisionExit: function (other, self) {
        if (other.node.name == 'plant') {
            let move = other.node.getComponent('moving');
            if (!move._isDecelerate)
                move.carBackToNormal();
            move._isStop = false;
        }
    },
});
