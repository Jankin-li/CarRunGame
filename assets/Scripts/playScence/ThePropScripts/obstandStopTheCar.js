cc.Class({
    extends: cc.Component,
    onCollisionEnter: function (other, self) {
        if (other.node.name == 'car') {
            let move = other.node.getComponent('moving');
            if (move._isProtected) {
                //如果撒赛车有护盾就摧毁栅栏
                this.node.destroy();
            } else {
            move._isNormal = false;
            }

        }
    },
    onCollisionExit: function (other, self) {
        if (other.node.name == 'car') {
            let move = other.node.getComponent('moving');
            move._isNormal = true;
            move._isStoped = false;
        }
    },
});
