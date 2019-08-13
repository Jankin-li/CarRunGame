cc.Class({
    extends: cc.Component,

    properties: {
        //属性条
        maxSpeedBar: cc.ProgressBar,//最高时速
        utilizationRateBar: cc.ProgressBar,//利用率
        //属性值
        maxSpeedLabel: cc.Label,//最高时速
        utilizationRateLabel: cc.Label,//百秒加速时间
        nameLabel: cc.Label,//名字标签
        costNumber: cc.Label,//金额标签
    },
    //更新UI面板上的属性 函数分别传入 最高时速 效率
    setTheProperties(maxSpeed, utilizationRate, name, cost) {
        this.maxSpeedLabel.string = maxSpeed + "km/h";//马力
        this.utilizationRateLabel.string = utilizationRate + '%'//利用率
        this.nameLabel.string = name;//名称
        this.costNumber.string = cost;//金钱

        //更新属性条
        this.maxSpeedBar.progress = maxSpeed / 500;
        this.utilizationRateLabel.progress = utilizationRate / 100;
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        cc.director.on('theProperties', this.setTheProperties, this);
    },

    onDestroy() {
        cc.director.targetOff(this);
    },
    // update (dt) {},
});
