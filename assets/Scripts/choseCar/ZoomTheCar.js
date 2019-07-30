var carsData = [{
    nameT: '基础款',
    maxSpeed: 500,
    displacement: 2.0,
    acelerationTime: 3.38,
    cost: 300,
}, {
    nameT: '赛车中的小火鸡',
    maxSpeed: 600,
    displacement: 4.0,
    acelerationTime: 2.38,
    cost: 400,
}, {
    nameT: '赛车里的拖拉机',
    maxSpeed: 700,
    displacement: 5.0,
    acelerationTime: 3.224,
    cost: 500,
}, {
    nameT: '赛车中的战斗机',
    maxSpeed: 800,
    displacement: 9.0,
    acelerationTime: 5.38,
    cost: 550,
}, {
    nameT: '王中王',
    maxSpeed: 900,
    displacement: 7.0,
    acelerationTime: 9.38,
    cost: 560,
}, {
    nameT: '兽中兽',
    maxSpeed: 1000,
    displacement: 8.0,
    acelerationTime: 5.38,
    cost: 600,
}];//json对象数组 用于存储对应的车的数据


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
        this.sentMassageToUI();
        this._animation.play('zoomTheCarLeft');
    },

    next() {
        this.index++;
        this._animation.play('zoomTheCarRight');
        this.sentMassageToUI();
    },
    sentMassageToUI() {
        cc.director.emit('theProperties', carsData[this.index].maxSpeed,
            carsData[this.index].displacement,
            carsData[this.index].acelerationTime,
            carsData[this.index].nameT,
            carsData[this.index].cost
        );
    }
});
