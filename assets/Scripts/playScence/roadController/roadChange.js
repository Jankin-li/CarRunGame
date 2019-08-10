cc.Class({
    extends: cc.Component,

    properties: {
        nextRoad: cc.Prefab,
    },

    onCollisionEnter: function (other, self) {
        cc.log("The Car Enter The Road!");
        if (other.node.name == 'plant') {
            let move = other.node.getComponent('moving');
            this.generateNomalRoad();
            move._runLength = 0;
        }
    },

    onCollisionExit: function (other, self) {
        console.log('on collision exit');
        let callBack = cc.callFunc(() => {
            this.node.destroy();
        });
        let lateTime = cc.delayTime(3);
        let actionSq = cc.sequence(lateTime, callBack);
        this.node.runAction(actionSq);
    },

    generateNomalRoad() {
        let theRoad = cc.instantiate(this.nextRoad);
        theRoad.parent = this.node.parent;
        let generatePos = cc.v2(this.node.x, this.node.y + this.node.height);
        theRoad.position = generatePos;
    },
});
