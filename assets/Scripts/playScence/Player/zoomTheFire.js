cc.Class({
    extends: cc.Component,

    properties: {
        thePsi: {
            type: cc.SpriteFrame,
            default: [],
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.on('accelerate', this.changeTheFire, this)
    },

    changeTheFire(vaz) {
        let sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = this.thePsi[vaz];
    },
    onDestroy() {
        cc.director.targetOff(this);
    },

    // update (dt) {},
});
