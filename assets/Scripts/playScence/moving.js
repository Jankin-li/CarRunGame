let totalLength = 1280 * 7 * 4;
let thisBili = 0;

let turnStartPosx = 0;
let turnEndPosx = 0;
var nodeEnumFirst;
var nodeEnumSeconde;
nodeEnumFirst = cc.Enum({
    isNormal: 0,
    isProtected: 1,
});
nodeEnumSeconde = cc.Enum({
    isRunning: 0,
    isStopped: 1,
    isDecelerated: 2,
    isAccelerated: 3,
});

cc.Class({
    extends: cc.Component,

    properties: {
        runningcamera: cc.Camera,
        step: 150,
        _isHaveDEBuffe: false,
        _isHaveACBuffe: false,
        _theStateSec: {//二号状态机 当前遇到的道具
            "default": nodeEnumSeconde.isRunning,
            type: nodeEnumSeconde,
        },
        _theStateFir: {//一号状态机  是否在保护状态下
            "default": nodeEnumFirst.isNormal,
            type: nodeEnumFirst,
        },
        _runLength: 0,//每一个阶段已经行驶的长度
        isProtectedEffct: cc.Node,//盾牌特效

        accelerateSpeed: 10,//加速度
        decelerateSpeed: 4,//减速度

        theLaterTimeOfProte: 4,
        theLaterTimeOfAccelerate: 4,//加速持续时间
        theLaterTimeOfDecelerate: 1, //减速持续时间
        //运行时的速度
        runingSpeed: {
            type: cc.Integer,
            default: 5,
        },
        //车子本身的速度
        baseSpeed: 5,

    },

    onLoad() {
        //开启碰撞监听
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //获取动画 转向动画
        this.anim = this.node.getComponent(cc.Animation);
        this.step = (720 - 96) / 4;
        turnStartPosx = this.node.x;
        this._theStateFir = nodeEnumFirst.isNormal;
        this._theStateSec = nodeEnumSeconde.isRunning;
    },

    start() {
        this.node.zIndex = 10;
        this.isProtectedEffct.active = false;
        this.runingSpeed = this.baseSpeed;
        this._backTheNomalSqAction = cc.sequence(0, 0);
    },

    update() {
        this.isRunStatus();
        this.carRun();
    },

    sendTheSpeedOfTheProgressBar() {
        cc.director.emit('speedOfProgressBar', thisBili);
    },

    /*
     赛车总共有 '正常' '加速' '停止' '被保护' '被减速' 五种状态
     第一优先级 '被保护' 状态针为 _isProtected
     第二优先级 '停止'  状态针为 _isStoped
     第三优先级 '加速'  状态针为 _isAccelerated 不可无视停止
     第四优先级 '被减速' 状态针为 _isDecelerated
    */

    //车子运行时的控制
    isRunStatus() {
        cc.tween(this.node).stop();
        switch (this._theStateFir) {
            case nodeEnumFirst.isNormal: {
                switch (this._theStateSec) {//无保护状态下 可以进入四种状态
                    case nodeEnumSeconde.isRunning: this.carBackToNormal(); break;
                    case nodeEnumSeconde.isStopped: this.carStop(); break;
                    case nodeEnumSeconde.isAccelerated: this.accelerateTheCar(); break;
                    case nodeEnumSeconde.isDecelerated: this.decelerateTheCar(); break;
                }
            }; break;
            case nodeEnumFirst.isProtected: {
                switch (this._theStateSec) {//保护状态下 只能进入加速和正常状态
                    case nodeEnumSeconde.isRunning: this.carBackToNormal();; break;
                    case nodeEnumSeconde.isAccelerated: this.accelerateTheCar(); break;
                }
                this.isProtectedEffct.active = true;
                let backTheNomalSqAction = cc.sequence(cc.delayTime(this.theLaterTimeOfProte), cc.callFunc(() => {
                    this._theStateFir = nodeEnumFirst.isNormal;
                    this.isProtectedEffct.active = false;
                }));
                this.node.runAction(backTheNomalSqAction);
            }; break;
        }
    },

    //减速
    decelerateTheCar() {
        if (!this._isHaveDEBuffe && this._theStateSec != nodeEnumSeconde.isStopped) {
            this._isHaveDEBuffe = true;
            this.runingSpeed -= this.decelerateSpeed;
            cc.tween(this.node)
                .delay(this.theLaterTimeOfDecelerate)
                .call(() => {
                    this._theStateSec = nodeEnumSeconde.isRunning;//回归正常状态
                    this._isHaveDEBuffe = false;
                }).start();
        }
    },

    //加速
    accelerateTheCar() {
        if (!this._isHaveACBuffe && this._theStateSec != nodeEnumSeconde.isStopped) {
            this._isHaveACBuffe = true;
            this.runingSpeed += this.accelerateSpeed;
            cc.tween(this.node)
                .delay(this.theLaterTimeOfAccelerate)
                .call(() => {
                    this._theStateSec = nodeEnumSeconde.isRunning;//回归正常状态
                    this._isHaveACBuffe = false;
                }).start();
        }
    },
    //停止
    carStop() {
        this.runingSpeed = 0;
    },
    //车子正常行驶
    carRun() {
        this.node.y += this.runingSpeed;
        thisBili = this.node.y / totalLength;
        if (this.node.y > 0) {
            this.runningcamera.node.y += this.runingSpeed;
        }
        this.sendTheSpeedOfTheProgressBar();
    },

    //恢复正常速度
    carBackToNormal() {
        this.runingSpeed = this.baseSpeed;
    },

    //左右转向
    carTurnLeft() {
        turnEndPosx = turnStartPosx - this.step;
        if (turnEndPosx > -300) {
            // cc.tween(this.node).stop();
            cc.tween(this.node)
                .to(0.2, { rotation: -15, x: turnEndPosx })
                .to(0.1, { rotation: 0 })
                .start();//利用链式缓动来让车换车道更加平缓
            turnStartPosx = turnEndPosx;
        }

    },
    carTurnRight() {
        turnEndPosx = turnStartPosx + this.step;
        if (turnEndPosx < 300) {
            // cc.tween(this.node).stop();
            cc.tween(this.node)
                .to(0.2, { rotation: 15, x: turnEndPosx })
                .to(0.1, { rotation: 0 })
                .start();//利用链式缓动来让车换车道更加平缓
            turnStartPosx = turnEndPosx;
        }
    }
});
