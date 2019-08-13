cc.Class({
    extends: cc.Component,
    onCollisionEnter: function (other, self) {
        if (other.node.name == 'plant') {
            let move = other.node.getComponent('moving');
            move.toAccelerate();
            this.scheduleOnce(() => {
                this.node.destroy()
            }, 0.2);
        }
    },
});
