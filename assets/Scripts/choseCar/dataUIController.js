cc.Class({
    extends: cc.Component,

    properties: {
        //属性条
        maxSpeedBar: cc.ProgressBar,//最高时速
        displacementBar: cc.ProgressBar,//排量
        acelerationBar: cc.ProgressBar,//百秒加速时间
        //属性值
        maxSpeedLabel: cc.Label,//最高时速
        displacementLabel: cc.Label,//排量
        acelerationLabel: cc.Label,//百秒加速时间
        nameLabel: cc.Label,//名字标签
        costNumber: cc.Label,//金额标签

    },
    //更新UI面板上的属性 函数分别传入 最高时速 排量 百米加速时间
    setTheProperties(maxSpeed, disPlaceMent, aceleration, name, cost) {
        this.maxSpeedLabel.string = maxSpeed + "km/h";
        this.displacementLabel.string = disPlaceMent + 'T';
        this.acelerationLabel.string = aceleration + 's';
        this.nameLabel.string = name;
        this.costNumber.string = cost;

        //更新属性条
        this.maxSpeedBar.progress = maxSpeed / 1000;
        this.displacementBar.progress = disPlaceMent / 10;
        this.acelerationBar.progress = aceleration / 10;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.director.on('theProperties', this.setTheProperties, this);
    },

    // update (dt) {},
});
