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

    start() {
        this.index = 0;
        this.sentMassageToUI();
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

    //发送消息方法
    sentMassageToUI() {
        //传送数据给dataUIController脚本使用
        cc.director.emit('theProperties', carsData[this.index].maxSpeed,
            carsData[this.index].displacement,
            carsData[this.index].acelerationTime,
            carsData[this.index].nameT,
            carsData[this.index].cost,
        );
        //传送数据给ShoppingSystemController脚本使用 分别传出 当前车子的Index cost 和name
        cc.director.emit('toBuyCar', this.index, carsData[this.index].cost, carsData[this.index].nameT);
    }
});

var carsData = [{
    nameT: '地 球',
    maxSpeed: 240,
    displacement: 2.5,
    acelerationTime: 8.36,
    cost: 3000,
}, {
    nameT: '火 星',
    maxSpeed: 280,
    displacement: 3.0,
    acelerationTime: 6.47,
    cost: 25000,
}, {
    nameT: '水 星',
    maxSpeed: 320,
    displacement: 4.5,
    acelerationTime: 4.49,
    cost: 47000,
}, {
    nameT: '木 星',
    maxSpeed: 380,
    displacement: 6.0,
    acelerationTime: 3.34,
    cost: 62000,
}];//json对象数组 用于存储对应的行星的数据