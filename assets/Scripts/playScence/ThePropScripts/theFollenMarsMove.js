cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeedX: 5,
        moveSpeedY: 5,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    onCollisionEnter: function (other, self) {
        if (other.node.name == 'plant') {
            cc.director.emit('GameOver', true);
            other.node.destroy();
        }
    },
    update(dt) {
        if (this.node.x < -300) {
            this.node.rotation = -90;
            this.moveSpeedX = -this.moveSpeedX;
        }
        if (this.node.x > 300) {
            this.node.rotation = 0;
            this.moveSpeedX = -this.moveSpeedX;
        }
        this.node.x -= this.moveSpeedX;
        this.node.y -= this.moveSpeedY;
    },
});
