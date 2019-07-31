cc.Class({
    extends: cc.Component,

    properties: {
        roadPrefab: cc.Prefab,
    },

    onCollisionEnter: function (other, self) {
        cc.log("The Car Enter The Road!");
        this.generateRoad();
    },

    onCollisionExit: function (other, self) {
        console.log('on collision exit');
        let callBack = cc.callFunc(() => {
            this.node.destroy();
        });
        let lateTime = cc.delayTime(0.5);
        let actionSq= cc.sequence(lateTime,callBack);
        this.node.runAction(actionSq);
    },
    // LIFE-CYCLE CALLBACKS:

    generateRoad() {
        let theRoad = cc.instantiate(this.roadPrefab);
        theRoad.parent = this.node.parent;
        let generatePos = cc.v2(this.node.x, this.node.y + this.node.height);
        theRoad.position = generatePos;
    },
    // onLoad () {},

    start() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
    },

    onDestroy() {
        cc.log('I\'m destroy!')
    }
    // update (dt) {},
});
