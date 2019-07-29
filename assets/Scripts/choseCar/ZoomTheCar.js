cc.Class({
    extends: cc.Component,

    properties: {
        imagine: [cc.SpriteFrame],
        _index: 0,
        _animation: cc.Animation,
        index: {
            type: cc.Integer,
            set(value) {
                if (value < 0) {
                    return;
                }
                this._index = value % this.imagine.length;
                let sprite = this.node.getComponent(cc.Sprite);
                let callFunc = cc.callFunc(() => {
                    sprite.spriteFrame = this.imagine[this._index];
                });
                let delayAct = cc.delayTime(0.3);
                let sequence = cc.sequence(delayAct, callFunc);
                this.node.runAction(sequence);
                

            },
            get() {
                return this._index;
            }
        },
    },
    onLoad() {
        this._animation = this.getComponent(cc.Animation);
    },

    preOne() {
        let thisIndex = this.index;
        this.index--;
        if (this.index == thisIndex) {//判断是否到了第一个赛车,如果是就不再播放切换动画
            return;
        }
        this._animation.play('zoomTheCarLeft');
    },

    next() {
        this.index++;
        this._animation.play('zoomTheCarRight');
    },
});
