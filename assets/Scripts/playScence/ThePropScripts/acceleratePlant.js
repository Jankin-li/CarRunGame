cc.Class({
    extends: cc.Component,
    onCollisionEnter: function (other, self) {
        if (other.node.name == 'plant') {
            let move = other.node.getComponent('moving');
            move._theStateSec = 3;
            let a = 1;
            cc.director.emit('accelerate', a);
            let backTheNomal = cc.callFunc(() => {
                this.node.destroy();
            })
            let destroyThePop = cc.sequence(cc.delayTime(0.2), backTheNomal);
            this.node.runAction(destroyThePop);
        }
    },
});
