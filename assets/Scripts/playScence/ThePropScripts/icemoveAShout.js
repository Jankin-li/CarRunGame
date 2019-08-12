cc.Class({
    extends: cc.Component,

    properties: {
        theBullet: cc.Prefab,//冰锥
        moveSpeedX: 5,
        _moveSpeedY: 5,
        _theProgress: 0,
        _haveBullet: true,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.zIndex = 3;
        cc.director.on('moveTheIce', (value, x) => {
            this._theProgress = value;
        });
    },
    onDestroy() {
        cc.director.off('moveTheIce', (value, x) => {
            this._theProgress = value;
        });
    },

    creatTheIcele() {
        let theIcicle = cc.instantiate(this.theBullet);
        theIcicle.parent = this.node.parent;
        theIcicle.position = this.node.position;
    },
    update(dt) {
        this._moveSpeedY = this._theProgress + 640;
        this.moveTheIce();
        if ((this.node.x == -240 || this.node.x == -80 || this.node.x == 80 || this.node.x == 240) && this._haveBullet) {
            let islauch = Math.floor(Math.random() * 1000 % 10);
            if (islauch < 8) {
                this.creatTheIcele();
                this._haveBullet = false;
                this.scheduleOnce(() => {
                    this._haveBullet = true;//2s冷却
                }, (islauch / 2) + 1);
            }
        }
    },
    //冰星移动
    moveTheIce() {
        if (this._theProgress <= 1280 * 27) {
            if (this.node.x < -300) {
                this.moveSpeedX = -this.moveSpeedX;
            }
            if (this.node.x > 300) {
                this.moveSpeedX = -this.moveSpeedX;
            }
            this.node.x -= this.moveSpeedX;
            this.node.y = this._moveSpeedY;
        } else {
            this.node.x -= this.moveSpeedX;
            this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(() => {
                this.node.destroy();
            })))
        }
    },

    start() {

    },
});
