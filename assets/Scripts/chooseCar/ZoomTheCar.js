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
            carsData[this.index].utilizationRate,
            carsData[this.index].nameT,
            carsData[this.index].cost,
        );
        //传送数据给ShoppingSystemController脚本使用 分别传出 当前车子的Index cost 和name
        cc.director.emit('toBuyCar', this.index, carsData[this.index].cost, carsData[this.index].nameT);
    }
});

var carsData = [{
    nameT: 'Civil Propulsion',
    maxSpeed: 240,//马力
    utilizationRate: 0,//利用率
    cost: 3000,
}, {
    nameT: 'Industrial Thruster',
    maxSpeed: 280,//马力
    utilizationRate: 0,//利用率
    cost: 25000,
}, {
    nameT: 'Military Thruster',
    maxSpeed: 320,//马力
    utilizationRate: 0,//利用率
    cost: 47000,
}, {
    nameT: ' Ultimate Thruster',
    maxSpeed: 380,//马力
    utilizationRate: 0,//利用率
    cost: 62000,
}];//json对象数组 用于存储对应的行星的数据
export {carsData};