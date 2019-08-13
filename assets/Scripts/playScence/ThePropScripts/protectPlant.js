cc.Class({
    extends: cc.Component,

    properties: {
        durtinTime: 1,
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name == "plant") {
            let move = other.node.getComponent('moving');
            move.toProtect();
            this.scheduleOnce(() => {
                this.node.destroy()
            }, 0.2);
        }
    },
});
