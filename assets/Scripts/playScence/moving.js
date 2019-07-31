cc.Class({
    extends: cc.Component,

    properties: {
        runningcamera: cc.Camera,
    },

    onLoad() {
    },

    start() {
        this.pos = cc.v2(0, 5);
        this.moveAction = cc.moveBy(1, this.pos);
        // var manager = cc.director.getCollisionManager();
        // manager.enabled = true;
        
    },

    update() {
        // 执行动作
        this.node.runAction(this.moveAction.clone());
        this.runningcamera.node.runAction(this.moveAction.clone());
    },
});
