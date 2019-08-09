cc.Class({
    extends: cc.Component,
    onCollisionEnter: function (other, self) {
        if (other.node.name == 'plant') {
            let move = other.node.getComponent('moving');
            move._theStateSec = 2;
        }
    },

    // onLoad () {},


    // update (dt) {},
});
