cc.Class({
    extends: cc.Component,
    onCollisionEnter: function (other, self) {
        if (other.node.name == 'plant') {
            let move = other.node.getComponent('moving');
            if (move._theStateSec != 3)
                move._theStateSec = 2;
        }
    },
    onCollisionStay: function (other, self) {
        if (other.node.name == 'plant') {
            let move = other.node.getComponent('moving');
            if (move._theStateSec != 3)
                move._theStateSec = 2;
        }
    },
    onCollisionExit: function (other, self) {
        if (other.node.name == 'plant') {
            let move = other.node.getComponent('moving');
            if (move._theStateSec != 3)
                move._theStateSec = 0;
            move._isHaveDEBuffe = false;
        }
    },
});
